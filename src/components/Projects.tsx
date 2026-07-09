// The Projects section — another server component that maps over data.
// Same pattern as Skills, but each item is a richer ProjectCard.
// The `{...project}` "spread" passes every field of the project object as props,
// which is a tidy shortcut for title={project.title} description={...} etc.

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        Projects
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        A few things I&apos;ve built.
      </p>

      {/* A responsive grid: 1 column on phones, 2 on larger screens */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
