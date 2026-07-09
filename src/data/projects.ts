// Another data file — the list of projects shown in the Projects section.
// Each project matches the `Project` interface below. The Projects component
// will .map() over this array and render one ProjectCard per item.

export interface Project {
  title: string;
  description: string;
  tags: string[];        // an array of strings, e.g. ["Next.js", "TypeScript"]
  liveUrl?: string;      // the "?" means this field is OPTIONAL
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Portfolio Site",
    description:
      "This very site — a Next.js + React landing page built to learn how the two work together. Server and client components, Tailwind styling, deployed on Vercel.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Task Tracker",
    description:
      "A small full-stack app for organizing to-dos into projects, with drag-and-drop ordering and a REST API backend.",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive dashboard that fetches live forecasts from a public API and visualizes them with charts.",
    tags: ["React", "REST APIs", "Charts"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Markdown Notes",
    description:
      "A distraction-free note-taking app with live markdown preview and local-storage persistence.",
    tags: ["Next.js", "TypeScript"],
    repoUrl: "#",
  },
];
