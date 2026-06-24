import { Resend } from "resend";

// The newsletter is fully optional: with no key/from it stays dormant and the
// signup UI is hidden, exactly like the Cloudinary/Unsplash integrations.
export function newsletterEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_FROM);
}

let client: Resend | null = null;

function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  client ??= new Resend(key);
  return client;
}

function fromAddress(): string {
  const value = process.env.NEWSLETTER_FROM;
  if (!value) throw new Error("NEWSLETTER_FROM is not set");
  return value;
}

function replyTo(): string | undefined {
  return process.env.NEWSLETTER_REPLY_TO || undefined;
}

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
};

export async function sendEmail(message: EmailMessage): Promise<void> {
  const { error } = await getClient().emails.send({
    from: fromAddress(),
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: replyTo(),
    headers: message.headers,
  });
  if (error) throw new Error(error.message);
}

// Send many emails through Resend's batch endpoint (max 100 per call), so a
// large list stays well under the API rate limit. Returns how many went out.
export async function sendEmails(
  messages: EmailMessage[]
): Promise<{ sent: number; failed: number }> {
  const reply = replyTo();
  const from = fromAddress();
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < messages.length; i += 100) {
    const chunk = messages.slice(i, i + 100);
    try {
      const { error } = await getClient().batch.send(
        chunk.map((m) => ({
          from,
          to: m.to,
          subject: m.subject,
          html: m.html,
          text: m.text,
          replyTo: reply,
          headers: m.headers,
        }))
      );
      if (error) failed += chunk.length;
      else sent += chunk.length;
    } catch {
      failed += chunk.length;
    }
  }

  return { sent, failed };
}
