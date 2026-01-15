import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sixtusagbo.dev"),
  title: {
    default: "Sixtus Agbo | Full-Stack Developer",
    template: "%s | Sixtus Agbo",
  },
  description:
    "Full-Stack Developer crafting high-performance web and mobile applications with a focus on exceptional user experiences and clean, maintainable code.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Flutter",
    "Python",
    "Mobile Developer",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Sixtus Miracle Agbo" }],
  creator: "Sixtus Miracle Agbo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sixtusagbo.dev",
    siteName: "Sixtus Agbo",
    title: "Sixtus Agbo | Full-Stack Developer",
    description:
      "Full-Stack Developer crafting high-performance web and mobile applications with a focus on exceptional user experiences and clean, maintainable code.",
    images: [
      {
        url: "/images/me.webp",
        width: 800,
        height: 800,
        alt: "Sixtus Agbo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sixtus Agbo | Full-Stack Developer",
    description:
      "Full-Stack Developer crafting high-performance web and mobile applications.",
    creator: "@siabormeestic",
    images: ["/images/me.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
          {/* Subtle grid background */}
          <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

          <Navigation />

          <main className="relative z-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
