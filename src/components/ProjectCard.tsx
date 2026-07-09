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
    // A frosted glass card. The hover rise + accent glow comes from `glow-lift`.
    <article className="glass glow-lift flex h-full flex-col rounded-3xl p-7">
      <h3 className="text-lg font-semibold text-heading">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">
        {description}
      </p>

      {/* Render the tags by mapping the string array to <span> elements.
          Each tag is a small accent-tinted pill. */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Conditionally render links only if a URL was provided.
          `{liveUrl && (...)}` means: render the link ONLY when liveUrl exists. */}
      <div className="mt-6 flex gap-4 text-sm font-medium">
        {liveUrl && (
          <a
            href={liveUrl}
            className="text-accent transition-colors hover:text-accent-strong"
          >
            Live demo →
          </a>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            className="text-muted transition-colors hover:text-foreground"
          >
            Source code
          </a>
        )}
      </div>
    </article>
  );
}
