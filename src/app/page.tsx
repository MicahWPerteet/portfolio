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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
