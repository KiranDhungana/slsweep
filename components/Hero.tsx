import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gamepad2, Headphones, ShieldCheck } from "lucide-react";
import banner from "@/assets/banner.png";
import bannerBg from "@/assets/bannerbg.png";
import { playUrl } from "@/lib/site";
import ProductStage from "./ProductStage";

const features = [
  { Icon: ShieldCheck, title: "One Account", text: "Simple and secure" },
  { Icon: Gamepad2, title: "Easy Game Access", text: "Play your favorites" },
  { Icon: Headphones, title: "Player Support", text: "We're here to help" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={bannerBg}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-8 lg:grid-cols-2 lg:py-0">
        <div className="lg:py-20">
          <p className="eyebrow">Welcome to SL Sweep</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            All your games.
            <br />
            <span className="text-brand-700">One place.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-slate-700">
            Manage your account, access your favorite games and stay in control with one player dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-w-[160px]"
            >
              Get Started <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href="#games" className="btn-outline min-w-[160px] bg-white/70 backdrop-blur-sm">
              Explore Games
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="text-xs text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ProductStage
          src={banner}
          alt="SL Sweep player dashboard with favorite games"
          priority
          className="-mx-4 aspect-[4/3] sm:mx-0 lg:-mr-8 lg:aspect-auto lg:h-[560px]"
        />
      </div>
    </section>
  );
}
