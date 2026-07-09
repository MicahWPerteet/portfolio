// The Footer — static server component.
// `new Date().getFullYear()` runs on the server when the page renders,
// so the copyright year is always current without any client-side JavaScript.

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Micah. Built with Next.js &amp; React.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            GitHub
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            LinkedIn
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
