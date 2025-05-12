import { useState, useMemo, useEffect } from "react";
import { projects } from "../config/projects";
import { ProjectCard } from "../components";
import { X } from "lucide-react";
import { motion } from "framer-motion";

function Projects() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>

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
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Projects;
