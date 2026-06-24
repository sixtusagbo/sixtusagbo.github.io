import { getBaseUrl } from "./url";
import {
  newsletterEnabled,
  sendEmail,
  sendEmails,
  type EmailMessage,
} from "./email";
import { getConfirmedSubscribers } from "./subscribers";
import { claimNewsletterSend, releaseNewsletterSend } from "./posts";
import { buildConfirmationEmail, buildPostEmail } from "./newsletter-templates";

export async function sendConfirmationEmail(
  email: string,
  token: string
): Promise<void> {
  const base = await getBaseUrl();
  const confirmUrl = `${base}/api/newsletter/confirm?token=${token}`;
  const { subject, html, text } = buildConfirmationEmail(confirmUrl);
  await sendEmail({ to: email, subject, html, text });
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
    const built = buildPostEmail(post, postUrl, unsubscribeUrl);
    return {
      to: email,
      subject: built.subject,
      html: built.html,
      text: built.text,
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
