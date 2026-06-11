import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostById, type BlogPost } from "@/lib/posts";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = { title: "Edit Post" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post: BlogPost | null = null;
  try {
    post = await getPostById(id);
  } catch {
    // invalid ObjectId
  }
  if (!post) notFound();

  return <PostEditor post={post} />;
}
