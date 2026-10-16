import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import GamePlatforms from "@/components/GamePlatforms";
import JsonLd from "@/components/seo/JsonLd";
import { games, gamePath } from "@/lib/games";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/games/",
  title: "All Sweepstakes & Fish Table Games | SL Sweep",
  description:
    "Browse online fish table games and sweepstakes platforms on SL Sweep: Orion Stars, GameVault, Juwa, Fire Kirin, Milky Way and more, all in one dashboard.",
});

export default function GamesHubPage() {
  return (
    <PageShell crumbs={[{ name: "Games", path: "/games/" }]}>
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-8">
        <p className="eyebrow">Games</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Online Fish Table Games &amp; Sweepstakes Platforms
        </h1>
        <div className="mt-4 max-w-3xl space-y-4 text-lg text-slate-600">
          <p>
            SL Sweep brings the online fish table games and sweepstakes platforms players ask for most
            into one place. Each platform below has its own page with how to open it on SL Sweep,
            answers to common questions and similar games you might like.
          </p>
          <p>
            You only need one SL Sweep account to reach all of them. Add funds once in your player
            dashboard, then choose the game you feel like playing.
          </p>
        </div>
      </section>

      <GamePlatforms
        heading="All Games on SL Sweep"
        intro="Choose a platform to learn more, or open your player dashboard to start playing."
        showHubLink={false}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink">New to SL Sweep?</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Getting started takes three steps: create your account, add funds and pick a game. Our guide
          walks through each one, including how cash-outs work.
        </p>
        <Link
          href="/how-it-works/"
          className="mt-4 inline-flex min-h-[48px] items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
        >
          See how SL Sweep works <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Online Fish Table Games & Sweepstakes Platforms",
          url: siteUrl("/games/"),
          isPartOf: { "@id": siteUrl("/#website") },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: games.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: g.name,
              url: siteUrl(gamePath(g.slug)),
            })),
          },
        }}
      />
    </PageShell>
  );
}
