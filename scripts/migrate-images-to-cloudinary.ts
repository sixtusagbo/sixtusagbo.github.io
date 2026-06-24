/**
 * One-off: move local blog + project images to Cloudinary and rewrite every
 * reference to point at the Cloudinary URLs.
 *
 * - Uploads public/images/blog/<slug>/* -> Cloudinary public_id blog/<slug>/<name>
 * - Uploads public/images/projects/*    -> Cloudinary public_id projects/<name>
 * - Rewrites cover/content image paths in the Atlas posts
 * - Rewrites image paths in src/config/projects.ts
 *
 * After this runs, delete the local public/images/{blog,projects} folders.
 *
 * Requires (in .env.production or .env.local), SCRIPT-ONLY creds:
 *   MONGODB_URI (Atlas), CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 *
 * Usage: npx tsx scripts/migrate-images-to-cloudinary.ts
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
} from "node:fs";
import { dirname, join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { Post } from "../src/lib/models/Post";
import { loadEnv } from "./load-env";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) out.push(...walk(abs));
    else out.push(abs);
  }
  return out;
}

function webPath(abs: string): string {
  return "/" + relative(PUBLIC_DIR, abs).split(/[/\\]/).join("/");
}

function publicId(abs: string): string {
  const rel = relative(join(PUBLIC_DIR, "images"), abs)
    .split(/[/\\]/)
    .join("/");
  return rel.slice(0, rel.length - extname(rel).length);
}

async function uploadAll(dir: string): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const files = walk(dir).filter((f) =>
    /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(f)
  );
  for (const abs of files) {
    const id = publicId(abs);
    const res = await cloudinary.uploader.upload(abs, {
      public_id: id,
      overwrite: true,
      invalidate: true,
      resource_type: "image",
    });
    map.set(webPath(abs), res.secure_url);
    console.log(`  ↑ ${webPath(abs)} -> ${res.secure_url}`);
  }
  return map;
}

function replaceAll(text: string, map: Map<string, string>): string {
  let out = text;
  for (const [local, url] of map) out = out.split(local).join(url);
  return out;
}

async function main() {
  loadEnv();

  const { MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  const missing = Object.entries({
    MONGODB_URI,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    throw new Error(`Missing env: ${missing.join(", ")}`);
  }
  if (!MONGODB_URI!.startsWith("mongodb+srv")) {
    console.warn(
      "WARNING: MONGODB_URI is not an Atlas (mongodb+srv) URI. Continuing anyway."
    );
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  console.log("Uploading blog images...");
  const blogMap = await uploadAll(join(PUBLIC_DIR, "images", "blog"));
  console.log("Uploading project images...");
  const projectMap = await uploadAll(join(PUBLIC_DIR, "images", "projects"));

  // Rewrite posts in Atlas
  console.log("\nRewriting post image URLs in the database...");
  await mongoose.connect(MONGODB_URI!);
  const posts = await Post.find();
  let updated = 0;
  for (const post of posts) {
    const newCover = blogMap.get(post.coverImage) ?? post.coverImage;
    const newContent = replaceAll(post.content, blogMap);
    if (newCover !== post.coverImage || newContent !== post.content) {
      post.coverImage = newCover;
      post.content = newContent;
      await post.save();
      updated++;
    }
  }
  await mongoose.disconnect();
  console.log(`  ${updated}/${posts.length} posts updated.`);

  // Rewrite projects config
  console.log("Rewriting src/config/projects.ts...");
  const projectsPath = join(ROOT, "src", "config", "projects.ts");
  const original = readFileSync(projectsPath, "utf8");
  const rewritten = replaceAll(original, projectMap);
  writeFileSync(projectsPath, rewritten);
  const remaining = (rewritten.match(/\/images\/projects\//g) ?? []).length;
  console.log(
    `  projects.ts rewritten (${remaining} local project paths remaining).`
  );

  console.log(
    `\nDone. Uploaded ${blogMap.size} blog + ${projectMap.size} project images.`
  );
  console.log(
    "Next: delete public/images/blog and public/images/projects, then commit."
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
