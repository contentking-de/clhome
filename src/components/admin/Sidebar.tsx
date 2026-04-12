"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { id: "dashboard", label: "Dashboard", href: "/admin", icon: "dashboard" },
  { id: "posts", label: "Beiträge", href: "/admin/posts", icon: "article" },
  {
    id: "users",
    label: "Nutzer",
    href: "/admin/users",
    icon: "group",
  },
] as const;

function getActiveId(pathname: string): string {
  if (pathname.startsWith("/admin/posts")) return "posts";
  if (pathname.startsWith("/admin/users")) return "users";
  return "dashboard";
}

export default function Sidebar() {
  const pathname = usePathname();
  const active = getActiveId(pathname);

  return (
    <aside className="w-64 min-h-screen bg-surface-container-low border-r border-outline-variant/10 p-6 flex flex-col">
      <Link href="/" className="mb-8">
        <Image
          src="/cleverlegal_logo.png"
          alt="clever.legal"
          width={144}
          height={43}
          className="h-9 w-auto"
          loading="eager"
          priority
        />
      </Link>
      <span className="text-xs font-label uppercase tracking-widest text-secondary mb-4">
        Admin
      </span>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === link.id
                ? "bg-surface-tint/10 text-surface-tint"
                : "text-secondary hover:bg-surface-container-highest/50 hover:text-on-background"
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              {link.icon}
            </span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-outline-variant/10">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-secondary hover:text-error transition-colors"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          Abmelden
        </Link>
      </div>
    </aside>
  );
}
