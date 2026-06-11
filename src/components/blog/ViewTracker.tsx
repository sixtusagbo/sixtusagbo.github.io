"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const endpoint = `/api/posts/${slug}/view`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint);
    } else {
      fetch(endpoint, { method: "POST", keepalive: true }).catch(() => {});
    }
  }, [slug]);

  return null;
}
