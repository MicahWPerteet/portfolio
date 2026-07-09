// ---------------------------------------------------------------------------
// A REUSABLE card. Give it a project's details as props and it renders a card.
// The Projects section reuses this same component 4 times with different data —
// that's the whole point of components: write the markup once, reuse everywhere.
//
// We import the `Project` type so the props are guaranteed to match our data shape.
// ---------------------------------------------------------------------------

import type { Project } from "@/data/projects"; // "@/" is an alias for the src/ folder

// The props ARE a Project (title, description, tags, and optional URLs).
export default function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  repoUrl,
}: Project) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {/* Render the tags by mapping the string array to <span> elements */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Conditionally render links only if a URL was provided.
          `{liveUrl && (...)}` means: render the link ONLY when liveUrl exists. */}
      <div className="mt-5 flex gap-4 text-sm font-medium">
        {liveUrl && (
          <a
            href={liveUrl}
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Live demo →
          </a>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            className="text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Source code
          </a>
        )}
      </div>
    </article>
  );
}
