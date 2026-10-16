import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import GameArt from "@/components/GameArt";
import FaqSection from "@/components/seo/FaqSection";
import Todo from "@/components/seo/Todo";
import { gameContent } from "@/lib/game-content";
import { gamePath, games, getGame } from "@/lib/games";
import { ogImageUrl, pageMetadata } from "@/lib/seo";
import { playUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return games.filter((g) => gameContent[g.slug]).map((g) => ({ slug: g.slug }));
}

function load(slug: string) {
  const game = getGame(slug);
  const content = gameContent[slug];
  if (!game || !content) notFound();
  return { game, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { content } = load(slug);
  return pageMetadata({
    path: gamePath(slug),
    title: content.metaTitle,
    description: content.description,
    image: ogImageUrl(content.h1, "Games"),
  });
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const { game, content } = load(slug);
  const related = content.related.map(getGame).filter((g) => g !== undefined);

  return (
    <PageShell
      crumbs={[
        { name: "Games", path: "/games/" },
        { name: game.name, path: gamePath(game.slug) },
      ]}
    >
      <article className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Sweepstakes Platform</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {content.h1}
            </h1>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-700">
              {content.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <a
              href={playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 min-h-[48px]"
            >
              Play {game.name} on SL Sweep <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <GameArt
            game={game}
            alt={content.imageAlt}
            priority
            className="aspect-square w-full rounded-2xl shadow-card"
          />
        </div>

        <div className="mt-16 max-w-3xl space-y-14">
          {content.about ? (
            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">About {game.name}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-slate-700">
                {content.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ) : null}
          {content.todo.length > 0 && (
            <div>
              {content.todo.map((t) => (
                <Todo key={t}>{t}</Todo>
              ))}
            </div>
          )}

          <section>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">{content.spotlight.heading}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-700">
              {content.spotlight.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">
              How to play {game.name} on SL Sweep
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-6 leading-relaxed text-slate-700">
              <li>
                Create your SL Sweep account, or sign in if you already have one, using the{" "}
                <a href={playUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">
                  player dashboard
                </a>
                .
              </li>
              <li>Add funds to your balance from the dashboard.</li>
              <li>Choose {game.name} from your list of game platforms and start playing.</li>
            </ol>
            <p className="mt-4 text-slate-600">
              New here? Our{" "}
              <Link href="/how-it-works/" className="font-semibold text-brand-700 underline">
                guide to how SL Sweep works
              </Link>{" "}
              covers each step in more detail.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">Supported devices</h2>
            <p className="mt-4 leading-relaxed text-slate-700">
              The SL Sweep player dashboard runs in your web browser, so you can reach {game.name} from
              a phone, tablet or computer.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">
              Adding funds and cashing out
            </h2>
            <p className="mt-4 leading-relaxed text-slate-700">
              You don&apos;t add funds or cash out inside {game.name} itself. Both happen in your SL Sweep
              player dashboard, where you can also see your account activity. The payment methods
              available to you are listed there.
            </p>
          </section>

          <FaqSection faqs={content.faqs} heading={`${game.name} FAQ`} />

          <section className="rounded-2xl bg-brand-950 px-6 py-8 text-white sm:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Ready to play {game.name}?</h2>
            <p className="mt-2 text-brand-50/90">
              Open your SL Sweep player dashboard to add funds and launch {game.name}.
            </p>
            <a
              href={playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 min-h-[48px] !bg-white !text-brand-800 hover:!bg-brand-50"
            >
              Open player dashboard <ArrowUpRight className="h-4 w-4" />
            </a>
          </section>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-games" className="mt-16">
            <h2 id="related-games" className="text-2xl font-extrabold tracking-tight text-ink">
              Similar games on SL Sweep
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={gamePath(g.slug)}
                    className="group block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"
                  >
                    <GameArt
                      game={g}
                      alt={gameContent[g.slug]?.imageAlt}
                      size="md"
                      className="aspect-[4/3]"
                    />
                    <span className="flex min-h-[48px] items-center justify-between px-4 font-bold text-ink group-hover:text-brand-800">
                      {g.name} online <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/games/"
              className="mt-6 inline-flex min-h-[48px] items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
            >
              See all online fish table games <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </article>
    </PageShell>
  );
}
