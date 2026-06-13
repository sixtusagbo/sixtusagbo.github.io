import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10 space-y-8">
        <div className="space-y-2 text-center">
          <span className="text-2xl font-bold tracking-tighter">
            SA
          </span>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-neutral-400">
            Sign in to manage your blog
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
