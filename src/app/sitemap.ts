import type { MetadataRoute } from "next";
import { getAllPublishedSlugs } from "@/lib/posts";
import { SITE_URL } from "@/config/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPublishedSlugs();
    postRoutes = slugs.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // Sitemap still serves static routes if the DB is unreachable
  }

  return [...staticRoutes, ...postRoutes];
}
