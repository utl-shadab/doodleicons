import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/sections/site-header";
import { LibrarySkeleton } from "@/components/ui/skeleton";
import { siteOrigin } from "@/lib/utils/origin";
import "./globals.css";
import localFont from "next/font/local";
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-regular.woff2", weight: "400" },
    { path: "./fonts/poppins-medium.woff2", weight: "500" },
    { path: "./fonts/poppins-semibold.woff2", weight: "600" },
  ],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  title: {
    default: "DoodleIcons — Small details. Real personality.",
    template: "%s · DoodleIcons",
  },
  description:
    "Browse 15,000 customizable static icon artworks across 30 categories. Editable SVG, PNG, React, Figma, and 3D wireframe models, with source attribution.",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("doodleicons-theme");document.documentElement.dataset.theme=t==="dark"||t==="light"?t:"system"}catch(e){}',
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <Suspense fallback={<LibrarySkeleton />}>{children}</Suspense>
        </main>
        <footer className="site-footer">
          <span>Made with a little character.</span>
          <span>
            Static vectors. Open source. <a href="/licenses">View licenses.</a>
          </span>
          <span>© {new Date().getFullYear()} DoodleIcons</span>
        </footer>
      </body>
    </html>
  );
}
