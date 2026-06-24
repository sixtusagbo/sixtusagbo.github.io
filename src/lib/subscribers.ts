import { randomBytes } from "node:crypto";
import { connectDB } from "./db";
import { Subscriber } from "./models/Subscriber";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

function newToken(): string {
  return randomBytes(32).toString("hex");
}

export type SubscribeResult =
  | { ok: true; status: "pending" | "confirmed"; token: string }
  | { ok: false; error: string };

// Create a new pending subscriber, or revive a previously unsubscribed/pending
// one with a fresh token. An already-confirmed address is left untouched.
export async function subscribe(rawEmail: string): Promise<SubscribeResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  await connectDB();
  const existing = await Subscriber.findOne({ email });

  if (existing?.status === "confirmed") {
    return { ok: true, status: "confirmed", token: existing.token };
  }

  const token = newToken();
  if (existing) {
    existing.status = "pending";
    existing.token = token;
    existing.confirmedAt = null;
    await existing.save();
  } else {
    await Subscriber.create({ email, token, status: "pending" });
  }
  return { ok: true, status: "pending", token };
}

export async function confirmSubscriber(token: string): Promise<boolean> {
  if (!token) return false;
  await connectDB();
  const doc = await Subscriber.findOneAndUpdate(
    { token, status: { $ne: "unsubscribed" } },
    { $set: { status: "confirmed", confirmedAt: new Date() } }
  );
  return Boolean(doc);
}

export async function unsubscribeByToken(token: string): Promise<boolean> {
  if (!token) return false;
  await connectDB();
  const doc = await Subscriber.findOneAndUpdate(
    { token },
    { $set: { status: "unsubscribed" } }
  );
  return Boolean(doc);
}

export async function getConfirmedSubscribers(): Promise<
  { email: string; token: string }[]
> {
  await connectDB();
  const docs = await Subscriber.find({ status: "confirmed" })
    .select("email token")
    .lean<{ email: string; token: string }[]>();
  return docs.map((d) => ({ email: d.email, token: d.token }));
}

export async function getSubscriberStats(): Promise<{
  confirmed: number;
  pending: number;
}> {
  await connectDB();
  const [confirmed, pending] = await Promise.all([
    Subscriber.countDocuments({ status: "confirmed" }),
    Subscriber.countDocuments({ status: "pending" }),
  ]);
  return { confirmed, pending };
}
