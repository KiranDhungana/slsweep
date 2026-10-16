import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { games, gamePath } from "@/lib/games";

// Overrides the root layout's "index, follow" (Next.js also adds its own noindex).
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Rendered with a real 404 status for any unknown URL. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-gradient-to-b from-brand-50/40 via-white to-white">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-8">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            The link may be old or mistyped. Try one of these instead:
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary min-h-[48px]">
              Home
            </Link>
            <Link href="/games/" className="btn-outline min-h-[48px]">
              All games
            </Link>
            <Link href="/blog/" className="btn-outline min-h-[48px]">
              Blog
            </Link>
            <Link href="/support/" className="btn-outline min-h-[48px]">
              Support
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-4 text-sm">
            {games.map((g) => (
              <li key={g.slug}>
                <Link href={gamePath(g.slug)} className="inline-flex min-h-[48px] items-center text-brand-700 hover:underline">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
