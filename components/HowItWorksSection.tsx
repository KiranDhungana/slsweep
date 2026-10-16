import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { steps } from "@/lib/content";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="eyebrow">Three steps</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">How SL Sweep Works</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Getting from sign-up to your first game takes a few minutes. Everything happens in your SL
          Sweep player dashboard.
        </p>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/how-it-works/"
          className="mt-8 inline-flex min-h-[48px] items-center gap-1 font-semibold text-brand-700 hover:text-brand-900"
        >
          Read the full guide to how SL Sweep works <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
