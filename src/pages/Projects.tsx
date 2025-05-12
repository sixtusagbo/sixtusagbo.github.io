import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "uStackSchool",
    description: "Educational platform built with NextJS and TypeScript",
    image: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg",
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
    image: "https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg",
    tech: ["Flutter", "Dart", "SQLite"],
    links: {
      playstore: "https://play.google.com/store/apps/details?id=com.aceitpro",
    },
  },
  {
    title: "Vitrine",
    description: "Brand showcase application",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
    tech: ["Python", "Flask", "PostgreSQL"],
    links: {
      live: "https://vitrine-demo.com",
      github: "https://github.com/sixtusagbo/vitrine",
    },
  },
];

function Projects() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Featured Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
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
    </div>
  );
}

export default Projects;
