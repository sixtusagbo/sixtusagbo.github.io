"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Loader2, Search, X } from "lucide-react";

type TagCount = { tag: string; count: number };

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title (A-Z)" },
] as const;

export default function BlogControls({ tags }: { tags: TagCount[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const activeTag = searchParams.get("tag") ?? "";
  const sort = searchParams.get("sort") ?? "newest";

  const [searchValue, setSearchValue] = useState(q);
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep the input in sync when the URL changes via back/forward
  const [prevQ, setPrevQ] = useState(q);
  if (prevQ !== q) {
    setPrevQ(q);
    setSearchValue(q);
  }

  const buildParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    return params;
  };

  const navigate = (updates: Record<string, string | null>) => {
    const params = buildParams(updates);
    startTransition(() => {
      router.replace(`/blog${params.size ? `?${params}` : ""}`, {
        scroll: false,
      });
    });
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => navigate({ q: value.trim() || null }),
      300
    );
  };

  const tagHref = (tag: string) => {
    const params = buildParams({ tag: tag === activeTag ? null : tag });
    return `/blog${params.size ? `?${params}` : ""}`;
  };

  const hasActiveFilters = Boolean(q || activeTag);

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium">
        <Filter size={16} />
        {showFilters ? "Hide Filters" : "Show Filters"}
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-white text-neutral-950 rounded-full text-xs">
            {(q ? 1 : 0) + (activeTag ? 1 : 0)}
          </span>
        )}
      </button>

      <aside
        className={`lg:w-72 flex-shrink-0 ${
          showFilters ? "block" : "hidden lg:block"
        }`}>
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6 sticky top-28">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              Filters
              {isPending && (
                <Loader2 size={14} className="animate-spin text-neutral-500" />
              )}
            </h2>
            {hasActiveFilters && (
              <Link
                href="/blog"
                className="text-sm text-neutral-400 hover:text-white transition-colors">
                Clear all
              </Link>
            )}
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label htmlFor="blog-search" className="text-sm text-neutral-400">
              Search
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                id="blog-search"
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-neutral-600 placeholder-neutral-500"
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <span className="text-sm text-neutral-400">Sort by</span>
            <div className="space-y-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => navigate({ sort: option.value === "newest" ? null : option.value })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    sort === option.value
                      ? "bg-white text-neutral-950 font-medium"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="space-y-3">
              <span className="text-sm text-neutral-400">Filter by tag</span>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                  <Link
                    key={tag}
                    href={tagHref(tag)}
                    scroll={false}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeTag === tag
                        ? "bg-white text-neutral-950"
                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                    }`}>
                    {tag}
                    <span className="ml-1 opacity-60">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Mobile close */}
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-sm font-medium transition-colors">
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
