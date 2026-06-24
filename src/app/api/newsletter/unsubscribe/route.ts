import { NextResponse, type NextRequest } from "next/server";
import { unsubscribeByToken } from "@/lib/subscribers";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const ok = await unsubscribeByToken(token);

  const url = new URL("/newsletter", request.nextUrl.origin);
  url.searchParams.set("status", ok ? "unsubscribed" : "invalid");
  return NextResponse.redirect(url);
}

// One-click unsubscribe (RFC 8058): Gmail/Apple Mail POST here directly from
// the List-Unsubscribe header, no page visit involved.
export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  await unsubscribeByToken(token);
  return new NextResponse(null, { status: 200 });
}
