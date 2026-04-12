import { ExternalLink as ExternalLinkIcon } from "lucide-react";

type ProjectLink = {
  linkTitle: string;
  link: string;
};

type ProjectType = {
  name: string;
  description: string;
  links: ProjectLink[];
};

export function Project({ project }: { project: ProjectType }) {
  return (
    <div className="flex flex-col gap-1.5 py-4">
      <span className="font-heading text-2xl uppercase">{project.name}</span>
      <p className="text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-col gap-2">
        {project.links.map((link) => (
          <a
            key={link.link}
            href={link.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm"
          >
            {link.linkTitle}
            <ExternalLinkIcon size={11} />
          </a>
        ))}
      </div>
    </div>
  );
}
