import { Sparkle } from "lucide-react";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center text-2xl font-black italic tracking-tight sm:text-3xl ${
        light ? "text-white" : "text-brand-900"
      }`}
    >
      SL
      <Sparkle className="mx-0.5 h-5 w-5 fill-accent text-accent sm:h-6 sm:w-6" strokeWidth={0} />
      SWEEP
    </span>
  );
}
