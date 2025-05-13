import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPostCardProps {
  post: {
    title: string;
    excerpt: string;
    image: string;
    link: string;
    date?: string;
    tags?: string[];
    readTime?: string;
  };
  index: number;
}

const BlogPostCard = ({ post, index }: BlogPostCardProps) => {
  // Format the date to be more readable
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      key={index}
      className="block group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="relative h-48">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-500/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {post.tags[0]}
              </span>
            </div>
          )}
          <Link
            to="/blog/detail"
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30 transition-colors">
            <ArrowRight size={16} className="text-white" />
          </Link>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-300">
            {post.date && (
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          
          <Link 
            to="/blog/detail"
            className="block">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-300 mb-4">{post.excerpt}</p>
          
          {post.tags && post.tags.length > 1 && (
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(1, 4).map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400">
                    +{post.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;
