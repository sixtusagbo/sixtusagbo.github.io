"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { loginAction, type FormState } from "@/app/admin/actions";

const inputClass =
  "w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-500 placeholder-neutral-500";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    loginAction,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-neutral-400">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-neutral-400">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••••••"
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-60">
        {isPending && <Loader2 size={16} className="animate-spin" />}
        Sign in
      </button>
    </form>
  );
}
