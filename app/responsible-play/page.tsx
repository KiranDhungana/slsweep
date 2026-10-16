import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import Todo from "@/components/seo/Todo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/responsible-play/",
  title: "Responsible Play | SL Sweep",
  description:
    "Responsible play at SL Sweep: tips to keep sweepstakes games fun, signs play may be a problem, and where to get free, confidential help in the US.",
});

const tips = [
  "Decide on a budget before you play, and only use money you can afford to spend on entertainment.",
  "Set a time limit and take regular breaks. Step away when the session stops being fun.",
  "Never chase losses by adding more funds to win back what you have spent.",
  "Don't play when you are upset, stressed, or under the influence of alcohol or drugs.",
  "Keep play in balance with work, family, friends and other hobbies.",
];

const signs = [
  "Spending more money or time than you planned, again and again",
  "Borrowing money or skipping bills to keep playing",
  "Feeling restless or irritable when you try to cut back",
  "Hiding how much you play from people close to you",
];

export default function ResponsiblePlayPage() {
  return (
    <PageShell crumbs={[{ name: "Responsible Play", path: "/responsible-play/" }]}>
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <p className="eyebrow">Player safety</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Responsible Play
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          Sweepstakes games should be entertainment, not a way to make money or escape problems. These
          responsible play guidelines help keep it that way.
        </p>
        <Todo>State your minimum age and eligible states, and any limits or self-exclusion options players can request.</Todo>

        <h2 className="mt-12 text-3xl font-extrabold tracking-tight text-ink">Tips for keeping play fun</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-slate-700">
          {tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-3xl font-extrabold tracking-tight text-ink">Signs play may be a problem</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-slate-700">
          {signs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-3xl font-extrabold tracking-tight text-ink">Where to get help</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          If gambling or gaming is causing problems for you or someone you know, free and confidential help
          is available 24/7 in the US through the National Problem Gambling Helpline: call{" "}
          <a href="tel:18004262537" className="font-semibold text-brand-700 underline">
            1-800-GAMBLER
          </a>{" "}
          or visit the{" "}
          <a
            href="https://www.ncpgambling.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline"
          >
            National Council on Problem Gambling
          </a>
          .
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          You can also reach{" "}
          <Link href="/support/" className="font-semibold text-brand-700 underline">
            SL Sweep Support
          </Link>{" "}
          for help with your account.
        </p>
      </article>
    </PageShell>
  );
}
