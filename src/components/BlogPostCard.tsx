import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface BlogPostCardProps {
  post: {
    title: string;
    excerpt: string;
    image: string;
    link: string;
  };
  index: number;
}

const BlogPostCard = ({ post, index }: BlogPostCardProps) => {
  return (
    <motion.a
      key={index}
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden h-full">
        <div className="relative h-48">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <ExternalLink size={20} className="text-white" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-300">{post.excerpt}</p>
        </div>
      </div>
    </motion.a>
  );
};

export default BlogPostCard;
