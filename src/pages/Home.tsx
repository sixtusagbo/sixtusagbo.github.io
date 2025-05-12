import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, skills } from "../config/constants";
import { ProjectCard, SkillBadge } from "../components";

import { Twitter, Linkedin, Github, Mail, BookOpen } from "lucide-react";

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

      {/* Skills Overview */}
      <section className="backdrop-blur-xl bg-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Code size={24} />
          Core Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillBadge key={index} skill={skill} index={index} />
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
