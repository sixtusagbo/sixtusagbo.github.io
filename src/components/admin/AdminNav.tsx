"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, PenSquare } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/posts/new", label: "New Post", icon: PenSquare },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin/posts") {
    return (
      pathname === href ||
      (pathname.startsWith(`${href}/`) && pathname !== "/admin/posts/new")
    );
  }
  return pathname === href;
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex md:flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            isActive(pathname, href)
              ? "bg-white text-neutral-950"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}>
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
