"use client";

import { useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { uploadUrlToCloudinary } from "@/lib/cloudinary";

type Result = {
  id: string;
  thumb: string;
  url: string;
  alt: string;
  author: string;
  authorUrl: string;
  downloadLocation: string;
};

export type UnsplashPick = {
  url: string;
  alt: string;
  author: string;
  authorUrl: string;
};

export default function UnsplashPicker({
  onPick,
  onClose,
}: {
  onPick: (pick: UnsplashPick) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickingId, setPickingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await fetch(`/api/unsplash/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Search failed");
        setResults([]);
      } else {
        setResults(data.results);
      }
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const pick = async (r: Result) => {
    setPickingId(r.id);
    setError("");
    // Unsplash guideline: ping the download endpoint on use (fire-and-forget)
    fetch("/api/unsplash/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ downloadLocation: r.downloadLocation }),
    }).catch(() => {});
    try {
      const cloudUrl = await uploadUrlToCloudinary(r.url);
      onPick({ url: cloudUrl, alt: r.alt, author: r.author, authorUrl: r.authorUrl });
      onClose();
    } catch {
      setError("Could not import that image. Try another.");
      setPickingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-neutral-950/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}>
      <div
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Search Unsplash</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={search} className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos, then press Enter"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-neutral-500 placeholder-neutral-500"
          />
        </form>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={22} className="animate-spin text-neutral-500" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => pick(r)}
                disabled={pickingId !== null}
                title={`Photo by ${r.author}`}
                className="group relative aspect-video overflow-hidden rounded-xl bg-neutral-800 disabled:opacity-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.thumb}
                  alt={r.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-[10px] text-neutral-200 px-2 py-1 text-left truncate">
                  {r.author}
                </span>
                {pickingId === r.id && (
                  <span className="absolute inset-0 grid place-items-center bg-neutral-950/60">
                    <Loader2 size={20} className="animate-spin" />
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          searched && (
            <p className="text-sm text-neutral-500 py-8 text-center">
              No photos found. Try another search.
            </p>
          )
        )}

        <p className="text-xs text-neutral-500">
          Photos from Unsplash. The photographer is credited automatically.
        </p>
      </div>
    </div>
  );
}
