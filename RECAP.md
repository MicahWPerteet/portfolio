# Project Recap — Building & Iterating on a Next.js Portfolio

A detailed log of everything we built in this session: from an empty folder to a
deployed-ready Next.js portfolio with three design iterations, particle effects, a
custom font, and a working contact form. Written to double as a learning reference.

- **Repo:** https://github.com/MicahWPerteet/portfolio
- **Stack:** Next.js 16.2.10 (App Router) · React 19.2.4 · TypeScript 5 · Tailwind CSS v4
- **Extras:** tsParticles 3.9 · Satoshi font (self-hosted) · Resend (contact email)
- **Local path:** `Desktop\Claude Stuff\Random\portfolio`

---

## Table of contents
1. [Starting point & tooling](#1-starting-point--tooling)
2. [Phase 1 — Scaffold the app](#2-phase-1--scaffold-the-app)
3. [Phase 2 — The React components](#3-phase-2--the-react-components)
4. [Phase 3 — GitHub](#4-phase-3--github)
5. [Phase 4 — Design iteration A: Neumorphism](#5-phase-4--design-iteration-a-neumorphism)
6. [Phase 5 — Design iteration B: Glassmorphism](#6-phase-5--design-iteration-b-glassmorphism)
7. [Phase 6 — Background blobs (and toning them down)](#7-phase-6--background-blobs-and-toning-them-down)
8. [Phase 7 — Hiding the scrollbar (a debugging saga)](#8-phase-7--hiding-the-scrollbar-a-debugging-saga)
9. [Phase 8 — Interactive particles (tsParticles)](#9-phase-8--interactive-particles-tsparticles)
10. [Phase 9 — Swapping in the Satoshi font](#10-phase-9--swapping-in-the-satoshi-font)
11. [Phase 10 — Making the contact form send email (Resend)](#11-phase-10--making-the-contact-form-send-email-resend)
12. [Concepts learned](#12-concepts-learned)
13. [Problems solved (debugging log)](#13-problems-solved-debugging-log)
14. [Command reference](#14-command-reference)
15. [Final file structure](#15-final-file-structure)
16. [Git history](#16-git-history)
17. [What's left to do](#17-whats-left-to-do)

---

## 1. Starting point & tooling

We began in an **empty directory** on Windows 11. An environment scan found:

- ✅ **Git** installed
- ✅ **winget** available
- ❌ **Node.js / npm** — not installed (required for Next.js)
- ❌ **GitHub CLI (`gh`)** — not installed

**What we installed** (via `winget`, which needed your admin/UAC approval):

| Tool | Version | Command |
|------|---------|---------|
| Node.js | v24.18.0 | `winget install OpenJS.NodeJS.LTS` |
| npm | 11.16.0 | (bundled with Node) |
| GitHub CLI | 2.96.0 | `winget install GitHub.cli` |

> **Gotcha:** after a winget install, you must open a **fresh terminal** so the
> updated `PATH` is picked up.

---

## 2. Phase 1 — Scaffold the app

Created the project with the official generator, choosing every option up front so it
ran non-interactively:

```bash
npx create-next-app@latest portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

This gave us **Next.js 16, React 19, TypeScript, Tailwind v4, App Router**, and a
`src/` directory. Next 16 ships an `AGENTS.md` warning that it has breaking changes vs
older versions, and bundles its own docs in `node_modules/next/dist/docs/` — we
consulted those to confirm the modern Server/Client Component conventions.

---

## 3. Phase 2 — The React components

We built a personal-portfolio landing page whose structure was deliberately chosen to
teach core Next.js + React ideas.

**Data (separated from UI, typed with interfaces):**
- `src/data/skills.ts` — `interface Skill` + array
- `src/data/projects.ts` — `interface Project` + array

**Components (`src/components/`):**

| Component | Server/Client | Teaches |
|-----------|---------------|---------|
| `Navbar` | **Client** (`"use client"`) | `useState` + `onClick` (mobile menu) |
| `Hero` | Server | Static JSX, default component type |
| `About` | Server | Simple presentational component |
| `Skills` + `SkillBadge` | Server | `.map()` with `key`, passing **props** |
| `Projects` + `ProjectCard` | Server | A reusable, props-driven card |
| `Contact` | **Client** | Controlled form inputs + submit handler |
| `Footer` | Server | Composition + `new Date()` on the server |

**Wiring:** `src/app/page.tsx` composes the sections in order; `src/app/layout.tsx`
holds metadata + fonts; `src/app/globals.css` holds global styles.

We wrote a teaching-oriented `README.md` mapping each concept to the file that shows
it, and **verified in a real browser** (rendered the page, filled and submitted the
contact form to confirm the client-side interactivity worked).

---

## 4. Phase 3 — GitHub

`create-next-app` already ran `git init`. We then:

```bash
git branch -M main
gh auth login                 # you completed the browser sign-in
gh repo create portfolio --public --source=. --remote=origin --push
```

Result: **public repo** at `github.com/MicahWPerteet/portfolio`, and continuous
deployment to Vercel is done by importing the repo there (auto-deploys on every push
to `main`).

---

## 5. Phase 4 — Design iteration A: Neumorphism

The first restyle: **"soft UI."** Everything shares one surface color, and depth is
faked with a **pair of shadows** — a light highlight top-left and a dark shadow
bottom-right make elements look *extruded*; the same shadows `inset` make them look
*pressed in*.

- Reworked `globals.css` into a token-driven system: `--surface`, paired
  `--neu-light`/`--neu-dark` shadow colors, and reusable classes `.neu-raised`,
  `.neu-inset`, `.neu-field`, `.neu-interactive`.
- **Light + dark** handled by swapping ~5 CSS variables inside a
  `@media (prefers-color-scheme: dark)` block — every utility referenced the
  variables, so the whole UI flipped automatically.
- Chose a soft-blue accent.

> This iteration lived in the working tree and was later *replaced* by glassmorphism
> before we committed — so it isn't a separate commit in the git history, but it's a
> real part of the journey.

---

## 6. Phase 5 — Design iteration B: Glassmorphism

The second restyle (the current look): **frosted glass.** Translucent panels with
`backdrop-filter: blur()`, a thin light border, and a soft shadow.

- New token-driven system in `globals.css`: `--glass-bg`, `--glass-border`,
  `--glass-shadow`, `--glass-blur`, `--accent-glow`, with a dark-mode variant.
- Reusable classes: `.glass`, `.glow-lift` (the **Vercel-style hover** — element
  rises and casts a growing accent glow), `.glass-field` (glass inputs), `.btn-accent`
  (accent-filled primary buttons).
- Made the **accent more present** with accent-filled primary buttons + accent links.
- Because glass needs something colorful behind it to blur, we added a background
  layer (next phase).

---

## 7. Phase 6 — Background blobs (and toning them down)

- Added `src/components/Background.tsx`: a fixed `-z-10` layer with large, blurred,
  drifting gradient **blobs**, animated with CSS `@keyframes` and gated behind
  `prefers-reduced-motion`.
- **Your feedback:** the first version was "too bright and messy."
- **Fix:** switched to theme-aware blob color tokens (`--blob-1`, `--blob-2`) —
  **deep muted navy** in dark mode — reduced from **3 blobs to 2** placed at opposite
  corners, increased blur (80px → 110px), and lowered opacity (0.55 → 0.4). Result:
  a calm, clean backdrop.

---

## 8. Phase 7 — Hiding the scrollbar (a debugging saga)

Goal: hide the right-hand scrollbar while keeping the page scrollable. This took three
attempts and taught two real lessons.

1. **Attempt 1 — CSS in `globals.css`** (`scrollbar-width: none`,
   `::-webkit-scrollbar { display:none }`). **Failed silently.** We verified with a
   `fetch()` of the compiled stylesheet that the rules were *missing* — **Turbopack's
   CSS optimizer (Lightning CSS) strips them** from imported `.css` files.
2. **Attempt 2 — a raw `<style>` in a manual `<head>`** in `layout.tsx`. Hid the
   scrollbar, but produced a **hydration mismatch** ("1 Issue" in the dev overlay).
   Reading the console revealed the cause: a **browser extension** injects a
   `<style>` (a `litepicker` date-picker theme) into `<head>` before React hydrates,
   and manually owning `<head>` made React reconcile against that foreign node.
3. **Attempt 3 — the fix:** a `<style dangerouslySetInnerHTML>` at the **top of
   `<body>`** (valid HTML, applies globally, React doesn't hoist it). This bypasses
   *both* the optimizer and the extension's head injection. Verified: scrollbar takes
   0px, page still scrolls, **zero console errors**.

**Lesson:** self-inflicted "simple" changes can hit tooling (CSS minifier) and
environment (browser extensions) edge cases — diagnose with real measurements
(compiled CSS, console) rather than assuming.

---

## 9. Phase 8 — Interactive particles (tsParticles)

You found **particles.js**. Since the original is unmaintained (~2016) and awkward with
React/SSR, we used its maintained successor **tsParticles**.

```bash
npm install @tsparticles/react @tsparticles/engine @tsparticles/slim
```

- New `src/components/Particles.tsx` — a **client component** ("use client", since it's
  canvas + mouse driven). It initializes the engine once, then renders an
  **interactive constellation**: dots linked by thin lines, with a cursor "grab" effect.
- **Theme-aware:** reads the `--accent` CSS variable so particle color matches the
  theme. **Reduced-motion aware:** particles hold still + no hover if the OS setting is on.
- Used `interactivity.detectsOn: "window"` so the cursor is tracked even though the
  page content sits on top of (and blocks pointer events to) the background canvas.
- Layered inside `Background.tsx`, above the blobs and behind the glass.

---

## 10. Phase 9 — Swapping in the Satoshi font

Satoshi isn't on Google Fonts — it's free from **Fontshare** (its official home).

- Pulled the Fontshare CSS, extracted the `.woff2` URLs, and **downloaded 4 weights**
  (Regular 400, Medium 500, Bold 700, Black 900) into `src/app/fonts/`.
- Self-hosted them with **`next/font/local`** in `layout.tsx` (no external request, no
  layout shift), exposing them as `--font-satoshi`, and pointed `--font-sans` at it in
  `globals.css`.
- **Note:** Satoshi's family is Light/Regular/Medium/Bold/Black — it has **no
  semibold(600) or extrabold(800)**. So the browser maps the site's `font-semibold` →
  Bold(700) and the big hero `font-extrabold` → Black(900) (which is why the hero reads
  quite bold).

---

## 11. Phase 10 — Making the contact form send email (Resend)

**Before:** the form did nothing external — `handleSubmit` only ran `preventDefault()`,
`console.log`ged the values, and showed a "Thanks!" message. The data went nowhere.

**Now:** it emails you via **Resend**, chosen for its learning value (Route Handlers,
env-var secrets, server code).

```bash
npm install resend
```

- New **Route Handler** `src/app/api/contact/route.ts` → creates the URL `/api/contact`.
  Its `POST` function runs **server-side**, validates the fields, and sends the email
  via Resend (`from: onboarding@resend.dev`, `to:` your address, `replyTo:` the
  visitor). The API key is read from `process.env.RESEND_API_KEY` and never reaches the
  browser.
- `Contact.tsx` now `fetch()`es that endpoint with **`Sending…` / disabled / error**
  states.
- Secrets: `.env.local` holds the real key and is **gitignored**; a committable
  `.env.example` documents the variable (added `!.env.example` to `.gitignore` so that
  one file is tracked).
- **Build fix:** constructing `new Resend(key)` at the top of the file **broke the
  build** ("Missing API key") because Next imports the module during build when the key
  is empty. Fixed by constructing the client **lazily inside the handler**.
- Verified via `curl`: missing fields → `400`, no-key → graceful `500`
  ("email service isn't configured yet").

**Free-tier caveat:** the `onboarding@resend.dev` sender only delivers to the exact
email you registered with Resend, and early messages may land in **spam**.

---

## 12. Concepts learned

- **Server vs Client Components** — server is the default (renders to HTML, ships no
  JS); add `"use client"` only when you need state, effects, event handlers, or
  browser APIs (`Navbar`, `Contact`, `Particles`).
- **Props & composition** — small reusable components (`SkillBadge`, `ProjectCard`)
  fed by data.
- **Rendering lists** — `.map()` over data with a unique `key`.
- **File-based routing** — a file's location *is* its URL (`page.tsx` = `/`,
  `api/contact/route.ts` = `/api/contact`).
- **Route Handlers** — building a backend endpoint inside the App Router.
- **`next/font/local`** — self-hosting fonts with zero layout shift.
- **Env vars & secrets** — `.env.local`, `process.env`, keeping keys server-side and
  out of git.
- **CSS design systems** — token-driven theming (`@theme`, CSS variables) with
  automatic light/dark via `prefers-color-scheme`, and `prefers-reduced-motion` for
  accessibility.
- **Hydration** — why server and client HTML must match, and how third parties
  (browser extensions) can break it.

---

## 13. Problems solved (debugging log)

| # | Problem | Root cause | Fix |
|---|---------|-----------|-----|
| 1 | Node/npm/gh missing | Fresh Windows box | `winget install`, then fresh terminal |
| 2 | Focus ring invisible on form inputs | Tailwind `outline-2` sets width but **not** outline-*style* | Plain-CSS focus rule (`outline: 2px solid var(--accent)`) |
| 3 | `glow-lift` hover glow didn't show on primary button | Inline style + Tailwind `shadow-lg` (utilities layer) overrode the component-layer `:hover` | Dedicated `.btn-accent` class for the resting shadow |
| 4 | Scrollbar-hiding CSS ignored | Turbopack's Lightning CSS strips those rules from imported CSS | Inject via a raw `<style>` |
| 5 | Hydration mismatch ("1 Issue") | Manual `<head>` made React reconcile a `<style>` a **browser extension** injected | Move the `<style>` into `<body>` |
| 6 | `npm run build` failed with "Missing API key" | `new Resend()` ran at module load during build with an empty key | Construct Resend **lazily inside the handler** |

---

## 14. Command reference

```bash
# Tooling (Windows, needs admin)
winget install OpenJS.NodeJS.LTS
winget install GitHub.cli

# Scaffold
npx create-next-app@latest portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack

# Day-to-day
npm run dev          # dev server at http://localhost:3000 (restart to pick up .env changes)
npm run build        # production build + full type-check
npm run start        # serve the production build
npm run lint         # ESLint

# Dependencies added along the way
npm install @tsparticles/react @tsparticles/engine @tsparticles/slim
npm install resend

# Git / GitHub
git branch -M main
gh repo create portfolio --public --source=. --remote=origin --push
git add -A && git commit -m "..." && git push origin main
```

---

## 15. Final file structure

```
portfolio/
├─ .env.local            # RESEND_API_KEY (gitignored — never committed)
├─ .env.example          # documents the env var (committed)
├─ README.md             # learning-oriented project guide
├─ RECAP.md              # this file
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx      # root layout: Satoshi font, metadata, <Background/>, scrollbar <style>
│  │  ├─ page.tsx        # home route ("/") — composes the sections
│  │  ├─ globals.css     # glass design system + tokens + animations
│  │  ├─ api/
│  │  │  └─ contact/route.ts   # POST /api/contact → sends email via Resend
│  │  └─ fonts/          # Satoshi-{Regular,Medium,Bold,Black}.woff2
│  ├─ components/
│  │  ├─ Navbar.tsx      # client — mobile menu
│  │  ├─ Hero.tsx  About.tsx  Skills.tsx  SkillBadge.tsx
│  │  ├─ Projects.tsx  ProjectCard.tsx  Footer.tsx
│  │  ├─ Background.tsx  # drifting blobs + particles layer
│  │  ├─ Particles.tsx   # client — interactive tsParticles constellation
│  │  └─ Contact.tsx     # client — form that POSTs to /api/contact
│  └─ data/
│     ├─ skills.ts  projects.ts   # typed content
```

---

## 16. Git history

```
4271a69  Initial commit from Create Next App
7ec9c85  Build portfolio landing page with several React components
af00bff  Redesign in glassmorphism with particles and Satoshi font
7609436  Added an easter egg          (your commit)
506a38a  Removed easter egg           (your commit)
5368dcf  Wire up contact form to send email via Resend
```

---

## 17. What's left to do

- [ ] **Local test of the contact form** — the dev server was restarted so it loaded
  your `RESEND_API_KEY`; submit the form (or ask me to) to confirm a real email
  arrives (check spam).
- [ ] **Production email** — add `RESEND_API_KEY` in **Vercel → Settings →
  Environment Variables**, then redeploy. Without it, the deployed form returns the
  "email service isn't configured" message.
- [ ] **Confirm the Vercel project is connected** to the repo (import once at
  vercel.com if not) so pushes auto-deploy.
- [ ] *(Optional)* Personalize placeholder copy (bio, projects, links), and — if you
  want the hero less heavy — change its `font-extrabold` to `font-bold`.
- [ ] *(Optional)* Verify a custom domain in Resend to send from your own address and
  improve deliverability.
```
