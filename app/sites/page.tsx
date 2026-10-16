import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { games } from "@/lib/games";
import { playUrl } from "@/lib/site";
import { SITE_NAME, siteUrl, socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sites",
  description: "Partner platforms and related sites from SL Sweep.",
  alternates: { canonical: siteUrl("/sites/") },
  ...socialMetadata({
    title: `Sites | ${SITE_NAME}`,
    description: "Partner platforms and related sites from SL Sweep.",
    url: siteUrl("/sites/"),
  }),
};

const featured = [
  {
    name: "SL Sweep Player Dashboard",
    description: "Manage your account and jump into your games.",
    href: playUrl,
  },
  ...games.slice(0, 5).map((g) => ({
    name: g.name,
    description: `${g.name} sweepstakes platform`,
    href: g.href,
  })),
];

export default function SitesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-white">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
          <p className="eyebrow">Directory</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            <span className="sr-only">SL Sweep </span><span className="uppercase tracking-[0.45em]">Sites</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Partner platforms and links you can open from SL Sweep.
          </p>

          <ul className="mt-12 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
            {featured.map((site) => (
              <li key={site.name}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-5 py-5 transition hover:bg-brand-50/50"
                >
                  <div>
                    <h2 className="font-bold text-ink">{site.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{site.description}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700">
                    Visit
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link
              href="/apps/"
              className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
            >
              Browse apps <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
            >
              Read the blog <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
