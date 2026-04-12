import { AboutMe } from "@/components/homepage/about-me";
import { Portfolio } from "@/components/homepage/portfolio";
import { Socials } from "@/components/homepage/socials";
import { AdminLink } from "@/components/homepage/admin-link";

export default function Homepage() {
  return (
    <main className="flex flex-col w-full max-w-100 px-2.5 gap-8">
      <AboutMe />
      <Portfolio />
      <Socials />
      <AdminLink />
    </main>
  );
}
