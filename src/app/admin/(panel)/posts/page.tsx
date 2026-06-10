import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { adminListPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import PostRowActions from "@/components/admin/PostRowActions";

export const metadata: Metadata = { title: "Posts" };

export default async function AdminPostsPage() {
  const posts = await adminListPosts();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-neutral-400 text-sm">
            {posts.length} post{posts.length === 1 ? "" : "s"} total
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-950 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors self-start sm:self-auto">
          New Post
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-10 text-center">
          <p className="text-neutral-400">No posts yet.</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl divide-y divide-neutral-800">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
              <div className="flex-1 min-w-0 space-y-1">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="font-medium hover:text-neutral-300 transition-colors line-clamp-1">
                  {post.title}
                </Link>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}>
                    {post.status}
                  </span>
                  {post.publishedAt && (
                    <span>{formatDate(post.publishedAt)}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye size={13} />
                    {post.views}
                  </span>
                  <span>{post.readingTime} min</span>
                </div>
              </div>
              <PostRowActions
                post={{ id: post.id, slug: post.slug, status: post.status }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
