import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import Todo from "@/components/seo/Todo";
import { howItWorksFaqs, steps } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { playUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/how-it-works/",
  title: "How SL Sweep Works – Add Funds, Play, Cash Out",
  description:
    "How SL Sweep works in three steps: create one account, add funds in the player dashboard, then play sweepstakes games and request cash-outs.",
});

export default function HowItWorksPage() {
  return (
    <PageShell crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}>
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <p className="eyebrow">Guide</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          How SL Sweep Works
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          SL Sweep works as one player dashboard for every sweepstakes platform we carry. You create a
          single account, add funds once, and open Orion Stars, GameVault, Juwa, Fire Kirin and our other
          games from the same place. Here is each step.
        </p>

        <ol className="mt-12 space-y-12">
          {steps.map((step, i) => (
            <li key={step.title}>
              <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-base font-bold text-white">
                  {i + 1}
                </span>
                {step.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-700">{step.text}</p>
              {i === 0 && (
                <p className="mt-3 leading-relaxed text-slate-700">
                  Use the{" "}
                  <a href={playUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">
                    Get Started link
                  </a>{" "}
                  to open the sign-up page. Once your account is ready, the same login takes you back to
                  your dashboard every time.
                </p>
              )}
              {i === 1 && (
                <>
                  <p className="mt-3 leading-relaxed text-slate-700">
                    Deposits are handled by the platform itself, so you don&apos;t have to message anyone
                    to have credits loaded. The payment methods you can use are shown in the dashboard
                    when you add funds.
                  </p>
                  <Todo>List the accepted payment methods and any deposit minimums, if you want them on this page.</Todo>
                </>
              )}
              {i === 2 && (
                <>
                  <p className="mt-3 leading-relaxed text-slate-700">
                    Browse the{" "}
                    <Link href="/games/" className="font-semibold text-brand-700 underline">
                      games page
                    </Link>{" "}
                    to see every platform. When you want to withdraw, open the cash-out option in your
                    dashboard and follow the steps shown there. You can follow the request in your
                    account activity.
                  </p>
                  <Todo>State typical cash-out times and any minimums or verification steps.</Todo>
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <a href={playUrl} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[48px]">
            Get started <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <FaqSection faqs={howItWorksFaqs} heading="How It Works FAQ" className="mt-16" />
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to get started with SL Sweep",
          url: siteUrl("/how-it-works/"),
          step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.text,
          })),
        }}
      />
    </PageShell>
  );
}
