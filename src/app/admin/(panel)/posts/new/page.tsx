import type { Metadata } from "next";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = { title: "New Post" };

export default function NewPostPage() {
  return <PostEditor unsplashEnabled={Boolean(process.env.UNSPLASH_ACCESS_KEY)} />;
}
