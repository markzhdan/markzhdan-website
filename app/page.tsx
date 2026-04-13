import { AboutMe } from "@/components/homepage/about-me";
import { Portfolio } from "@/components/homepage/portfolio";
import { Socials } from "@/components/homepage/socials";
import { AdminLink } from "@/components/homepage/admin-link";
import { Prefetch } from "@/components/prefetch";

export default function Homepage() {
  return (
    <main className="flex flex-col w-full max-w-100 px-2.5 gap-8">
      <link rel="prefetch" as="image" href="/logos/blinkfire_logo.png" />
      <AboutMe />
      <Portfolio />
      <Socials />
      <AdminLink />
      <Prefetch />
    </main>
  );
}
