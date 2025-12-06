import { useState, useMemo, useEffect } from "react";
import { projects } from "../config/projects";
import { X, ArrowUpRight, ExternalLink, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Projects() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Check for URL parameters on component mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const filterParam = url.searchParams.get("filter");
    if (filterParam) {
      setActiveFilters([filterParam]);
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("filter");
    activeFilters.forEach((filter) => {
      url.searchParams.append("filter", filter);
    });
    window.history.pushState({}, "", url);
  }, [activeFilters]);

  // Extract all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.tech.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) {
      return projects;
    }
    return projects.filter((project) =>
      activeFilters.every((filter) => project.tech.includes(filter))
    );
  }, [activeFilters]);

  // Handle tech filter click
  const toggleFilter = (tech: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(tech)) {
        return prev.filter((t) => t !== tech);
      } else {
        return [...prev, tech];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12">
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Portfolio</span>
              <h1 className="text-4xl md:text-6xl font-bold">
                {activeFilters.length > 0
                  ? `Projects with ${activeFilters.join(", ")}`
                  : "My Projects"}
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl">
                A collection of projects I've worked on, ranging from web applications to mobile apps.
                Each project represents a unique challenge and learning experience.
              </p>
            </div>

            {/* Filter Toggle - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium">
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFilters.length > 0 && (
                <span className="px-2 py-0.5 bg-white text-neutral-950 rounded-full text-xs">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">Filter by Technology</h2>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                  <X size={14} />
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleFilter(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilters.includes(tech)
                      ? "bg-white text-neutral-950"
                      : "bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300"
                  }`}>
                  {tech}
                </button>
              ))}
            </div>

            {activeFilters.length > 0 && (
              <p className="text-sm text-neutral-500">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            )}
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-20 bg-neutral-900 rounded-3xl border border-neutral-800">
              <p className="text-xl text-neutral-400 mb-4">No projects match the selected filters.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
                  {/* Image Container */}
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer"
                    onClick={() => setModalImage({ src: project.image, alt: project.title })}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        Click to expand
                      </span>
                    </div>

                    {/* Quick Links Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold group-hover:text-neutral-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => toggleFilter(tech)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            activeFilters.includes(tech)
                              ? "bg-white text-neutral-950"
                              : "bg-neutral-800 hover:bg-neutral-700 text-neutral-400"
                          }`}>
                          {tech}
                        </button>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Live Demo <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Source Code <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.playstore && (
                        <a
                          href={project.links.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Play Store <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.appstore && (
                        <a
                          href={project.links.appstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          App Store <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.docs && (
                        <a
                          href={project.links.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Documentation <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.links.youtube && (
                        <a
                          href={project.links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                          Demo Video <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Full-screen Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 p-4"
            onClick={() => setModalImage(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}>
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                className="w-full h-auto rounded-2xl"
              />
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 p-3 bg-neutral-900/80 backdrop-blur-sm rounded-full hover:bg-neutral-800 transition-colors">
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
