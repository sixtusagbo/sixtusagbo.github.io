import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPublishedPosts, type PostSort } from "@/lib/posts";
import PostCard from "@/components/blog/PostCard";
import BlogControls from "@/components/blog/BlogControls";
import Pagination from "@/components/blog/Pagination";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const SORTS: PostSort[] = ["newest", "oldest", "title"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseQuery(params: Record<string, string | string[] | undefined>) {
  const sortParam = first(params.sort) as PostSort | undefined;
  return {
    q: first(params.q),
    tag: first(params.tag),
    sort: sortParam && SORTS.includes(sortParam) ? sortParam : ("newest" as PostSort),
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { q, tag, page } = parseQuery(await searchParams);

  const baseTitle = tag ? `${tag} Articles` : "Blog";
  const title = page > 1 ? `${baseTitle} - Page ${page}` : baseTitle;
  const description =
    "Articles and insights on software development, web and mobile engineering, and lessons learned along the way.";

  const canonicalParams = new URLSearchParams();
  if (tag) canonicalParams.set("tag", tag);
  if (page > 1) canonicalParams.set("page", String(page));
  const canonical = `/blog${canonicalParams.size ? `?${canonicalParams}` : ""}`;

  // Filtered/paginated listings are thin, near-duplicate views of /blog. Keep
  // them crawlable (so Google still finds the posts) but out of the index.
  const isFiltered = Boolean(q || tag) || page > 1;

  return {
    title,
    description,
    alternates: { canonical },
    robots: isFiltered ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | Sixtus Agbo`,
      description,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, tag, sort, page } = parseQuery(await searchParams);

  const [result, tags] = await Promise.all([
    getPublishedPosts({ q, tag, sort, page }),
    getAllTags(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sixtus Agbo's Blog",
    url: "https://sixtusagbo.dev/blog",
    description:
      "Articles and insights on software development, web and mobile engineering, and lessons learned along the way.",
    author: {
      "@type": "Person",
      name: "Sixtus Miracle Agbo",
      url: "https://sixtusagbo.dev",
    },
  };

  return (
    <div className="pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">
            Articles & Insights
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Thoughts on software development, technology trends, and lessons
            learned along the way.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <BlogControls tags={tags} />

          <div className="flex-1">
            {result.posts.length === 0 ? (
              <div className="text-center py-20 bg-neutral-900 rounded-3xl border border-neutral-800">
                <p className="text-xl text-neutral-400 mb-4">
                  No posts match your criteria.
                </p>
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
                  Clear filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>

                <p className="text-center text-neutral-500 text-sm mt-8">
                  Showing {result.posts.length} of {result.total} post
                  {result.total === 1 ? "" : "s"}
                </p>

                <Pagination
                  page={result.page}
                  totalPages={result.totalPages}
                  searchParams={{
                    q,
                    tag,
                    sort: sort === "newest" ? undefined : sort,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
