import React from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

interface HomeProps {
  socialLinks: Array<{
    icon: React.ReactNode;
    url: string;
    label: string;
  }>;
}

function Home({ socialLinks }: HomeProps) {
  const featuredProjects = [
    {
      title: "uStackSchool",
      description: "Educational platform built with NextJS and TypeScript",
      image:
        "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg",
      tech: ["NextJS", "TypeScript", "TailwindCSS"],
      links: {
        live: "https://ustackschool.com",
        github: "https://github.com/sixtusagbo/ustackschool",
      },
    },
    {
      title: "Lifepadi",
      description: "E-commerce and logistics mobile app",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
      tech: ["Flutter", "Dart", "Firebase"],
      links: {
        playstore: "https://play.google.com/store/apps/details?id=com.lifepadi",
        appstore: "https://apps.apple.com/app/lifepadi",
      },
    },
    {
      title: "Ace iT Pro",
      description: "Exam preparation mobile app",
      image:
        "https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg",
      tech: ["Flutter", "Dart", "SQLite"],
      links: {
        playstore: "https://play.google.com/store/apps/details?id=com.aceitpro",
      },
    },
    {
      title: "Vitrine",
      description: "Brand showcase application",
      image:
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
      tech: ["Python", "Flask", "PostgreSQL"],
      links: {
        live: "https://vitrine-demo.com",
        github: "https://github.com/sixtusagbo/vitrine",
      },
    },
  ];

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
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:text-blue-400 transition-colors backdrop-blur-sm bg-white/5 rounded-lg">
                {link.icon}
              </a>
            ))}
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
          {[
            "Flutter & Dart",
            "React & NextJS",
            "Python & Flask",
            "TypeScript",
            "PHP & Laravel",
            "Git & DevOps",
            "Database Management",
            "System Administration",
          ].map((skill, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-sm bg-white/5 rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              {skill}
            </motion.div>
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
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-md bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 backdrop-blur-md bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm bg-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
