// ---------------------------------------------------------------------------
// The decorative background. A plain SERVER COMPONENT (no interactivity).
//
// Glassmorphism only looks like glass if there's something colorful BEHIND the
// panels to blur. This fixed layer sits behind the whole page (-z-10) and holds
// a few big, blurred, accent-colored blobs that slowly drift (see globals.css).
//
// It's purely visual, so we mark it aria-hidden and disable pointer events so it
// never interferes with clicks or screen readers.
// ---------------------------------------------------------------------------

import ParticleField from "./Particles";

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Two deep, muted blobs placed at opposite corners for a calm, clean
          backdrop. The CSS `.blob` class blurs + slowly drifts them, and the
          colors come from theme tokens (deep navy in dark mode). */}
      <div
        className="blob blob-a"
        style={{
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background: "var(--blob-1)",
        }}
      />
      <div
        className="blob blob-b"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background: "var(--blob-2)",
        }}
      />

      {/* The interactive constellation, layered on top of the blobs */}
      <ParticleField />
    </div>
  );
}
