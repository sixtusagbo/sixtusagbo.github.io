import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const blogPosts = [
  {
    title: "Building Scalable Applications with NextJS",
    excerpt:
      "Learn how to build and deploy scalable applications using NextJS and modern web technologies...",
    image:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
    link: "https://sixtusagbo.medium.com/building-scalable-applications",
  },
  {
    title: "Flutter vs React Native: A Developer's Perspective",
    excerpt:
      "A detailed comparison of Flutter and React Native for mobile app development...",
    image:
      "https://images.pexels.com/photos/12883026/pexels-photo-12883026.jpeg",
    link: "https://sixtusagbo.medium.com/flutter-vs-react-native",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring upcoming trends and technologies shaping the future of web development...",
    image: "https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg",
    link: "https://sixtusagbo.medium.com/future-of-web-development",
  },
];

function Blog() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default Blog;
