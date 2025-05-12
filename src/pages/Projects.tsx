import { projects } from "../config/constants";
import { ProjectCard } from "../components";

function Projects() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Featured Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
