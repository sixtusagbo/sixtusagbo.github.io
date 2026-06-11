import { incrementViews } from "@/lib/posts";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await incrementViews(slug);
  } catch {
    // view counting must never break the page
  }
  return new Response(null, { status: 204 });
}
