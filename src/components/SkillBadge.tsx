// ---------------------------------------------------------------------------
// A tiny REUSABLE component. It knows how to render exactly one skill "pill".
//
// It receives PROPS — inputs passed in by whoever uses it, like arguments to a
// function. Here the prop is `label`. The parent (Skills.tsx) decides the value.
//
// `SkillBadgeProps` types the props object so TypeScript knows `label` is a string.
// ---------------------------------------------------------------------------

interface SkillBadgeProps {
  label: string;
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    // A frosted glass pill with the glow-lift hover (rise + accent glow).
    <span className="glass glow-lift inline-block rounded-full px-4 py-2 text-sm font-medium text-foreground hover:text-accent">
      {label}
    </span>
  );
}
