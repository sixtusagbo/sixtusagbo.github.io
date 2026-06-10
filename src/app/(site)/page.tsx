import HomePage from "@/components/home/HomePage";
import { getRecentPosts, type BlogPost } from "@/lib/posts";

export const revalidate = 3600;

export default async function Home() {
  let recentPosts: BlogPost[] = [];
  try {
    recentPosts = await getRecentPosts(3);
  } catch {
    // Render the homepage without the blog section if the DB is unreachable
  }
  return <HomePage recentPosts={recentPosts} />;
}
