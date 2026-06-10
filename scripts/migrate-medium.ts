/**
 * Migrates posts from Medium (https://sixtusagbo.medium.com/) into the blog DB.
 *
 * - Pulls the Medium RSS feed (full post HTML)
 * - Downloads every content image into public/images/blog/<slug>/
 * - Converts HTML to markdown
 * - Upserts posts by slug, preserving original publish dates and view counts
 *
 * Usage: npx tsx scripts/migrate-medium.ts
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import mongoose from "mongoose";
import { Post } from "../src/lib/models/Post";
import {
  calculateReadingTime,
  excerptFromMarkdown,
  slugify,
} from "../src/lib/utils";

const FEED_URL = "https://medium.com/feed/@sixtusagbo";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal(): void {
  try {
    const content = readFileSync(join(ROOT, ".env.local"), "utf8");
    for (const line of content.split("\n")) {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2];
      }
    }
  } catch {
    // no .env.local; rely on the environment
  }
}

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  category?: string | string[];
  "content:encoded"?: string;
  description?: string;
};

// Medium categories that title-casing alone would get wrong
const TAG_OVERRIDES: Record<string, string> = {
  ai: "AI",
  "ai-detector": "AI Detector",
  "5g": "5G",
  "5g-technology": "5G Technology",
  cicd: "CI/CD",
  "ci-cd-pipeline": "CI/CD Pipeline",
  continuosdeployment: "Continuous Deployment",
  defi: "DeFi",
  ios: "iOS",
  mvp: "MVP",
  webdev: "Web Dev",
};

function formatTag(tag: string): string {
  return (
    TAG_OVERRIDES[tag] ??
    tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function extOf(url: string): string {
  const match = new URL(url).pathname.match(/\.(png|jpe?g|gif|webp|avif|svg)$/i);
  return match ? match[0].toLowerCase() : ".jpg";
}

async function downloadImages(
  html: string,
  slug: string
): Promise<{ html: string; images: string[] }> {
  const urls = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((url) => !url.includes("medium.com/_/stat"));
  const unique = [...new Set(urls)];

  const dir = join(ROOT, "public", "images", "blog", slug);
  const images: string[] = [];
  let result = html;

  for (const [index, url] of unique.entries()) {
    const filename = `${String(index + 1).padStart(2, "0")}${extOf(url)}`;
    const localPath = `/images/blog/${slug}/${filename}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      mkdirSync(dir, { recursive: true });
      writeFileSync(
        join(dir, filename),
        Buffer.from(await response.arrayBuffer())
      );
      result = result.replaceAll(url, localPath);
      images.push(localPath);
    } catch (error) {
      console.warn(`  ! Failed to download ${url}: ${error}`);
    }
  }

  return { html: result, images };
}

function cleanHtml(html: string): string {
  return (
    html
      // Medium's tracking pixel
      .replace(/<img[^>]+medium\.com\/_\/stat[^>]*>/g, "")
      // Medium uses h3/h4 for section headings; lift them so the
      // document hierarchy continues from the page h1
      .replace(/<(\/?)h3/g, "<$1h2")
      .replace(/<(\/?)h4/g, "<$1h3")
      .trim()
  );
}

/** Drop a leading hero figure from the content; it becomes the cover image. */
function extractCover(html: string, images: string[]): {
  html: string;
  cover: string;
} {
  const heroMatch = html.match(/^\s*<figure>.*?<\/figure>/s);
  if (heroMatch && images[0] && heroMatch[0].includes(images[0])) {
    return { html: html.slice(heroMatch[0].length).trim(), cover: images[0] };
  }
  return { html, cover: images[0] ?? "" };
}

/**
 * Shift heading levels so the top content heading is h2 (the page h1 is the
 * post title). Fenced code blocks are left untouched.
 */
function normalizeHeadings(markdown: string): string {
  const parts = markdown.split(/(```[\s\S]*?```)/);
  const prose = parts.filter((p) => !p.startsWith("```")).join("\n");
  const levels = [...prose.matchAll(/^(#{1,6})\s/gm)].map((m) => m[1].length);
  if (levels.length === 0) return markdown;

  const shift = 2 - Math.min(...levels);
  if (shift === 0) return markdown;

  return parts
    .map((part) =>
      part.startsWith("```")
        ? part
        : part.replace(/^(#{1,6})(\s)/gm, (_, hashes: string, space: string) => {
            const level = Math.min(6, Math.max(2, hashes.length + shift));
            return "#".repeat(level) + space;
          })
    )
    .join("");
}

async function htmlToMarkdown(html: string): Promise<string> {
  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, { bullet: "-", emphasis: "_", rule: "-" })
    .process(html);
  return String(file).trim();
}

async function main() {
  loadEnvLocal();
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  console.log(`Fetching ${FEED_URL} ...`);
  const response = await fetch(FEED_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (blog migration script)" },
  });
  if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);
  const xml = await response.text();

  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml);
  const rawItems = feed?.rss?.channel?.item ?? [];
  const items: FeedItem[] = Array.isArray(rawItems) ? rawItems : [rawItems];
  console.log(`Found ${items.length} posts in the feed.\n`);

  await mongoose.connect(uri);

  let migrated = 0;
  for (const item of items) {
    const title = String(item.title).trim();
    const slug = slugify(title);
    console.log(`Migrating: ${title}`);

    const rawHtml = item["content:encoded"] ?? item.description ?? "";
    if (!rawHtml) {
      console.warn("  ! No content found, skipping.");
      continue;
    }

    const cleaned = cleanHtml(rawHtml);
    const { html: withLocalImages, images } = await downloadImages(
      cleaned,
      slug
    );
    const { html, cover } = extractCover(withLocalImages, images);
    const content = normalizeHeadings(await htmlToMarkdown(html));

    const categories = item.category
      ? Array.isArray(item.category)
        ? item.category
        : [item.category]
      : [];
    const tags = categories.map(formatTag);

    await Post.findOneAndUpdate(
      { slug },
      {
        $set: {
          title,
          excerpt: excerptFromMarkdown(content),
          content,
          coverImage: cover,
          tags,
          status: "published",
          publishedAt: new Date(item.pubDate),
          readingTime: calculateReadingTime(content),
        },
        $setOnInsert: { views: 0 },
      },
      { upsert: true, runValidators: true }
    );

    console.log(
      `  ✓ /blog/${slug} (${images.length} image${images.length === 1 ? "" : "s"}, ${tags.length} tags)`
    );
    migrated++;
  }

  await mongoose.disconnect();
  console.log(`\nDone. Migrated ${migrated}/${items.length} posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
