# Portfolio — a Next.js + React learning demo

A small personal-portfolio landing page built to show **how Next.js and React
work together**. It's intentionally simple and heavily commented so you can read
the source and learn the core ideas.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and
**Tailwind CSS v4**.

---

## Run it locally

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server
```

Then open **http://localhost:3000**. Edit any file in `src/` and the page
updates instantly (this is called *Fast Refresh*).

Other scripts:

```bash
npm run build    # production build (also type-checks the whole project)
npm run start    # serve the production build locally
npm run lint     # run ESLint
```

---

## How React and Next.js fit together

- **React** is the library for building UI out of **components** — reusable
  functions that return markup (JSX). React handles turning your components +
  data into what the user sees, and re-rendering when data changes.
- **Next.js** is the *framework* around React. It adds the things a real website
  needs: routing (which file = which URL), a build system, image/font handling,
  server rendering, and easy deployment. You still write React components — Next
  just decides where and when they run.

The biggest idea to understand is **Server Components vs Client Components**.

### Server Components (the default)
Every component here runs on the **server** by default. It renders to HTML and
ships **zero JavaScript** to the browser. Great for static content — fast, and
good for SEO. `Hero`, `About`, `Skills`, `Projects`, and `Footer` are all server
components.

### Client Components (`"use client"`)
When a component needs **interactivity** — state, event handlers like `onClick`,
or browser APIs — you add `"use client"` at the top of the file. That tells Next
to also send its JS to the browser so it can be interactive. `Navbar` (mobile
menu toggle) and `Contact` (form) are client components.

> Rule of thumb: keep components on the server unless they need `useState`,
> `useEffect`, event handlers, or browser APIs — then mark them `"use client"`.

---

## Where each concept lives in this project

| Concept | File | What to look at |
|--------|------|-----------------|
| **File-based routing** | `src/app/page.tsx` | This file *is* the `/` route. Its location defines the URL. |
| **Root layout & metadata** | `src/app/layout.tsx` | Wraps every page; sets the tab title, fonts, `<html>`/`<body>`. |
| **Component composition** | `src/app/page.tsx` | The page just arranges the section components in order. |
| **Server Component** | `src/components/Hero.tsx` | Static content, no `"use client"`, ships no JS. |
| **Client Component + state** | `src/components/Navbar.tsx` | `"use client"` + `useState` for the mobile menu. |
| **Controlled form + events** | `src/components/Contact.tsx` | `value`/`onChange` inputs, `onSubmit` handler. |
| **Props** | `src/components/SkillBadge.tsx` | Receives a `label` prop from its parent. |
| **Reusable component** | `src/components/ProjectCard.tsx` | Rendered once per project with different props. |
| **Rendering lists (`.map` + `key`)** | `src/components/Skills.tsx`, `Projects.tsx` | Turning a data array into elements. |
| **Data separated from UI** | `src/data/skills.ts`, `src/data/projects.ts` | Typed data the components render. |
| **TypeScript types** | `src/data/*.ts` | `interface Skill` / `interface Project` describe the data's shape. |
| **Styling** | every component | Tailwind utility classes in `className`. Global CSS in `src/app/globals.css`. |

### Suggested reading order
1. `src/data/skills.ts` — see how data + a TypeScript `interface` look.
2. `src/components/SkillBadge.tsx` — the smallest component; learn **props**.
3. `src/components/Skills.tsx` — learn `.map()` and `key`.
4. `src/app/page.tsx` — see how components **compose** into a page.
5. `src/components/Navbar.tsx` — your first **client** component with state.

---

## Make it yours

The content is placeholder text. To personalize:
- Edit your name/bio in `src/components/Hero.tsx` and `About.tsx`.
- Edit `src/data/skills.ts` and `src/data/projects.ts`.
- Update the links in `src/components/Footer.tsx` and `Navbar.tsx`.
- Change the tab title in `src/app/layout.tsx`.

---

## Deploy to Vercel

This project is ready for [Vercel](https://vercel.com) (the makers of Next.js):

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Go to **vercel.com** and sign in with GitHub.
3. **Add New → Project** → import this repository.
4. Vercel auto-detects Next.js — keep the defaults and click **Deploy**.
5. Every future `git push` to `main` automatically redeploys.

Prefer the CLI? `npm i -g vercel` then run `vercel` from this folder.
