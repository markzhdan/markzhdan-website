import socials from "@/data/socials.json";
import { Heading } from "@/components/heading";
import { ExternalLink } from "@/components/external-link";

export function Socials() {
  return (
    <section className="flex flex-col gap-2">
      <Heading>Connect</Heading>
      <div className="flex gap-4">
        {socials.map((social) => (
          <ExternalLink key={social.name} name={social.name} href={social.link} />
        ))}
      </div>
    </section>
  );
}
