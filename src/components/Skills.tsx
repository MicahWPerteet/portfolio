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

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        Skills &amp; Tools
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Technologies I work with day to day.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {skills.map((skill) => (
          // one SkillBadge per skill; `key` is required and must be unique
          <SkillBadge key={skill.name} label={skill.name} />
        ))}
      </div>
    </section>
  );
}
