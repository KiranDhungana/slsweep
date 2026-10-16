"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PenSquare,
  X,
} from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/auth";
import Logo from "@/components/Logo";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "All articles", href: "/admin/blog", icon: FileText },
  { label: "Add article", href: "/admin/blog/new", icon: PenSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const NavLinks = () => (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {nav.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-brand-700 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Logo />
          <span className="text-sm font-semibold text-ink">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-brand-950 lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="text-sm font-semibold text-white">SL Sweep Admin</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks />
            <button
              type="button"
              onClick={onLogout}
              className="m-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-300 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      )}

      <aside className="hidden w-64 shrink-0 flex-col bg-brand-950 text-white lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/admin" className="block">
            <Logo light />
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            Admin panel
          </p>
        </div>
        <NavLinks />
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
