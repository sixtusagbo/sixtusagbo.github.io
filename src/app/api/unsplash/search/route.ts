import { isAuthenticated } from "@/lib/auth";

const KEY = process.env.UNSPLASH_ACCESS_KEY;
// utm_source must match your registered Unsplash app name (their API guideline).
const APP = "sixtusagbo-blog";

type UnsplashPhoto = {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | null;
  description: string | null;
  user: { name: string; links: { html: string } };
  links: { download_location: string };
};

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!KEY) {
    return Response.json({ error: "Unsplash is not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const page = searchParams.get("page") ?? "1";
  if (!q) return Response.json({ results: [], totalPages: 0 });

  const api = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    q
  )}&page=${page}&per_page=24&content_filter=high`;

  const res = await fetch(api, {
    headers: { Authorization: `Client-ID ${KEY}`, "Accept-Version": "v1" },
  });
  if (!res.ok) {
    return Response.json({ error: "Unsplash request failed" }, { status: 502 });
  }

  const data = (await res.json()) as {
    results: UnsplashPhoto[];
    total_pages: number;
  };
  const results = data.results.map((p) => ({
    id: p.id,
    thumb: p.urls.small,
    url: p.urls.regular,
    alt: p.alt_description ?? p.description ?? "",
    author: p.user?.name ?? "Unknown",
    authorUrl: `${p.user?.links?.html}?utm_source=${APP}&utm_medium=referral`,
    downloadLocation: p.links?.download_location,
  }));

  return Response.json({ results, totalPages: data.total_pages });
}
