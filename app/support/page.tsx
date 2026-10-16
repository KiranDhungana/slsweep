import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import FaqSection from "@/components/seo/FaqSection";
import Todo from "@/components/seo/Todo";
import { homeFaqs, howItWorksFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { playUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/support/",
  title: "SL Sweep Support",
  description:
    "SL Sweep support: help with your account, adding funds, cash-outs and game access, plus answers to common questions about the SL Sweep player dashboard.",
});

// Questions most relevant to support; reused text so the FAQ schema stays in sync.
const supportFaqs = [homeFaqs[2], homeFaqs[3], howItWorksFaqs[1], howItWorksFaqs[2]];

export default function SupportPage() {
  return (
    <PageShell crumbs={[{ name: "Support", path: "/support/" }]}>
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <p className="eyebrow">Help center</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          SL Sweep Support
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          Need help with SL Sweep support topics like your account, adding funds, a cash-out or opening a
          game? Start with the answers below. If you are signed in, you can also reach player support from
          your dashboard.
        </p>

        <h2 className="mt-12 text-3xl font-extrabold tracking-tight text-ink">Contact us</h2>
        <Todo>Add your real support channels (email, live chat, hours). Don&apos;t publish channels you don&apos;t monitor.</Todo>
        <a href={playUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 min-h-[48px]">
          Open player dashboard <ArrowUpRight className="h-4 w-4" />
        </a>

        <FaqSection faqs={supportFaqs} heading="Common questions" className="mt-16" />

        <h2 className="mt-16 text-3xl font-extrabold tracking-tight text-ink">More help</h2>
        <ul className="mt-4 space-y-1 text-slate-700">
          <li>
            <Link href="/how-it-works/" className="inline-flex min-h-[48px] items-center font-semibold text-brand-700 underline">
              How SL Sweep works
            </Link>
          </li>
          <li>
            <Link href="/sweepstakes-rules/" className="inline-flex min-h-[48px] items-center font-semibold text-brand-700 underline">
              Sweepstakes rules
            </Link>
          </li>
          <li>
            <Link href="/responsible-play/" className="inline-flex min-h-[48px] items-center font-semibold text-brand-700 underline">
              Responsible play
            </Link>
          </li>
        </ul>
      </article>
    </PageShell>
  );
}
