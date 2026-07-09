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
      {/* A frosted glass pill with accent text */}
      <span className="glass rounded-full px-4 py-1.5 text-sm font-medium text-accent">
        Available for new projects
      </span>

      <h1 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight text-heading sm:text-6xl">
        Hi, I&apos;m Micah — I build for the web.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground">
        A developer learning to craft fast, accessible interfaces with React and
        Next.js. This site is a hands-on demo of how the two fit together.
      </p>

      {/* Primary CTA is accent-FILLED so the accent really pops; the secondary is
          frosted glass. Both use the glow-lift hover (rise + accent glow). */}
      <div className="mt-10 flex flex-wrap gap-5">
        <a
          href="#projects"
          className="btn-accent glow-lift rounded-2xl px-6 py-3 text-sm font-semibold"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="glass glow-lift rounded-2xl px-6 py-3 text-sm font-semibold text-heading"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
