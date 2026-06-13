import "server-only";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME ??
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Deletes are signed operations, so they need the API key + secret on the
// server. When those are absent, cleanup silently no-ops (delete still works).
const cleanupEnabled = Boolean(CLOUD_NAME && API_KEY && API_SECRET);

if (cleanupEnabled) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
}

/** Pull the Cloudinary public_id out of a delivery URL, or null if not ours. */
export function cloudinaryPublicId(url: string): string | null {
  const match = url.match(
    /res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+?)\.[a-z0-9]+(?:[?#].*)?$/i
  );
  return match ? match[1] : null;
}

/** Find every Cloudinary image URL inside the given text blobs. */
export function findCloudinaryUrls(...texts: (string | undefined | null)[]): string[] {
  const urls = new Set<string>();
  const rx = /https?:\/\/res\.cloudinary\.com\/[^\s"')]+/g;
  for (const text of texts) {
    for (const match of (text ?? "").matchAll(rx)) urls.add(match[0]);
  }
  return [...urls];
}

/** Delete the given Cloudinary image URLs. Best-effort, never throws. */
export async function deleteCloudinaryImages(urls: string[]): Promise<void> {
  if (!cleanupEnabled || urls.length === 0) return;
  const ids = urls
    .map(cloudinaryPublicId)
    .filter((id): id is string => Boolean(id));
  await Promise.all(
    ids.map((id) =>
      cloudinary.uploader
        .destroy(id, { invalidate: true })
        .catch(() => {
          // image cleanup must never break the delete/save flow
        })
    )
  );
}
