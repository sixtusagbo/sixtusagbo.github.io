import { ExternalLink, FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    links: {
      live?: string;
      github?: string;
      playstore?: string;
      appstore?: string;
      docs?: string;
      youtube?: string;
    };
  };
  index: number;
  onFilterClick?: (tech: string) => void;
  onImageClick?: (image: string, alt: string) => void;
}

const ProjectCard = ({
  project,
  index,
  onFilterClick,
  onImageClick,
}: ProjectCardProps) => {
  return (
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
        {/* Eye icon overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() =>
            onImageClick && onImageClick(project.image, project.title)
          }>
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
            <Eye size={24} color="white" />
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
              <img
                src="/images/github-mark.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
            </a>
          )}
          {project.links.docs && (
            <a
              href={project.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
              <FileText size={20} />
            </a>
          )}
          {project.links.playstore && (
            <a
              href={project.links.playstore}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
              <img
                src="/images/playstore.svg"
                alt="Play Store"
                width={20}
                height={20}
              />
            </a>
          )}
          {project.links.appstore && (
            <a
              href={project.links.appstore}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
              <img
                src="/images/apple-black-logo.svg"
                alt="App Store"
                width={20}
                height={20}
              />
            </a>
          )}
          {project.links.youtube && (
            <a
              href={project.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 backdrop-blur-md bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
              <img
                src="/images/youtube.svg"
                alt="YouTube Demo"
                width={20}
                height={20}
              />
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
              className="px-3 py-1 rounded-full text-sm bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => (onFilterClick ? onFilterClick(tech) : null)}
              title={`Filter by ${tech}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
