"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Mail, Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { skillsData, blogPosts, socialLinks } from "@/config/constants";
import { projects } from "@/config/projects";

// ScrollToTop component to handle scroll behavior
function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [pathname]);

  return null;
}

// Animated counter component
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const featuredProjects = projects.slice(0, 4);
  const recentBlogPosts = blogPosts.slice(0, 3);

  // Role rotation
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Mobile App Developer",
    "Problem Solver",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <ScrollToHash />

      {/* Hero Section - Full Screen Split */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                    Sixtus
                  </span>
                </h1>
                <div className="h-16 md:h-20 overflow-hidden">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-500">
                    {roles[roleIndex]}
                  </motion.div>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg">
                I craft high-performance web and mobile applications with a
                focus on exceptional user experiences and clean, maintainable
                code.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-all">
                  View My Work
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <a
                  href="https://drive.google.com/file/d/1B65GzErr4ZqwvoLXkIa7oBYU5AjCp97W/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-full font-semibold hover:border-neutral-500 hover:bg-neutral-900 transition-all">
                  <Download size={18} />
                  Resume
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-sm text-neutral-500">Find me on</span>
                <div className="flex gap-3">
                  {[
                    {
                      url: socialLinks.github.url,
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      url: socialLinks.linkedin.url,
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      url: socialLinks.twitter.url,
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Image with floating elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative">
              {/* Main Image */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl transform rotate-6"></div>
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src="/images/me.webp"
                    alt="Sixtus Agbo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent"></div>
                </div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        <Counter end={5} />+
                      </div>
                      <div className="text-xs text-neutral-500">Years Exp.</div>
                    </div>
                    <div className="w-px h-10 bg-neutral-800"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        <Counter end={110} />+
                      </div>
                      <div className="text-xs text-neutral-500">Projects</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Tech Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-4 -right-4 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 shadow-xl">
                  <span className="text-sm font-medium">
                    React • Flutter • Python
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="hidden lg:flex justify-center mt-20">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-neutral-500">
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-neutral-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-16">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold max-w-2xl">
                Passionate about creating impactful digital solutions
              </h2>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Bio Card - Large */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-2 bg-neutral-900 rounded-3xl p-8 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="space-y-6">
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    I&apos;m a Full-Stack Developer with expertise in building
                    scalable web and mobile applications. With a strong
                    foundation in{" "}
                    <span className="text-white font-medium">Python</span>,{" "}
                    <span className="text-white font-medium">
                      JavaScript/TypeScript
                    </span>
                    , and{" "}
                    <span className="text-white font-medium">Flutter</span>, I
                    bridge the gap between design and functionality.
                  </p>
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    I&apos;ve helped startups and organizations transform their ideas
                    into reality through clean code and innovative thinking. My
                    mission is to build software that impacts people&apos;s lives.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {[
                      "React",
                      "Next.js",
                      "Flutter",
                      "Python",
                      "TypeScript",
                      "Node.js",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-neutral-800 rounded-full text-sm text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                variants={itemVariants}
                className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="h-full flex flex-col justify-between">
                  <MapPin size={32} className="text-neutral-500" />
                  <div className="space-y-2 mt-auto">
                    <h3 className="text-xl font-semibold">
                      Currently in Nigeria
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Available for remote, on-site, and hybrid work
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              {[
                { value: "5+", label: "Years of Experience" },
                { value: "110+", label: "Projects Completed" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <div className="text-neutral-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-16">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                Skills
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                Tools & Technologies
              </h2>
            </motion.div>

            <div className="space-y-12">
              {Object.entries(skillsData).map(
                ([category, skills]) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="space-y-6">
                    <h3 className="text-xl font-semibold text-neutral-300">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {(skills as string[]).map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-sm font-medium transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-16">
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Featured Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                View all projects
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold group-hover:text-neutral-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-neutral-400">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-800 rounded-md text-xs text-neutral-500">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 pt-2">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Live <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Source <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-32 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-16">
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Blog
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Latest Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                View all posts
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogPosts.map((post) => (
                <motion.a
                  key={post.title}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="group block bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-neutral-500">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-neutral-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors">
                      Read article <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl"></div>

            <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants} className="space-y-6">
                  <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    Get in Touch
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Let&apos;s work together
                  </h2>
                  <p className="text-neutral-400 text-lg">
                    I&apos;m always open to discussing new projects, creative ideas,
                    or opportunities to be part of your visions.
                  </p>
                  <a
                    href={socialLinks.email.url}
                    className="group inline-flex items-center gap-3 text-xl font-semibold hover:text-neutral-300 transition-colors">
                    <Mail size={24} />
                    hi@sixtusagbo.dev
                    <ArrowUpRight
                      size={20}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href={socialLinks.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-2xl transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href={socialLinks.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-2xl transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href={socialLinks.twitter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-2xl transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Twitter
                    </a>
                    <a
                      href={socialLinks.blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-2xl transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z" />
                      </svg>
                      Blog
                    </a>
                  </div>

                  <div className="p-6 bg-neutral-800/50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-neutral-500" />
                      <div>
                        <p className="font-medium">Nigeria</p>
                        <p className="text-sm text-neutral-500">
                          Available for remote, on-site, and hybrid work
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
