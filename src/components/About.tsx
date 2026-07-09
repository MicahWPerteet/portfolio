// The About section — a simple static server component.
// Nothing fancy here on purpose: it shows that most of a page is just plain
// components returning JSX (HTML-like markup) styled with Tailwind classes.

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        About
      </h2>
      <div className="mt-4 max-w-3xl space-y-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        <p>
          I&apos;m a developer who enjoys turning ideas into clean, reliable web
          apps. I care about the details: fast load times, sensible layouts, and
          interfaces that feel obvious to use.
        </p>
        <p>
          Right now I&apos;m going deep on the React and Next.js ecosystem —
          server components, routing, and the tooling that ties it all together.
          When I&apos;m not coding, you&apos;ll find me reading, hiking, or
          tinkering with side projects.
        </p>
      </div>
    </section>
  );
}
