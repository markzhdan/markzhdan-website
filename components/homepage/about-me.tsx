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
        , based in Chicago. Built{" "}
        <a href="https://postplant.app" target="_blank" rel="noreferrer">
          Post-Plant
        </a>{" "}
        to help players get better at VALORANT.
      </p>
    </section>
  );
}
