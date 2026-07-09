// ---------------------------------------------------------------------------
// src/app/page.tsx IS the home page ("/") route.
//
// In the Next.js App Router, a file's LOCATION defines its URL — this is
// "file-based routing". A `page.tsx` at src/app/ = the site's root URL.
// (src/app/about/page.tsx would be "/about", and so on.)
//
// This page's only job is COMPOSITION: import our components and arrange them
// in order. Each section is its own self-contained component, so reading this
// list top-to-bottom tells you exactly what the page looks like.
// ---------------------------------------------------------------------------

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Each <Reveal> fades its section up as it scrolls into view. Hero's
            wrapper doubles as a gentle load-in (it's already on screen at mount).
            Skills and Projects are NOT wrapped here — they stagger their own
            children instead, so we don't nest a reveal inside a reveal. */}
        <Reveal><Hero /></Reveal>
        <Reveal><About /></Reveal>
        <Skills />
        <Projects />
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
    </>
  );
}
