// ---------------------------------------------------------------------------
// The Hero — the big intro at the top of the page. A plain SERVER COMPONENT.
// Notice there's no "use client" at the top and no useState/onClick — it's
// static content, so it renders to HTML on the server. This is the default.
//
// The buttons are just <a> anchor links that jump to sections further down
// the page (href="#projects"). Smooth scrolling is enabled globally in the CSS.
// ---------------------------------------------------------------------------

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 pt-28 pb-16 sm:pt-36">
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
        Available for new projects
      </span>

      <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
        Hi, I&apos;m Micah — I build for the web.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        A developer learning to craft fast, accessible interfaces with React and
        Next.js. This site is a hands-on demo of how the two fit together.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
