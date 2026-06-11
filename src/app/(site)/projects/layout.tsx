import type { Metadata } from "next";

const description =
  "A selection of web, mobile, and full-stack projects by Sixtus Agbo, spanning React, Next.js, Flutter, Laravel, Python, and more.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: "Projects | Sixtus Agbo",
    description,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
