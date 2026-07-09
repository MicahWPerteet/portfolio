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
    <span className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
      {label}
    </span>
  );
}
