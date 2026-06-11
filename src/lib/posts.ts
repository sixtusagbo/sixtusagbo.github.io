import type { QueryFilter, SortOrder } from "mongoose";
import { connectDB } from "./db";
import { Post, type PostDoc } from "./models/Post";
import {
  calculateReadingTime,
  escapeRegExp,
  excerptFromMarkdown,
  slugify,
} from "./utils";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  views: number;
};

export type PostSort = "newest" | "oldest" | "title";

export type PostListQuery = {
  q?: string;
  tag?: string;
  sort?: PostSort;
  page?: number;
  perPage?: number;
};

export type PostListResult = {
  posts: BlogPost[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type PostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  status: "draft" | "published";
};

const LIST_PROJECTION = "-content";
const DEFAULT_PER_PAGE = 10;

type LeanPost = PostDoc & { _id: unknown; createdAt: Date; updatedAt: Date };

function serialize(doc: LeanPost): BlogPost {
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? "",
    content: doc.content ?? "",
    coverImage: doc.coverImage ?? "",
    tags: doc.tags ?? [],
    status: doc.status as "draft" | "published",
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    createdAt: doc.createdAt?.toISOString() ?? "",
    updatedAt: doc.updatedAt?.toISOString() ?? "",
    readingTime: doc.readingTime ?? 1,
    views: doc.views ?? 0,
  };
}

const SORTS: Record<PostSort, Record<string, SortOrder>> = {
  newest: { publishedAt: -1 },
  oldest: { publishedAt: 1 },
  title: { title: 1 },
};

async function findMatchingIds(
  filter: QueryFilter<PostDoc>,
  q: string
): Promise<string[]> {
  const rx = new RegExp(escapeRegExp(q), "i");
  const [textMatches, substringMatches] = await Promise.all([
    Post.find({ ...filter, $text: { $search: q } })
      .select("_id")
      .lean(),
    Post.find({
      ...filter,
      $or: [{ title: rx }, { tags: rx }, { excerpt: rx }],
    })
      .select("_id")
      .lean(),
  ]);
  const ids = new Set<string>();
  for (const doc of [...textMatches, ...substringMatches]) {
    ids.add(String(doc._id));
  }
  return [...ids];
}

export async function getPublishedPosts(
  query: PostListQuery = {}
): Promise<PostListResult> {
  await connectDB();

  const { q, tag, sort = "newest" } = query;
  const perPage = query.perPage ?? DEFAULT_PER_PAGE;

  const filter: QueryFilter<PostDoc> = { status: "published" };
  if (tag) filter.tags = tag;
  if (q?.trim()) filter._id = { $in: await findMatchingIds(filter, q.trim()) };

  const total = await Post.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages);

  const docs = await Post.find(filter)
    .sort(SORTS[sort])
    .skip((page - 1) * perPage)
    .limit(perPage)
    .select(LIST_PROJECTION)
    .lean<LeanPost[]>();

  return { posts: docs.map(serialize), total, page, perPage, totalPages };
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  await connectDB();
  const docs = await Post.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .select(LIST_PROJECTION)
    .lean<LeanPost[]>();
  return docs.map(serialize);
}

export async function getPostBySlug(
  slug: string,
  { publishedOnly = true } = {}
): Promise<BlogPost | null> {
  await connectDB();
  const filter: QueryFilter<PostDoc> = { slug };
  if (publishedOnly) filter.status = "published";
  const doc = await Post.findOne(filter).lean<LeanPost>();
  return doc ? serialize(doc) : null;
}

export async function getAdjacentPosts(publishedAt: string): Promise<{
  prev: BlogPost | null;
  next: BlogPost | null;
}> {
  await connectDB();
  const date = new Date(publishedAt);
  const [prevDoc, nextDoc] = await Promise.all([
    Post.findOne({ status: "published", publishedAt: { $lt: date } })
      .sort({ publishedAt: -1 })
      .select("title slug excerpt publishedAt readingTime coverImage tags")
      .lean<LeanPost>(),
    Post.findOne({ status: "published", publishedAt: { $gt: date } })
      .sort({ publishedAt: 1 })
      .select("title slug excerpt publishedAt readingTime coverImage tags")
      .lean<LeanPost>(),
  ]);
  return {
    prev: prevDoc ? serialize(prevDoc) : null,
    next: nextDoc ? serialize(nextDoc) : null,
  };
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  await connectDB();
  const results = await Post.aggregate<{ _id: string; count: number }>([
    { $match: { status: "published" } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
  ]);
  return results.map((r) => ({ tag: r._id, count: r.count }));
}

export async function getAllPublishedSlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  await connectDB();
  const docs = await Post.find({ status: "published" })
    .select("slug updatedAt")
    .lean<LeanPost[]>();
  return docs.map((d) => ({
    slug: d.slug,
    updatedAt: d.updatedAt.toISOString(),
  }));
}

export async function incrementViews(slug: string): Promise<void> {
  await connectDB();
  await Post.updateOne({ slug, status: "published" }, { $inc: { views: 1 } });
}

// Admin queries

export async function adminListPosts(): Promise<BlogPost[]> {
  await connectDB();
  const docs = await Post.find()
    .sort({ updatedAt: -1 })
    .select(LIST_PROJECTION)
    .lean<LeanPost[]>();
  return docs.map(serialize);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  await connectDB();
  const doc = await Post.findById(id).lean<LeanPost>();
  return doc ? serialize(doc) : null;
}

export async function getStats(): Promise<{
  total: number;
  published: number;
  drafts: number;
  totalViews: number;
}> {
  await connectDB();
  const [total, published, views] = await Promise.all([
    Post.countDocuments(),
    Post.countDocuments({ status: "published" }),
    Post.aggregate<{ _id: null; views: number }>([
      { $group: { _id: null, views: { $sum: "$views" } } },
    ]),
  ]);
  return {
    total,
    published,
    drafts: total - published,
    totalViews: views[0]?.views ?? 0,
  };
}

function normalizeInput(input: PostInput) {
  const content = input.content ?? "";
  return {
    title: input.title.trim(),
    slug: slugify(input.slug?.trim() || input.title),
    excerpt: input.excerpt?.trim() || excerptFromMarkdown(content),
    content,
    coverImage: input.coverImage?.trim() ?? "",
    tags: (input.tags ?? []).map((t) => t.trim()).filter(Boolean),
    status: input.status,
    readingTime: calculateReadingTime(content),
  };
}

export async function createPost(input: PostInput): Promise<BlogPost> {
  await connectDB();
  const data = normalizeInput(input);
  const doc = await Post.create({
    ...data,
    publishedAt: data.status === "published" ? new Date() : null,
  });
  return serialize(doc.toObject());
}

export async function updatePost(
  id: string,
  input: PostInput
): Promise<BlogPost | null> {
  await connectDB();
  const existing = await Post.findById(id);
  if (!existing) return null;

  const data = normalizeInput(input);
  existing.set(data);
  // Keep the original publish date on republish; stamp it on first publish
  if (data.status === "published" && !existing.publishedAt) {
    existing.publishedAt = new Date();
  }
  await existing.save();
  return serialize(existing.toObject());
}

export async function deletePost(id: string): Promise<BlogPost | null> {
  await connectDB();
  const doc = await Post.findByIdAndDelete(id).lean<LeanPost>();
  return doc ? serialize(doc) : null;
}

export async function isSlugTaken(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  await connectDB();
  const filter: QueryFilter<PostDoc> = { slug };
  if (excludeId) filter._id = { $ne: excludeId };
  return (await Post.exists(filter)) !== null;
}
