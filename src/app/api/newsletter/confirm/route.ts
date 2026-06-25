import { NextResponse, type NextRequest } from "next/server";
import { confirmSubscriber } from "@/lib/subscribers";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const ok = await confirmSubscriber(token);

  const url = new URL("/newsletter", request.nextUrl.origin);
  url.searchParams.set("status", ok ? "confirmed" : "invalid");
  return NextResponse.redirect(url);
}
