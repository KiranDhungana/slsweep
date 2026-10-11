"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { playUrl } from "@/lib/site";
import Logo from "./Logo";

const links = [
  { label: "Home", href: "#", active: true },
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
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
              className={`relative py-6 text-sm font-medium transition hover:text-brand-700 ${
                l.active
                  ? "text-ink after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-full after:bg-brand-700"
                  : "text-slate-600"
              }`}
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
          className="rounded p-2 text-brand-900 md:hidden"
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
              className={`rounded px-3 py-2 text-sm font-medium ${
                l.active ? "bg-brand-50 text-brand-800" : "text-slate-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 text-sm"
          >
            Play Now <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
