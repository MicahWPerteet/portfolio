// ---------------------------------------------------------------------------
// DATA lives separately from UI.
// This is a common React pattern: keep your content in plain data structures,
// then let components render it. It makes components reusable and easy to test.
//
// `interface Skill` is a TypeScript type — it describes the SHAPE of each object.
// If you typo a property or forget one, TypeScript warns you before you ever
// run the app. That's the main thing TS adds on top of React.
// ---------------------------------------------------------------------------

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tooling"; // a "union type": only these 3 values are allowed
}

export const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "HTML & CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Git & GitHub", category: "Tooling" },
  { name: "Vercel", category: "Tooling" },
  { name: "VS Code", category: "Tooling" },
];
