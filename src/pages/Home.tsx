import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, BookOpen, User, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, skillsData, blogPosts } from "../config/constants";
import { ProjectCard, SkillBadge, BlogPostCard } from "../components";

import { Twitter, Linkedin, Github, Mail } from "lucide-react";

interface HomeProps {
  socialLinks: {
    twitter: { url: string; label: string };
    linkedin: { url: string; label: string };
    github: { url: string; label: string };
    email: { url: string; label: string };
    blog: { url: string; label: string };
  };
}

function Home({ socialLinks }: HomeProps) {
  // Use first 4 projects as featured projects
  const featuredProjects = projects.slice(0, 4);

  // Use first 3 blog posts as recent blog posts
  const recentBlogPosts = blogPosts.slice(0, 3);

  // State for tracking which skill categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>(() => {
    // 768px corresponds to Tailwind's "md" breakpoint
    const isMobile = window.innerWidth < 768;
    return {
      "Programming Languages & Frameworks": !isMobile,
      "Development Tools & Practices": !isMobile,
      "Soft Skills & Abilities": !isMobile,
    };
  });

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Update expanded state on window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Auto-collapse categories when transitioning to mobile view
      // and expand them when transitioning to desktop view
      setExpandedCategories({
        "Programming Languages & Frameworks": !isMobile,
        "Development Tools & Practices": !isMobile,
        "Soft Skills & Abilities": !isMobile,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center backdrop-blur-xl bg-white/10 rounded-3xl p-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 text-center space-y-6">
          <motion.h1
            className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Sixtus Miracle Agbo
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Building high-performance websites and mobile apps with a passion
            for creating exceptional digital experiences.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <a
              href={socialLinks.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:text-blue-400 transition-colors backdrop-blur-sm bg-white/5 rounded-lg">
              <Twitter size={20} />
            </a>
            <a
              href={socialLinks.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:text-blue-400 transition-colors backdrop-blur-sm bg-white/5 rounded-lg">
              <Linkedin size={20} />
            </a>
            <a
              href={socialLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:text-blue-400 transition-colors backdrop-blur-sm bg-white/5 rounded-lg">
              <Github size={20} />
            </a>
            <a
              href={socialLinks.email.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:text-blue-400 transition-colors backdrop-blur-sm bg-white/5 rounded-lg">
              <Mail size={20} />
            </a>
            <a
              href={socialLinks.blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:text-blue-400 transition-colors backdrop-blur-sm bg-white/5 rounded-lg">
              <BookOpen size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <motion.section
        className="backdrop-blur-xl bg-white/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <User size={24} />
          About Me
        </h2>
        <div className="md:flex gap-8 items-center">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img
                src="/images/me.jpg"
                alt="Sixtus Agbo"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="md:w-2/3 space-y-4">
            <p className="text-lg">
              Hello👋! I'm Sixtus Miracle Agbo, a passionate Full-Stack
              Developer with a love for creating elegant, high-performance
              digital solutions. With expertise in Python, Javascript,
              TypeScript, Flutter and Dart, I bridge the gap between design and
              functionality.
            </p>
            <p className="text-lg">
              I've helped startups and established organizations transform their
              ideas into reality through clean code and innovative thinking. My
              mission is to build software that not only works flawlessly but
              delivers exceptional user experiences.
            </p>
            <p className="text-lg">
              When I'm not coding, you'll find me writing technical articles,
              exploring new technologies, playing basketball or even mentoring
              upcoming developers. I believe in continuous learning and giving
              back to the tech community.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity inline-block">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Overview */}
      <section className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 space-y-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Code size={24} />
          Skills
        </h2>

        {Object.entries(skillsData).map(
          ([category, categorySkills], categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between text-xl font-medium text-blue-400 border-b border-blue-500/20 pb-2 hover:text-blue-300 transition-all focus:outline-none group cursor-pointer"
                aria-expanded={expandedCategories[category]}
                aria-controls={`skills-${categoryIndex}`}>
                <span className="flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded mr-2 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  {category}
                </span>
                <div className="bg-blue-500/20 rounded-full p-1 group-hover:bg-blue-500/30 transition-all group-hover:scale-110">
                  {expandedCategories[category] ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              </button>

              {expandedCategories[category] && (
                <motion.div
                  id={`skills-${categoryIndex}`}
                  initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                  animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {(categorySkills as string[]).map(
                    (skill: string, index: number) => (
                      <SkillBadge
                        key={`${categoryIndex}-${index}`}
                        skill={skill}
                        index={categoryIndex * 10 + index}
                      />
                    )
                  )}
                </motion.div>
              )}
            </div>
          )
        )}
      </section>

      {/* Recent Blog Posts */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen size={24} />
            Recent Blog Posts
          </h2>
          <Link
            to="/blog"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
            View All Posts
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} index={index} />
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link
            to="/projects"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
            View All Projects
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
