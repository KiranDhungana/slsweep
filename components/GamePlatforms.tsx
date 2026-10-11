import { ArrowRight } from "lucide-react";
import { games } from "@/lib/games";
import { playUrl } from "@/lib/site";
import GameArt from "./GameArt";

export default function GamePlatforms() {
  return (
    <section id="games" className="bg-slate-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Our Game Platforms</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Explore Your Favorites</h2>
            <p className="mt-2 text-slate-600">Play top sweepstakes game platforms all in one place.</p>
          </div>
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !py-2.5 text-sm"
          >
            View All Games <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <article
              key={g.slug}
              className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"
            >
              <GameArt game={g} size="lg" className="h-36 sm:h-40" />
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="font-bold text-ink">{g.name}</h3>
                  <p className="text-sm text-slate-500">Sweepstakes Platform</p>
                </div>
                <a
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-brand-700 transition group-hover:border-brand-600 group-hover:bg-brand-50"
                >
                  Play Now <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
