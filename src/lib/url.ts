import { headers } from "next/headers";
import { SITE_URL } from "@/config/constants";

// Absolute base URL for links embedded in emails. Derived from the incoming
// request host so confirm/unsubscribe links point at localhost in dev and the
// real domain in production, without an extra env var.
export async function getBaseUrl(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get("host");
    if (host) {
      const proto =
        h.get("x-forwarded-proto") ??
        (host.startsWith("localhost") || host.startsWith("127.0.0.1")
          ? "http"
          : "https");
      return `${proto}://${host}`;
    }
  } catch {
    // headers() is unavailable outside a request scope; fall back below.
  }
  return SITE_URL;
}
