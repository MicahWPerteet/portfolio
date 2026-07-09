// ---------------------------------------------------------------------------
// Reveal — a tiny CLIENT COMPONENT that fades its children up as they scroll
// into view. It's "use client" because it uses browser-only APIs: a ref to a
// real DOM node, useEffect, and IntersectionObserver.
//
// How it works:
//   1. It renders a <div className="reveal"> around whatever you pass as children.
//      In globals.css, `.reveal` starts invisible + shifted down 24px.
//   2. On mount, it watches that div with an IntersectionObserver. The moment the
//      div scrolls into view, it adds `.is-visible`, which transitions it to
//      opacity 1 / no offset — the fade-up.
//   3. It reveals ONCE, then disconnects the observer (no re-hiding on scroll-away).
//
// A server component (like page.tsx) can render <Reveal> and pass server-rendered
// sections as children — the children stay server components; only this thin
// wrapper is client-side.
// ---------------------------------------------------------------------------
"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number; // ms — stagger offset, e.g. delay={i * 60} in a list
  className?: string; // extra classes, e.g. "h-full" for equal-height grid cells
};

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // reveal once, then stop watching
        }
      },
      // Fire when ~15% of the element is showing, and pull the bottom edge in a
      // little so elements reveal just before they hit the very bottom.
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The delay feeds the `--reveal-delay` CSS var that globals.css reads for stagger.
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
