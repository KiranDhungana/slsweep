import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameArt from "@/components/GameArt";
import { games } from "@/lib/games";
import { SITE_NAME, siteUrl, socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Apps",
  description: "Games and tools to download from SL Sweep.",
  alternates: { canonical: siteUrl("/apps/") },
  ...socialMetadata({
    title: `Apps | ${SITE_NAME}`,
    description: "Games and tools to download from SL Sweep.",
    url: siteUrl("/apps/"),
  }),
};

export default function AppsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white">
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
          <p className="eyebrow">Download</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            <span className="sr-only">SL Sweep </span><span className="uppercase tracking-[0.45em]">Apps</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Games and tools to download — open your favorites from one place.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g) => (
              <article
                key={g.slug}
                className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"
              >
                <GameArt game={g} size="lg" className="aspect-square" />
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <h2 className="font-bold text-ink">{g.name}</h2>
                    <p className="text-sm text-slate-500">Game app</p>
                  </div>
                  <a
                    href={g.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-brand-700 transition group-hover:border-brand-600 group-hover:bg-brand-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Get
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Looking for guides?{" "}
            <Link href="/blog/" className="font-semibold text-brand-700 hover:text-brand-900">
              Visit the blog
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
