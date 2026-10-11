import Image from "next/image";
import { FileText, Gamepad2, Headphones, Wallet } from "lucide-react";
import laptop from "@/assets/laptop.png";
import laptopBg from "@/assets/laptopbg.png";
import ProductStage from "./ProductStage";

const items = [
  { Icon: Wallet, title: "Manage Balance", text: "Add funds and access cash-out options." },
  { Icon: Gamepad2, title: "Game Access", text: "Browse and play your favorite platforms." },
  { Icon: FileText, title: "Account Activity", text: "Track your transactions and account actions." },
  { Icon: Headphones, title: "Player Support", text: "Get help whenever you need it." },
];

export default function DashboardSection() {
  return (
    <section id="dashboard" className="relative overflow-hidden py-16 text-white">
      <Image
        src={laptopBg}
        alt=""
        fill
        priority={false}
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-200">Why SL Sweep</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">Everything in One Dashboard</h2>
          <p className="mt-2 text-brand-50/90">A simpler way to manage your games, funds, and account.</p>

          <ul className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {items.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
                  <Icon className="h-7 w-7 text-brand-100" />
                </span>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-brand-50/85">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <ProductStage
          src={laptop}
          alt="SL Sweep dashboard on laptop and mobile"
          className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px]"
        />
      </div>
    </section>
  );
}
