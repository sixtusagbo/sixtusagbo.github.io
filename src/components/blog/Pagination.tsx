import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

function pageHref(
  searchParams: Record<string, string | undefined>,
  page: number
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== "page") params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  return `/blog${params.size ? `?${params}` : ""}`;
}

function pageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  if (page > 3) pages.push("…");
  for (
    let i = Math.max(2, page - 1);
    i <= Math.min(totalPages - 1, page + 1);
    i++
  ) {
    pages.push(i);
  }
  if (page < totalPages - 2) pages.push("…");
  pages.push(totalPages);
  return pages;
}

export default function Pagination({
  page,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12">
      {page > 1 ? (
        <Link
          href={pageHref(searchParams, page - 1)}
          rel="prev"
          aria-label="Previous page"
          className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors">
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <span className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-700">
          <ChevronLeft size={18} />
        </span>
      )}

      {pageNumbers(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-neutral-600">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(searchParams, p)}
            aria-current={p === page ? "page" : undefined}
            className={`min-w-10 px-3 py-2 rounded-xl text-sm font-medium text-center transition-colors ${
              p === page
                ? "bg-white text-neutral-950"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
            }`}>
            {p}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link
          href={pageHref(searchParams, page + 1)}
          rel="next"
          aria-label="Next page"
          className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors">
          <ChevronRight size={18} />
        </Link>
      ) : (
        <span className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-700">
          <ChevronRight size={18} />
        </span>
      )}
    </nav>
  );
}
