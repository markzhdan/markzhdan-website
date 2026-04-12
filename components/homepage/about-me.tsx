import { Heading } from "@/components/heading";

export function AboutMe() {
  return (
    <section className="flex flex-col gap-2">
      <Heading size="xl">Mark Zhdan</Heading>
      <p className="text-sm leading-relaxed text italic">
        I'm a software engineer at{" "}
        <a href="https://www.blinkfire.com" target="_blank" rel="noreferrer">
          Blinkfire Analytics
        </a>
        . I also built{" "}
        <a href="https://usecurriculo.com" target="_blank" rel="noreferrer">
          Curriculo
        </a>{" "}
        to help students get organized. Visit{" "}
        <a href="https://postplant.app" target="_blank" rel="noreferrer">
          Post-Plant
        </a>{" "}
        to get better at VALORANT.
      </p>
    </section>
  );
}
