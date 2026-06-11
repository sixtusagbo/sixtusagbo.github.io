import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import {
  getAdjacentPosts,
  getAllPublishedSlugs,
  getPostBySlug,
  type BlogPost,
} from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, markdownToPlainText } from "@/lib/utils";
import { SITE_URL } from "@/config/constants";
import CodeCopyButtons from "@/components/blog/CodeCopyButtons";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import ViewTracker from "@/components/blog/ViewTracker";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Sixtus Miracle Agbo", url: SITE_URL }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      siteName: "Sixtus Agbo",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: ["Sixtus Miracle Agbo"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@siabormeestic",
    },
  };
}

function buildJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.coverImage
      ? [
          post.coverImage.startsWith("http")
            ? post.coverImage
            : `${SITE_URL}${post.coverImage}`,
        ]
      : [`${SITE_URL}/images/me.webp`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount: markdownToPlainText(post.content).split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: "Sixtus Miracle Agbo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Sixtus Miracle Agbo",
      url: SITE_URL,
    },
  };
}

function AdjacentPostCard({
  post,
  direction,
}: {
  post: BlogPost;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex-1 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 hover:border-neutral-700 transition-colors ${
        direction === "next" ? "text-right" : ""
      }`}>
      <div
        className={`flex items-center gap-2 text-sm text-neutral-500 mb-3 ${
          direction === "next" ? "justify-end" : ""
        }`}>
        {direction === "prev" && (
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
        )}
        <span>{direction === "prev" ? "Previous post" : "Next post"}</span>
        {direction === "next" && (
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        )}
      </div>
      <p className="font-semibold group-hover:text-neutral-300 transition-colors line-clamp-2">
        {post.title}
      </p>
    </Link>
  );
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [html, adjacent] = await Promise.all([
    renderMarkdown(post.content),
    post.publishedAt
      ? getAdjacentPosts(post.publishedAt)
      : Promise.resolve({ prev: null, next: null }),
  ]);

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="pt-32 pb-20">
      <ReadingProgress />
      <ViewTracker slug={post.slug} />
      <CodeCopyButtons />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(post)) }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to all posts</span>
        </Link>

        {/* Header */}
        <header className="space-y-6">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-xs font-medium text-neutral-300 transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center gap-3">
              <Image
                src="/images/me.webp"
                alt="Sixtus Miracle Agbo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-neutral-800"
              />
              <span className="font-medium text-white">
                Sixtus Miracle Agbo
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <time dateTime={post.publishedAt ?? undefined}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-neutral-800">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article
          className="blog-prose prose prose-invert prose-neutral prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Share */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-neutral-800">
          <span className="text-sm text-neutral-500">Share this post</span>
          <ShareButtons url={url} title={post.title} />
        </div>

        {/* Author card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Image
            src="/images/me.webp"
            alt="Sixtus Miracle Agbo"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-neutral-800"
          />
          <div className="space-y-2">
            <p className="font-semibold text-lg">Sixtus Miracle Agbo</p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Full-Stack Developer crafting high-performance web and mobile
              applications. I write about software development, technology, and
              lessons learned building real products.
            </p>
            <Link
              href="/#contact"
              className="inline-block text-sm text-white hover:text-neutral-300 transition-colors font-medium">
              Get in touch
            </Link>
          </div>
        </div>

        {/* Prev / Next */}
        {(adjacent.prev || adjacent.next) && (
          <nav className="flex flex-col sm:flex-row gap-4" aria-label="Adjacent posts">
            {adjacent.prev && (
              <AdjacentPostCard post={adjacent.prev} direction="prev" />
            )}
            {adjacent.next && (
              <AdjacentPostCard post={adjacent.next} direction="next" />
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
