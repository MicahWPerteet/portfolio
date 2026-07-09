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
    // `glass` makes the whole bar a frosted, translucent sticky strip.
    <header className="glass sticky top-0 z-50 border-x-0 border-t-0">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold text-heading">
          Micah<span className="text-accent">.</span>
        </a>

        {/* Desktop menu — hidden on small screens (hidden ... sm:flex) */}
        <ul className="hidden gap-8 text-sm font-medium text-foreground sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — only visible on small screens (sm:hidden).
            A circular glass button with the glow-lift hover effect.
            onClick flips `open` to its opposite value. */}
        <button
          onClick={() => setOpen(!open)}
          className="glass glow-lift flex h-10 w-10 items-center justify-center rounded-full text-heading sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {/* Show a different icon depending on state */}
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* The mobile dropdown renders ONLY when `open` is true */}
      {open && (
        <ul className="flex flex-col gap-1 px-6 pb-4 text-sm font-medium text-foreground sm:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)} // close the menu after a tap
                className="block rounded-xl px-3 py-2 transition-colors hover:text-accent"
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
