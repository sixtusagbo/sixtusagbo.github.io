import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin | Sixtus Agbo" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-neutral-800 p-4 md:p-6 md:sticky md:top-0 md:h-screen flex md:flex-col items-center md:items-stretch justify-between gap-4">
        <div className="flex md:flex-col items-center md:items-stretch gap-4 md:gap-8 flex-1 min-w-0">
          <Link href="/admin" className="text-2xl font-bold tracking-tighter px-2">
            SA
          </Link>
          <AdminNav />
        </div>

        <div className="flex md:flex-col gap-1">
          <Link
            href="/blog"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            <ExternalLink size={16} />
            <span className="hidden sm:inline">View Blog</span>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 min-w-0">{children}</main>
    </div>
  );
}
