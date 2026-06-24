import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailX, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ status?: string }>;

const STATES = {
  confirmed: {
    icon: CheckCircle2,
    accent: "text-emerald-400",
    title: "You're subscribed!",
    body: "Thanks for confirming. You'll get an email whenever I publish a new post.",
  },
  unsubscribed: {
    icon: MailX,
    accent: "text-neutral-300",
    title: "You've unsubscribed",
    body: "You won't receive any more newsletter emails. No hard feelings, you can resubscribe anytime.",
  },
  invalid: {
    icon: XCircle,
    accent: "text-red-400",
    title: "That link didn't work",
    body: "The link may have expired or already been used. Try subscribing again from the blog.",
  },
} as const;

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { status } = await searchParams;
  const key =
    status === "confirmed" || status === "unsubscribed" ? status : "invalid";
  const { icon: Icon, accent, title, body } = STATES[key];

  return (
    <div className="pt-32 pb-20 min-h-[60vh] flex items-center">
      <div className="max-w-lg mx-auto px-6 text-center space-y-6">
        <Icon size={48} className={`mx-auto ${accent}`} />
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="text-neutral-400 leading-relaxed">{body}</p>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
          Back to the blog
        </Link>
      </div>
    </div>
  );
}
