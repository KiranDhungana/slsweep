import { PartyPopper } from "lucide-react";

const winners = [
  { name: "Emily R.", amount: "$124.58", avatar: "https://i.pravatar.cc/80?img=47" },
  { name: "James T.", amount: "$87.32", avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Sophia M.", amount: "$224.45", avatar: "https://i.pravatar.cc/80?img=32" },
  { name: "Michael B.", amount: "$49.43", avatar: "https://i.pravatar.cc/80?img=33" },
  { name: "Ashley K.", amount: "$318.76", avatar: "https://i.pravatar.cc/80?img=45" },
  { name: "Daniel S.", amount: "$92.10", avatar: "https://i.pravatar.cc/80?img=15" },
  { name: "Jessica L.", amount: "$134.24", avatar: "https://i.pravatar.cc/80?img=25" },
  { name: "Chris P.", amount: "$76.90", avatar: "https://i.pravatar.cc/80?img=52" },
];

function WinnerCard({ name, amount, avatar }: (typeof winners)[number]) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white/15" />
      <div className="min-w-0 leading-tight">
        <p className="text-sm font-bold text-white">{name}</p>
        <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-white">
          won <span className="font-bold text-[#FFD200]">{amount}</span>
          <PartyPopper className="h-3.5 w-3.5 text-[#FF6B8A]" strokeWidth={2.25} aria-hidden />
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/90">
          <PartyPopper className="h-3 w-3 text-[#FFD200]" strokeWidth={2.25} aria-hidden />
          Congratulations!
        </p>
      </div>
    </div>
  );
}

export default function LiveWinners() {
  const track = [...winners, ...winners];

  return (
    <section className="relative overflow-hidden bg-[#000B21]" aria-label="Live winners">
      <div className="flex items-center">
        <div className="relative z-10 flex shrink-0 items-center gap-2.5 bg-[#000B21] px-4 py-3 sm:px-6">
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-[#22F07E]" aria-hidden />
          <p className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.14em] text-white sm:text-sm">
            Live Winners
          </p>
          <span className="ml-2 hidden h-8 w-px bg-white/20 sm:block" aria-hidden />
        </div>

        <div className="min-w-0 flex-1 overflow-hidden mask-winners">
          <div className="winners-marquee flex w-max items-center py-3">
            {track.map((w, i) => (
              <div key={`${w.name}-${i}`} className="flex items-center">
                <WinnerCard {...w} />
                <span className="h-10 w-px shrink-0 bg-white/20" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
