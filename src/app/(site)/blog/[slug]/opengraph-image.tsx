import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post cover";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  const title = post?.title ?? "Sixtus Agbo's Blog";
  const tags = post?.tags.slice(0, 3) ?? [];
  const date = post?.publishedAt ? formatDate(post.publishedAt) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "white",
          fontFamily: "sans-serif",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 40, fontWeight: 700 }}>SA</span>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: "#34d399",
            }}
          />
          <span style={{ fontSize: 28, color: "#a3a3a3", marginLeft: 16 }}>
            sixtusagbo.dev/blog
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 52 : 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}>
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "flex",
                  padding: "10px 24px",
                  backgroundColor: "#262626",
                  borderRadius: 9999,
                  fontSize: 24,
                  color: "#d4d4d4",
                }}>
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 26, color: "#a3a3a3" }}>{date}</span>
        </div>
      </div>
    ),
    size
  );
}
