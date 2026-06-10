"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Globe,
  GlobeLock,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { deletePostAction, setPostStatusAction } from "@/app/admin/actions";

type RowPost = {
  id: string;
  slug: string;
  status: "draft" | "published";
};

const buttonClass =
  "p-3 bg-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors";

export default function PostRowActions({ post }: { post: RowPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const togglePublish = () => {
    startTransition(async () => {
      await setPostStatusAction(
        post.id,
        post.status === "published" ? "draft" : "published"
      );
      router.refresh();
    });
  };

  const remove = () => {
    if (!confirm("Delete this post permanently? This cannot be undone.")) {
      return;
    }
    startTransition(async () => {
      await deletePostAction(post.id);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {isPending && (
        <Loader2 size={16} className="animate-spin text-neutral-500" />
      )}
      {post.status === "published" && (
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          aria-label="View post"
          title="View post"
          className={buttonClass}>
          <ArrowUpRight size={16} />
        </Link>
      )}
      <Link
        href={`/admin/posts/${post.id}`}
        aria-label="Edit post"
        title="Edit post"
        className={buttonClass}>
        <Pencil size={16} />
      </Link>
      <button
        onClick={togglePublish}
        disabled={isPending}
        aria-label={post.status === "published" ? "Unpublish" : "Publish"}
        title={post.status === "published" ? "Unpublish" : "Publish"}
        className={buttonClass}>
        {post.status === "published" ? (
          <GlobeLock size={16} />
        ) : (
          <Globe size={16} />
        )}
      </button>
      <button
        onClick={remove}
        disabled={isPending}
        aria-label="Delete post"
        title="Delete post"
        className="p-3 bg-neutral-800 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-700 transition-colors">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
