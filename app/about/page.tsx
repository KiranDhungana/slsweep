import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about/",
  title: "About SL Sweep – Official Site",
  description:
    "About SL Sweep, the official site of the automated gaming platform for sweepstakes games online. Learn what we do and how one dashboard works for players.",
});

export default function AboutPage() {
  return (
    <PageShell crumbs={[{ name: "About", path: "/about/" }]}>
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <p className="eyebrow">About us</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          About SL Sweep
        </h1>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-700">
          <p>
            SL Sweep is an automated gaming platform for sweepstakes games online. We built it so
            players don&apos;t have to keep a separate account, balance and contact for every game they
            enjoy.
          </p>
          <p>
            With one SL Sweep account you can open Orion Stars, GameVault, Juwa, Juwa 2.0, Fire Kirin,
            Milky Way, Vegas Sweeps and Cash Frenzy from a single player dashboard, where you also add
            funds, request cash-outs and see your account activity.
          </p>
        </div>
      </article>
    </PageShell>
  );
}
