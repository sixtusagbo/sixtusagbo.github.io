import { isAuthenticated } from "@/lib/auth";

const KEY = process.env.UNSPLASH_ACCESS_KEY;

// Unsplash API guideline: trigger the photo's download endpoint when a user
// actually uses (selects) it. Fire-and-forget.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!KEY) return new Response(null, { status: 204 });

  const { downloadLocation } = (await request
    .json()
    .catch(() => ({}))) as { downloadLocation?: string };

  if (downloadLocation?.startsWith("https://api.unsplash.com/")) {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${KEY}` },
    }).catch(() => {});
  }
  return new Response(null, { status: 204 });
}
