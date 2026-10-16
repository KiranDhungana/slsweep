import Image from "next/image";
import { Clock, CreditCard, Wallet, Zap } from "lucide-react";
import laptop from "@/assets/laptop.png";
import laptopBg from "@/assets/laptopbg.png";
import { speedPoints } from "@/lib/content";
import ProductStage from "./ProductStage";

const icons = [Wallet, Zap, CreditCard, Clock];

export default function DashboardSection() {
  return (
    <section id="why-sl-sweep" className="relative overflow-hidden py-16 text-white">
      <Image
        src={laptopBg}
        alt=""
        fill
        priority={false}
        placeholder="blur"
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200">Why SL Sweep</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
            Why Our Automated Gaming Platform Is Faster
          </h2>
          <p className="mt-3 max-w-xl text-brand-50/90">
            Many sweepstakes game distributors still load credits by hand, which means messaging someone
            and waiting for a reply before you can play. SL Sweep automates those steps inside one player
            dashboard, so the time between adding funds and playing your game is as short as possible.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {speedPoints.map(({ title, text }, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={title}>
                  <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
                    <Icon className="h-7 w-7 text-brand-100" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-brand-50/85">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <ProductStage
          src={laptop}
          alt="SL Sweep player dashboard showing balance and games on a laptop and phone"
          className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px]"
        />
      </div>
    </section>
  );
}
