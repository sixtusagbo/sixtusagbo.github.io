"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Share2 } from "lucide-react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // user dismissed the share sheet
    }
  };

  const buttonClass =
    "p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors";

  return (
    <div className="flex gap-2">
      <button
        onClick={copyLink}
        aria-label="Copy link"
        title="Copy link"
        className={buttonClass}>
        {copied ? <Check size={20} className="text-emerald-400" /> : <Link2 size={20} />}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        title="Share on X"
        className={buttonClass}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className={buttonClass}>
        <Linkedin size={20} />
      </a>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={nativeShare}
          aria-label="Share"
          title="Share"
          className={buttonClass}>
          <Share2 size={20} />
        </button>
      )}
    </div>
  );
}
