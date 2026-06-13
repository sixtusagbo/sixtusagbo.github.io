const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// True only when both public env vars are set, so the admin can hide the
// upload UI and fall back to pasting a URL when Cloudinary isn't configured.
export const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

async function upload(file: string | File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );
  if (!res.ok) throw new Error("Upload failed");

  const data = (await res.json()) as { secure_url?: string };
  if (!data.secure_url) throw new Error("Upload returned no URL");
  return data.secure_url;
}

export function uploadToCloudinary(file: File): Promise<string> {
  return upload(file);
}

// Cloudinary's unsigned upload accepts a remote URL as the file, so it fetches
// and stores the image (used to bring an Unsplash photo into your Cloudinary).
export function uploadUrlToCloudinary(imageUrl: string): Promise<string> {
  return upload(imageUrl);
}
