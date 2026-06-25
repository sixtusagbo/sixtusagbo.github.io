"use server";

import { newsletterEnabled } from "@/lib/email";
import { sendConfirmationEmail } from "@/lib/newsletter";
import { isValidEmail, subscribe } from "@/lib/subscribers";

export type SubscribeState = { ok: boolean; message: string } | null;

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // Honeypot: bots fill the hidden field, humans never see it. Pretend success.
  if (String(formData.get("company") ?? "").trim()) {
    return { ok: true, message: "Thanks! Check your inbox to confirm." };
  }

  if (!newsletterEnabled()) {
    return { ok: false, message: "The newsletter isn't available right now." };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const result = await subscribe(email);
  if (!result.ok) return { ok: false, message: result.error };

  if (result.status === "confirmed") {
    return { ok: true, message: "You're already subscribed. Thanks!" };
  }

  try {
    await sendConfirmationEmail(email, result.token);
  } catch {
    return {
      ok: false,
      message: "Couldn't send the confirmation email. Please try again.",
    };
  }

  return {
    ok: true,
    message: "Almost there! Check your inbox to confirm your subscription.",
  };
}
