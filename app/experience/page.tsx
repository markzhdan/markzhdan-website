import experience from "@/data/experience.json";
import { BackLink } from "@/components/back-link";
import { Heading } from "@/components/heading";
import { ExperienceItem } from "@/components/experience/experience-item";

export default function ExperiencePage() {
  return (
    <main className="flex flex-col w-100 px-2.5 gap-6">
      <BackLink />
      <Heading size="xl">Experience</Heading>
      <div className="flex flex-col divide-y divide-neutral-100">
        {experience.map((item) => (
          <ExperienceItem key={`${item.company}-${item.startDate}`} item={item} />
        ))}
      </div>
    </main>
  );
}
