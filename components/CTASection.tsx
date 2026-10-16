import { ArrowUpRight, Lock, Users, Zap } from "lucide-react";
import { playUrl } from "@/lib/site";

const perks = [
  { Icon: Zap, title: "Quick Access", text: "Get to your games fast" },
  { Icon: Lock, title: "Secure Platform", text: "Your account is protected" },
  { Icon: Users, title: "All Your Games", text: "In one place" },
];

export default function CTASection() {
  return (
    <section id="get-started" className="bg-gradient-to-r from-brand-50/70 via-white to-brand-50/70 py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Get Started Today</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Your Games. Your Control.</h2>
          <p className="mt-2 text-slate-600">Access your SL Sweep account and explore your game floor.</p>
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Open Player Dashboard <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="grid grid-cols-3 divide-x divide-slate-200">
          {perks.map(({ Icon, title, text }) => (
            <li key={title} className="flex flex-col items-center px-2 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 ring-1 ring-brand-100">
                <Icon className="h-6 w-6 text-brand-700" />
              </span>
              <h3 className="mt-3 text-sm font-bold text-ink sm:text-base">{title}</h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
