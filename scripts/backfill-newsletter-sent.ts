/**
 * One-off: mark every already-published post as "newsletter already sent" so
 * editing or re-saving an old post never emails it to subscribers. Drafts are
 * left untouched, so a draft still goes out the first time it's published.
 *
 * Run once per database after deploying the newsletter:
 *   - Local:  node --env-file=.env.local --import tsx scripts/backfill-newsletter-sent.ts
 *   - Atlas:  npx tsx scripts/backfill-newsletter-sent.ts   (reads .env.production)
 */

import mongoose from "mongoose";
import { Post } from "../src/lib/models/Post";
import { loadEnv } from "./load-env";

async function main(): Promise<void> {
  loadEnv();
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  await mongoose.connect(uri);
  const result = await Post.updateMany(
    { status: "published", newsletterSentAt: null },
    [{ $set: { newsletterSentAt: { $ifNull: ["$publishedAt", "$createdAt"] } } }],
    { updatePipeline: true }
  );
  console.log(
    `Marked ${result.modifiedCount} published post(s) as already announced.`
  );
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
