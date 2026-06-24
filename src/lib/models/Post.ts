import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
    readingTime: { type: Number, default: 1 },
    views: { type: Number, default: 0 },
    // Stamped the first time a published post is emailed to subscribers, so it
    // never goes out twice on re-saves or re-publishes.
    newsletterSentAt: { type: Date, default: null },
  },
  { timestamps: true }
);

postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ status: 1, tags: 1 });
postSchema.index(
  { title: "text", tags: "text", excerpt: "text", content: "text" },
  {
    weights: { title: 10, tags: 5, excerpt: 3, content: 1 },
    name: "post_text_search",
  }
);

export type PostDoc = InferSchemaType<typeof postSchema>;

export const Post: Model<PostDoc> =
  models.Post ?? model("Post", postSchema);
