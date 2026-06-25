"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import {
  subscribeAction,
  type SubscribeState,
} from "@/app/(site)/newsletter/actions";

export default function NewsletterForm() {
  const [state, formAction, isPending] = useActionState<
    SubscribeState,
    FormData
  >(subscribeAction, null);

  return (
    <section
      id="newsletter"
      className="scroll-mt-28 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10">
      <div className="flex items-start gap-4 mb-6">
        <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-neutral-800 items-center justify-center flex-shrink-0">
          <Mail size={20} className="text-neutral-300" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl md:text-2xl font-bold">
            Subscribe to my newsletter
          </h2>
          <p className="text-sm text-neutral-400 max-w-md">
            New posts on web &amp; mobile development, straight to your inbox. No
            spam, unsubscribe anytime.
          </p>
        </div>
      </div>

      {state?.ok ? (
        <p className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <CheckCircle2 size={16} className="flex-shrink-0" />
          {state.message}
        </p>
      ) : (
        <form action={formAction} className="space-y-3">
          {/* Honeypot: hidden from humans, catches bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-neutral-500 placeholder-neutral-500"
            />
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-60">
              {isPending && <Loader2 size={16} className="animate-spin" />}
              Subscribe
            </button>
          </div>
          {state && !state.ok && (
            <p className="text-sm text-red-400">{state.message}</p>
          )}
        </form>
      )}
    </section>
  );
}
