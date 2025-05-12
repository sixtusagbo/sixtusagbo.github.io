import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Code,
  BookOpen,
  User,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Terminal,
  Code2,
} from "lucide-react";
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

  // State for tracking role rotation
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Mobile App Developer",
    "Problem Solver",
  ];

  // Set up the interval for rotating roles
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center backdrop-blur-xl bg-white/10 rounded-3xl p-6 md:p-8 overflow-hidden">
        {/* Animated background with particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black/30 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg')] bg-cover bg-center opacity-20"></div>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.4 + Math.random() * 0.6,
              }}
              animate={{
                y: [0, Math.random() * -100, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto">
          {/* Code brackets animation */}
          <div className="hidden md:block">
            <motion.div
              className="absolute -left-4 -top-8 text-blue-400/30 text-7xl font-mono"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}>
              {"<"}
            </motion.div>
            <motion.div
              className="absolute -right-4 -bottom-8 text-blue-400/30 text-7xl font-mono"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}>
              {"/>"}
            </motion.div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-8">
            {/* Intro with glowing effect */}
            <motion.div
              className="flex justify-center items-center gap-2 text-sm md:text-base"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Name with dynamic animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}>
                Sixtus Miracle Agbo
              </motion.h1>
            </motion.div>

            {/* Rotating words for roles */}
            <div className="h-8 md:h-10 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-center items-center text-xl md:text-2xl">
                <span className="mr-2 text-gray-300">I'm a</span>
                <div className="relative h-full flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    {roles.map((role, index) => (
                      <motion.div
                        key={role}
                        className="relative"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{
                          y: roleIndex === index ? 0 : -40,
                          opacity: roleIndex === index ? 1 : 0,
                        }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{
                          y: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        style={{
                          display: roleIndex === index ? "block" : "none",
                        }}>
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          {role}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Description with typing animation */}
            <div className="h-20">
              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}>
                {[
                  ..."Crafting high-performance websites and mobile apps with a passion for exceptional digital experiences.",
                ].map((char, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index == 0 ? "text-purple-400" : ""
                    } ${char === " " ? "mr-[0.2em]" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.15,
                      delay: 0.8 + index * 0.02,
                      ease: "easeInOut",
                    }}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            {/* Tech stack icons */}
            <motion.div
              className="flex justify-center gap-4 flex-wrap max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}>
              <TechBadge icon={<Code2 size={16} />} name="React" />
              <TechBadge icon={<Sparkles size={16} />} name="Flutter" />
              <TechBadge icon={<Terminal size={16} />} name="Python" />
              <TechBadge icon={<Zap size={16} />} name="TypeScript" />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col md:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}>
              <Link
                to="/projects"
                className="relative group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-all overflow-hidden">
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                Let's Connect
              </Link>
            </motion.div>

            {/* Social media links with hover effects */}
            <motion.div
              className="flex justify-center gap-4 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}>
              <a
                href={socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:text-blue-400 transition-all hover:scale-110 backdrop-blur-sm bg-white/5 rounded-lg">
                <Github size={20} />
              </a>
              <a
                href={socialLinks.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:text-blue-400 transition-all hover:scale-110 backdrop-blur-sm bg-white/5 rounded-lg">
                <Linkedin size={20} />
              </a>
              <a
                href={socialLinks.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:text-blue-400 transition-all hover:scale-110 backdrop-blur-sm bg-white/5 rounded-lg">
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.email.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:text-blue-400 transition-all hover:scale-110 backdrop-blur-sm bg-white/5 rounded-lg">
                <Mail size={20} />
              </a>
              <a
                href={socialLinks.blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:text-blue-400 transition-all hover:scale-110 backdrop-blur-sm bg-white/5 rounded-lg">
                <BookOpen size={20} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}>
          <div className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-white/60"></div>
          </div>
        </motion.div>
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

// Tech badge component for displaying tech stack
interface TechBadgeProps {
  icon: React.ReactNode;
  name: string;
}

function TechBadge({ icon, name }: TechBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}>
      {icon}
      <span className="text-sm">{name}</span>
    </motion.div>
  );
}

export default Home;
