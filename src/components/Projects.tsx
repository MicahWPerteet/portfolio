// The Projects section — another server component that maps over data.
// Same pattern as Skills, but each item is a richer ProjectCard.
// The `{...project}` "spread" passes every field of the project object as props,
// which is a tidy shortcut for title={project.title} description={...} etc.

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      {/* The heading + intro fade up together as one block. */}
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Projects
        </h2>
        <p className="mt-2 text-muted">
          A few things I&apos;ve built.
        </p>
      </Reveal>

      {/* A responsive grid: 1 column on phones, 2 on larger screens.
          Extra gap gives the raised cards room for their shadows. */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {projects.map((project, i) => (
          // Each card rises in sequence (stagger). `h-full` on the Reveal wrapper
          // keeps ProjectCard's equal-height behavior in the grid intact.
          <Reveal key={project.title} delay={i * 90} className="h-full">
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
