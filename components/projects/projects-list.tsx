import projects from "@/data/projects.json";
import { Project } from "@/components/projects/project";

export function ProjectsList() {
  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <Project key={project.name} project={project} />
      ))}
    </div>
  );
}
