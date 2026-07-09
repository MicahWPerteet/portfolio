// The Footer — static server component.
// `new Date().getFullYear()` runs on the server when the page renders,
// so the copyright year is always current without any client-side JavaScript.

export default function Footer() {
  return (
    <footer className="mt-8">
      {/* A soft glass divider line */}
      <div className="glass mx-auto max-w-5xl rounded-full" style={{ height: "1px" }} />
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Micah. Built with Next.js &amp; React.</p>
        <div className="flex gap-5">
          <a href="#" className="transition-colors hover:text-accent">
            GitHub
          </a>
          <a href="#" className="transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a href="#" className="transition-colors hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
