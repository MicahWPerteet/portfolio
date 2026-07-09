// ---------------------------------------------------------------------------
// The interactive particle constellation. A CLIENT COMPONENT ("use client")
// because it renders to a <canvas> and reacts to the mouse — both browser-only.
//
// We use tsParticles (the maintained successor to the old particles.js). The
// engine has to be initialized once on the client before the <Particles> canvas
// can render, which is what the useEffect below does.
// ---------------------------------------------------------------------------
"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // a smaller bundle of just the features we need
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleField() {
  const [ready, setReady] = useState(false);
  // Read the accent color + motion preference from the page on the client so the
  // particles automatically match our theme.
  const [accent, setAccent] = useState("#6f9df5");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const themeAccent = css.getPropertyValue("--accent").trim();
    if (themeAccent) setAccent(themeAccent);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    // Initialize the engine once, then flip `ready` so the canvas can mount.
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // The particle configuration. Recomputed only if accent/motion changes.
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false }, // we position the canvas ourselves
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 55, density: { enable: true } },
        color: { value: accent },
        links: {
          enable: true,
          color: accent,
          distance: 140,
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: !reduced, // hold still if the user prefers reduced motion
          speed: 0.6,
          outModes: { default: "bounce" },
        },
        opacity: { value: 0.4 },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        // Detect the cursor on the whole window, since the page content sits on
        // top of (and blocks pointer events to) this background canvas.
        detectsOn: "window",
        events: {
          onHover: { enable: !reduced, mode: "grab" }, // draw links to the cursor
          resize: { enable: true },
        },
        modes: { grab: { distance: 160, links: { opacity: 0.5 } } },
      },
    }),
    [accent, reduced],
  );

  if (!ready) return null;

  return <Particles id="tsparticles" className="absolute inset-0" options={options} />;
}
