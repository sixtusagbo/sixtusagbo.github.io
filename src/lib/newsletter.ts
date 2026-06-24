import { getBaseUrl } from "./url";
import {
  newsletterEnabled,
  sendEmail,
  sendEmails,
  type EmailMessage,
} from "./email";
import { getConfirmedSubscribers } from "./subscribers";
import {
  claimNewsletterSend,
  releaseNewsletterSend,
  type BlogPost,
} from "./posts";

const BRAND = "Sixtus Agbo";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(inner: string): string {
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f4f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
        ${inner}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:9999px;background:#0a0a0a;">
    <a href="${href}" style="display:inline-block;padding:13px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9999px;">${label}</a>
  </td></tr></table>`;
}

export async function sendConfirmationEmail(
  email: string,
  token: string
): Promise<void> {
  const base = await getBaseUrl();
  const confirmUrl = `${base}/api/newsletter/confirm?token=${token}`;

  const html = shell(`
    <tr><td style="padding:36px 36px 28px;">
      <p style="margin:0 0 6px;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#71717a;">${BRAND}</p>
      <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;">Confirm your subscription</h1>
      <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#3f3f46;">Click below to confirm you'd like new posts on web &amp; mobile development delivered to your inbox.</p>
      ${button(confirmUrl, "Confirm subscription")}
      <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#a1a1aa;">If you didn't sign up, you can safely ignore this email.</p>
    </td></tr>`);

  const text = `Confirm your subscription to ${BRAND}'s newsletter:\n${confirmUrl}\n\nIf you didn't sign up, ignore this email.`;

  await sendEmail({
    to: email,
    subject: `Confirm your subscription to ${BRAND}`,
    html,
    text,
  });
}

function postEmailHtml(
  post: BlogPost,
  postUrl: string,
  unsubscribeUrl: string
): string {
  const cover = post.coverImage
    ? `<tr><td style="padding:0;"><a href="${postUrl}"><img src="${post.coverImage}" alt="" width="560" style="display:block;width:100%;max-width:560px;border:0;"></a></td></tr>`
    : "";

  return shell(`
    ${cover}
    <tr><td style="padding:32px 36px 28px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#71717a;">New post &middot; ${BRAND}</p>
      <h1 style="margin:0 0 14px;font-size:24px;line-height:1.3;"><a href="${postUrl}" style="color:#0a0a0a;text-decoration:none;">${escapeHtml(post.title)}</a></h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#3f3f46;">${escapeHtml(post.excerpt)}</p>
      ${button(postUrl, "Read the full post")}
    </td></tr>
    <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;"></td></tr>
    <tr><td style="padding:20px 36px 32px;">
      <p style="margin:0;font-size:12px;line-height:1.6;color:#a1a1aa;">You're receiving this because you subscribed at sixtusagbo.dev.<br><a href="${unsubscribeUrl}" style="color:#71717a;text-decoration:underline;">Unsubscribe</a></p>
    </td></tr>`);
}

function postEmailText(
  post: BlogPost,
  postUrl: string,
  unsubscribeUrl: string
): string {
  return `New post from ${BRAND}\n\n${post.title}\n\n${post.excerpt}\n\nRead it: ${postUrl}\n\n—\nUnsubscribe: ${unsubscribeUrl}`;
}

// Email confirmed subscribers about a newly published post. Idempotent: the
// first call claims the post (stamping newsletterSentAt) so re-saving or
// re-publishing never sends twice. A total send failure releases the claim so
// a later publish can retry.
export async function notifySubscribersOfPost(
  postId: string
): Promise<{ sent: number; failed: number }> {
  if (!newsletterEnabled()) return { sent: 0, failed: 0 };

  const post = await claimNewsletterSend(postId);
  if (!post) return { sent: 0, failed: 0 };

  const subscribers = await getConfirmedSubscribers();
  if (subscribers.length === 0) return { sent: 0, failed: 0 };

  const base = await getBaseUrl();
  const postUrl = `${base}/blog/${post.slug}?utm_source=newsletter&utm_medium=email`;

  const messages: EmailMessage[] = subscribers.map(({ email, token }) => {
    const unsubscribeUrl = `${base}/api/newsletter/unsubscribe?token=${token}`;
    return {
      to: email,
      subject: post.title,
      html: postEmailHtml(post, postUrl, unsubscribeUrl),
      text: postEmailText(post, postUrl, unsubscribeUrl),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    };
  });

  const result = await sendEmails(messages);
  if (result.sent === 0 && result.failed > 0) {
    await releaseNewsletterSend(postId);
  }
  return result;
}
