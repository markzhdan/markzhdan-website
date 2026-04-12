import { BackLink } from "@/components/back-link";
import { Heading } from "@/components/heading";
import { ProjectsList } from "@/components/projects/projects-list";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col w-full max-w-100 px-2.5 gap-6">
      <BackLink />
      <Heading size="xl">Projects</Heading>
      <ProjectsList />
    </main>
  );
}
