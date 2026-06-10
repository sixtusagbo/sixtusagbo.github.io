import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export type PostCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string | null;
  readingTime: number;
};

type PostCardProps = {
  post: PostCardPost;
  compact?: boolean;
};

export default function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {post.coverImage && (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {post.tags[0] && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 backdrop-blur-sm rounded-full text-xs font-medium">
                {post.tags[0]}
              </span>
            )}
          </div>
        )}

        <div className="p-6 space-y-3 flex-1 flex flex-col">
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold group-hover:text-neutral-300 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {!compact && (
            <p className="text-neutral-400 text-sm line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {!compact && post.tags.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.slice(1, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-neutral-400">
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="px-2 py-1 text-xs text-neutral-500">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors pt-2 mt-auto">
            Read article
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
