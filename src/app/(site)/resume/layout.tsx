import type { Metadata } from "next";

const description =
  "The professional experience, education, and certifications of Sixtus Agbo, a Full-Stack Developer building web and mobile applications.";

export const metadata: Metadata = {
  title: "Resume",
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    url: "/resume",
    title: "Resume | Sixtus Agbo",
    description,
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
