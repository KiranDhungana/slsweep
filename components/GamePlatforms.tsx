import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { games, gamePath } from "@/lib/games";
import { gameContent } from "@/lib/game-content";
import GameArt from "./GameArt";

type Props = {
  heading?: string;
  intro?: string;
  showHubLink?: boolean;
};

export default function GamePlatforms({
  heading = "Popular Online Fish Table Games",
  intro = "Orion Stars, GameVault, Juwa, Fire Kirin and more: the sweepstakes platforms our players open most, all from one SL Sweep account. Pick a game to see how to play it on SL Sweep.",
  showHubLink = true,
}: Props) {
  return (
    <section id="games" className="bg-slate-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Our Game Platforms</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">{heading}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">{intro}</p>
          </div>
          {showHubLink && (
            <Link href="/games/" className="btn-outline !py-2.5 text-sm">
              View All Games <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <article
              key={g.slug}
              className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"
            >
              <Link href={gamePath(g.slug)} tabIndex={-1} aria-hidden>
                <GameArt
                  game={g}
                  alt={gameContent[g.slug]?.imageAlt}
                  size="lg"
                  className="aspect-square"
                />
              </Link>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="font-bold text-ink">
                    <Link href={gamePath(g.slug)} className="hover:text-brand-800">
                      {g.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500">Sweepstakes Platform</p>
                </div>
                <Link
                  href={gamePath(g.slug)}
                  aria-label={`Play ${g.name} online`}
                  className="inline-flex min-h-[48px] items-center gap-1 rounded-full border border-slate-300 px-4 text-sm font-semibold text-brand-700 transition group-hover:border-brand-600 group-hover:bg-brand-50"
                >
                  Play Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
