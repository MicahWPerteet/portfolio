// ---------------------------------------------------------------------------
// "use client" turns this file into a CLIENT COMPONENT.
//
// By default, App Router components run on the SERVER and ship no JS. But this
// navbar needs INTERACTIVITY — a mobile menu that opens and closes when tapped.
// Interactivity requires React state (useState) and event handlers (onClick),
// which only work in the browser. The "use client" directive tells Next.js
// "hydrate this one in the browser so it can be interactive."
//
// Rule of thumb: keep components on the server unless they need state, effects,
// event handlers, or browser-only APIs — then mark them "use client".
// ---------------------------------------------------------------------------
"use client";

import { useState } from "react";

// The links are just data — reused by both the desktop and mobile menus.
const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  // `useState` gives us a value (open) and a setter (setOpen).
  // Calling setOpen re-renders the component with the new value.
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/70 dark:bg-black/70">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Micah<span className="text-indigo-600">.</span>
        </a>

        {/* Desktop menu — hidden on small screens (hidden ... sm:flex) */}
        <ul className="hidden gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — only visible on small screens (sm:hidden).
            onClick flips `open` to its opposite value. */}
        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-700 dark:text-zinc-200 sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {/* Show a different icon depending on state */}
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* The mobile dropdown renders ONLY when `open` is true */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-200 sm:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)} // close the menu after a tap
                className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
