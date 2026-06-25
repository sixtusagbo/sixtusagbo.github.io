import { SITE_URL } from "@/config/constants";
import type { BlogPost } from "./posts";

const BRAND = "Sixtus Agbo";

export type BuiltEmail = { subject: string; html: string; text: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Wraps content in the branded shell: a wordmark, a white rounded card, and a
// muted footer, all inline-styled so it renders consistently across clients.
function layout(cardRows: string, footerHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="color:#18181b;">
            ${cardRows}
          </table>
        </td></tr>
        <tr><td style="padding:18px 8px 4px;">${footerHtml}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function eyebrow(text: string): string {
  return `<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#71717a;">${text}</p>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:9999px;background:#0a0a0a;">
    <a href="${href}" style="display:inline-block;padding:13px 30px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9999px;">${label}</a>
  </td></tr></table>`;
}

export function buildConfirmationEmail(confirmUrl: string): BuiltEmail {
  const card = `
    <tr><td style="padding:34px 34px 30px;">
      ${eyebrow("Confirm your subscription")}
      <h1 style="margin:0 0 14px;font-size:23px;line-height:1.3;color:#0a0a0a;">One quick step</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#3f3f46;">Confirm your email to start getting new posts on web &amp; mobile development from ${BRAND}, straight to your inbox. No spam, unsubscribe anytime.</p>
      ${button(confirmUrl, "Confirm subscription")}
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#a1a1aa;">Button not working? Paste this into your browser:<br><a href="${confirmUrl}" style="color:#71717a;word-break:break-all;">${confirmUrl}</a></p>
    </td></tr>`;

  const footer = `<p style="margin:0;font-size:12px;line-height:1.6;color:#a1a1aa;">You received this because this address was entered at <a href="${SITE_URL}/blog" style="color:#71717a;">sixtusagbo.dev</a>. If that wasn't you, just ignore this email.</p>`;

  return {
    subject: `Confirm your subscription to ${BRAND}`,
    html: layout(card, footer),
    text: `Confirm your subscription to ${BRAND}'s newsletter:\n${confirmUrl}\n\nIf you didn't sign up, ignore this email.`,
  };
}

export function buildPostEmail(
  post: Pick<BlogPost, "title" | "excerpt" | "coverImage" | "readingTime">,
  postUrl: string,
  unsubscribeUrl: string
): BuiltEmail {
  const cover = post.coverImage
    ? `<tr><td style="padding:0;"><a href="${postUrl}"><img src="${post.coverImage}" alt="" width="560" style="display:block;width:100%;max-width:560px;border:0;"></a></td></tr>`
    : "";

  const card = `
    ${cover}
    <tr><td style="padding:30px 34px 28px;">
      ${eyebrow(`New post &middot; ${post.readingTime} min read`)}
      <h1 style="margin:0 0 14px;font-size:25px;line-height:1.3;"><a href="${postUrl}" style="color:#0a0a0a;text-decoration:none;">${escapeHtml(post.title)}</a></h1>
      <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#3f3f46;">${escapeHtml(post.excerpt)}</p>
      ${button(postUrl, "Read the full post")}
    </td></tr>`;

  const footer = `<p style="margin:0;font-size:12px;line-height:1.6;color:#a1a1aa;">You're getting this because you subscribed at <a href="${SITE_URL}/blog" style="color:#71717a;">sixtusagbo.dev</a>.<br><a href="${unsubscribeUrl}" style="color:#71717a;text-decoration:underline;">Unsubscribe</a></p>`;

  return {
    subject: post.title,
    html: layout(card, footer),
    text: `New post from ${BRAND}\n\n${post.title}\n\n${post.excerpt}\n\nRead it: ${postUrl}\n\n—\nUnsubscribe: ${unsubscribeUrl}`,
  };
}
