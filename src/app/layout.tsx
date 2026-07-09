import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Background from "@/components/Background";

// Satoshi is self-hosted with next/font/local: the .woff2 files live in ./fonts,
// so there's no external request and no layout shift. `variable` exposes the font
// as a CSS variable (--font-satoshi) that globals.css hooks into.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Keep Geist Mono for any monospaced text.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// `metadata` is a special export the App Router reads to build the <head>:
// the browser tab title, the description search engines show, etc.
export const metadata: Metadata = {
  title: "Micah — Developer Portfolio",
  description:
    "Personal portfolio of Micah, a web developer building with React and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Hide the scrollbar while keeping the page scrollable. We inject this as
            a raw <style> because Turbopack's CSS optimizer strips these rules from
            imported .css files. It lives in <body> (not <head>) so it doesn't clash
            with head <style> tags injected by browser extensions during hydration.
            The page still scrolls via wheel/keys/touch. */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html{scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar{display:none}",
          }}
        />
        {/* Sits behind everything (-z-10) and provides the color the glass blurs */}
        <Background />
        {children}
      </body>
    </html>
  );
}
