import { useState, useMemo, useEffect } from "react";
import { projects } from "../config/projects";
import { ProjectCard } from "../components";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Projects() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

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

    // Clear all existing filter params
    url.searchParams.delete("filter");

    // Add new filter params
    activeFilters.forEach((filter) => {
      url.searchParams.append("filter", filter);
    });

    // Update URL without refreshing the page
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
      // Check if project contains ALL selected filters
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

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        {activeFilters.length > 0
          ? `Projects with: ${activeFilters.join(", ")}`
          : "My Projects"}
      </h1>

      {/* Tech filters */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-3">Filter by Technology</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleFilter(tech)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeFilters.includes(tech)
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 hover:bg-white/10"
              }`}>
              {tech}
            </button>
          ))}
        </div>

        {activeFilters.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">
              Showing projects with: {activeFilters.join(", ")}
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-purple-400 hover:text-purple-300">
              <X size={16} className="mr-1" />
              Clear filters
            </button>
          </div>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-10 text-gray-300">
          No projects match the selected filters.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onFilterClick={toggleFilter}
              onImageClick={(image, alt) => setModalImage({ src: image, alt })}
            />
          ))}
        </motion.div>
      )}

      {/* Full-screen Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setModalImage(null)}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
            <motion.div
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}>
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                className="w-full h-auto object-contain"
              />
              <button
                className="absolute top-4 right-4 p-3 bg-dark-purple-800/20 backdrop-blur-md rounded-full hover:bg-dark-purple-800/30 transition-colors"
                onClick={() => setModalImage(null)}>
                <X size={24} color="white" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Projects;
