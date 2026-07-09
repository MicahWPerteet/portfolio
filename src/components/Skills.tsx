// ---------------------------------------------------------------------------
// The Skills section. This is a SERVER COMPONENT (the default in Next.js App
// Router). It has no interactivity — it just reads data and renders HTML — so
// it can run on the server and ship zero JavaScript to the browser. Fast!
//
// Key React idea shown here: rendering a LIST with .map().
// We turn the `skills` array into an array of <SkillBadge> elements.
// Each item in a rendered list needs a unique `key` so React can track it.
// ---------------------------------------------------------------------------

import { skills } from "@/data/skills";
import SkillBadge from "./SkillBadge";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-5xl px-6 py-20">
      {/* The heading + intro fade up together as one block. */}
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Skills &amp; Tools
        </h2>
        <p className="mt-2 text-muted">
          Technologies I work with day to day.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          // Each badge is wrapped in its own Reveal with an increasing delay so
          // they pop in one-by-one (stagger). The `key` moves to the Reveal.
          <Reveal key={skill.name} delay={i * 60}>
            <SkillBadge label={skill.name} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
