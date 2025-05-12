import { blogPosts } from "../config/constants";
import { BlogPostCard } from "../components";

function Blog() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogPostCard key={index} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
