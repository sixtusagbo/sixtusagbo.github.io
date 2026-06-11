import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { getRecentPosts, type BlogPost } from "@/lib/posts";
import { SITE_URL, socialLinks } from "@/config/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sixtus Miracle Agbo",
      alternateName: "Sixtus Agbo",
      url: SITE_URL,
      image: `${SITE_URL}/images/me.webp`,
      jobTitle: "Full-Stack Developer",
      sameAs: [
        socialLinks.github.url,
        socialLinks.linkedin.url,
        socialLinks.twitter.url,
        "https://sixtusagbo.medium.com/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Sixtus Agbo",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default async function Home() {
  let recentPosts: BlogPost[] = [];
  try {
    recentPosts = await getRecentPosts(3);
  } catch {
    // Render the homepage without the blog section if the DB is unreachable
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage recentPosts={recentPosts} />
    </>
  );
}
