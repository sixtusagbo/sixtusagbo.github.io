import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Eye, FileText, NotebookPen, Send } from "lucide-react";
import { adminListPosts, getStats } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const [stats, posts] = await Promise.all([getStats(), adminListPosts()]);
  const recent = posts.slice(0, 5);

  const cards = [
    { label: "Total Posts", value: stats.total, icon: FileText },
    { label: "Published", value: stats.published, icon: Send },
    { label: "Drafts", value: stats.drafts, icon: NotebookPen },
    { label: "Total Views", value: stats.totalViews, icon: Eye },
  ];

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-neutral-400 text-sm">
            Overview of your blog activity
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-950 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors self-start sm:self-auto">
          New Post
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-3">
            <Icon size={20} className="text-neutral-500" />
            <div>
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-sm text-neutral-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recently Updated</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-neutral-400 hover:text-white transition-colors">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-10 text-center space-y-4">
            <p className="text-neutral-400">
              No posts yet. Write your first one!
            </p>
            <Link
              href="/admin/posts/new"
              className="inline-block px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
              New Post
            </Link>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl divide-y divide-neutral-800">
            {recent.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="flex items-center justify-between gap-4 p-5 hover:bg-neutral-800/50 transition-colors first:rounded-t-3xl last:rounded-b-3xl">
                <div className="min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-sm text-neutral-500">
                    Updated {formatDate(post.updatedAt)}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === "published"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-amber-500/15 text-amber-400"
                  }`}>
                  {post.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
