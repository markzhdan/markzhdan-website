import { Heading } from "@/components/heading";
import { PageLink } from "@/components/page-link";
import { ExternalLink } from "@/components/external-link";

export function Portfolio() {
  return (
    <section className="flex flex-col gap-2">
      <Heading>Work</Heading>
      <div className="flex gap-4">
      <PageLink name="Experience" href="/experience" />
      <PageLink name="Projects" href="/projects" />
      <PageLink name="Blogs" href="/blogs" />
      <ExternalLink name="Resume" href="/Mark_Zhdan_Resume.pdf" />
      </div>
    </section>
  );
}
