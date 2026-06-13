"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  requireAdmin,
  verifyCredentials,
} from "@/lib/auth";
import {
  createPost,
  deletePost,
  getPostById,
  imagesReferencedByOtherPosts,
  isSlugTaken,
  updatePost,
  type PostInput,
} from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import {
  deleteCloudinaryImages,
  findCloudinaryUrls,
} from "@/lib/cloudinary-server";

// Delete the given Cloudinary images, skipping any still used by another post.
async function cleanupImages(
  urls: string[],
  excludeId?: string
): Promise<void> {
  if (urls.length === 0) return;
  const stillUsed = await imagesReferencedByOtherPosts(urls, excludeId);
  await deleteCloudinaryImages(urls.filter((u) => !stillUsed.has(u)));
}

export type FormState = { error: string } | null;

export async function loginAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(email, password)) {
    return { error: "Invalid email or password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

function revalidateBlog(slugs: (string | undefined)[]): void {
  revalidatePath("/");
  revalidatePath("/blog");
  for (const slug of slugs) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
}

export type SavePostPayload = PostInput & { id?: string };

export type SaveResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

export async function savePostAction(
  payload: SavePostPayload
): Promise<SaveResult> {
  await requireAdmin();

  if (!payload.title.trim()) {
    return { ok: false, error: "Title is required." };
  }
  if (!payload.content.trim()) {
    return { ok: false, error: "Content is required." };
  }

  const previous = payload.id ? await getPostById(payload.id) : null;
  if (payload.id && !previous) {
    return { ok: false, error: "Post not found." };
  }

  try {
    const saved = payload.id
      ? await updatePost(payload.id, payload)
      : await createPost(payload);
    if (!saved) return { ok: false, error: "Post not found." };

    // On edit, remove images that were dropped from the cover/content.
    if (previous) {
      const newUrls = new Set(
        findCloudinaryUrls(saved.coverImage, saved.content)
      );
      const removed = findCloudinaryUrls(
        previous.coverImage,
        previous.content
      ).filter((u) => !newUrls.has(u));
      await cleanupImages(removed, saved.id);
    }

    revalidateBlog([saved.slug, previous?.slug]);
    return { ok: true, id: saved.id, slug: saved.slug };
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return { ok: false, error: "That slug is already in use." };
    }
    throw error;
  }
}

export async function checkSlugAction(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  await requireAdmin();
  return isSlugTaken(slug, excludeId);
}

export async function deletePostAction(id: string): Promise<void> {
  await requireAdmin();
  const deleted = await deletePost(id);
  if (deleted) {
    await cleanupImages(findCloudinaryUrls(deleted.coverImage, deleted.content));
    revalidateBlog([deleted.slug]);
  }
}

export async function setPostStatusAction(
  id: string,
  status: "draft" | "published"
): Promise<void> {
  await requireAdmin();
  const post = await getPostById(id);
  if (!post) return;
  const saved = await updatePost(id, { ...post, status });
  revalidateBlog([saved?.slug ?? post.slug]);
}

export async function previewMarkdownAction(markdown: string): Promise<string> {
  await requireAdmin();
  return renderMarkdown(markdown);
}
