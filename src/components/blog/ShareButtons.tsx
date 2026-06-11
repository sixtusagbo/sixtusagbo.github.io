"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Link2, Share2 } from "lucide-react";

const noopSubscribe = () => () => {};

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  // Hydration-safe: false on the server, real support after mount
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => "share" in navigator,
    () => false
  );

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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      {canNativeShare && (
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
