import { getPublishedPosts } from "@/lib/posts";
import { SITE_URL } from "@/config/constants";

export const revalidate = 3600;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let items = "";
  try {
    const { posts } = await getPublishedPosts({ perPage: 100 });
    items = posts
      .map((post) => {
        const url = `${SITE_URL}/blog/${post.slug}`;
        const categories = post.tags
          .map((tag) => `<category>${escapeXml(tag)}</category>`)
          .join("");
        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt ?? post.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${categories}
    </item>`;
      })
      .join("\n");
  } catch {
    // Serve an empty feed if the DB is unreachable
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sixtus Agbo's Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles and insights on software development, web and mobile engineering, and lessons learned along the way.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
