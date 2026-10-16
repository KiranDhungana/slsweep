"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { playUrl } from "@/lib/site";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" aria-label="SL Sweep home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="relative py-6 text-sm font-medium text-slate-600 transition hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex"
        >
          Play Now <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          className="grid h-12 w-12 place-items-center rounded text-brand-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center rounded px-3 text-base font-medium text-slate-700"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 min-h-[48px] text-sm"
          >
            Play Now <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
