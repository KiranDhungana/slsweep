import { PartyPopper, CreditCard, Smartphone, Wallet, Building2, Bitcoin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const winners = [
  { name: "Emily R.", amount: "$124.58" },
  { name: "James T.", amount: "$87.32" },
  { name: "Sophia M.", amount: "$224.45" },
  { name: "Michael B.", amount: "$49.43" },
  { name: "Ashley K.", amount: "$318.76" },
  { name: "Daniel S.", amount: "$92.10" },
  { name: "Jessica L.", amount: "$134.24" },
  { name: "Chris P.", amount: "$76.90" },
];

const payments: { name: string; Icon: LucideIcon }[] = [
  { name: "Cash App", Icon: Smartphone },
  { name: "Chime", Icon: Building2 },
  { name: "PayPal", Icon: Wallet },
  { name: "Venmo", Icon: Smartphone },
  { name: "Zelle", Icon: Building2 },
  { name: "Apple Pay", Icon: CreditCard },
  { name: "Google Pay", Icon: CreditCard },
  { name: "Crypto", Icon: Bitcoin },
];

function WinnerCard({ name, amount }: (typeof winners)[number]) {
  return (
    <div className="flex shrink-0 flex-col justify-center px-5 py-1 leading-tight">
      <p className="text-sm font-bold text-white">{name}</p>
      <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-brand-100">
        won <span className="font-bold text-brand-300">{amount}</span>
        <PartyPopper className="h-3.5 w-3.5 text-brand-200" strokeWidth={2.25} aria-hidden />
      </p>
      <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-brand-100/90">
        <PartyPopper className="h-3 w-3 text-brand-300" strokeWidth={2.25} aria-hidden />
        Congratulations!
      </p>
    </div>
  );
}

function PaymentChip({ name, Icon }: (typeof payments)[number]) {
  return (
    <div className="mx-2 flex shrink-0 items-center gap-2 rounded-full border border-brand-400/40 bg-brand-800/80 px-3.5 py-2">
      <Icon className="h-4 w-4 text-brand-300" aria-hidden />
      <span className="whitespace-nowrap text-xs font-semibold text-white sm:text-sm">{name}</span>
    </div>
  );
}

export default function LiveWinners() {
  const track = [
    ...winners.flatMap((w, i) => [
      { type: "winner" as const, key: `w-${w.name}`, data: w },
      { type: "payment" as const, key: `p-${payments[i % payments.length].name}-${i}`, data: payments[i % payments.length] },
    ]),
  ];
  const loop = [...track, ...track];

  return (
    <section className="relative overflow-hidden bg-brand-950" aria-label="Live winners and payment methods">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800" aria-hidden />
      <div className="relative flex items-center">
        <div className="relative z-10 flex shrink-0 items-center gap-2.5 bg-brand-950 px-4 py-3 sm:px-6">
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-brand-400" aria-hidden />
          <div>
            <p className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.14em] text-white sm:text-sm">
              Live Winners
            </p>
            <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-brand-300">
              + Payment Methods
            </p>
          </div>
          <span className="ml-2 hidden h-10 w-px bg-white/15 sm:block" aria-hidden />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden mask-winners">
          <div className="winners-marquee flex w-max items-center py-3">
            {loop.map((item, i) => (
              <div key={`${item.key}-${i}`} className="flex items-center">
                {item.type === "winner" ? (
                  <WinnerCard {...item.data} />
                ) : (
                  <PaymentChip {...item.data} />
                )}
                <span className="h-10 w-px shrink-0 bg-white/15" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
