import { ChevronLeft, ChevronRight, Gamepad2, ReceiptText, Settings } from "lucide-react";
import Logo from "./Logo";

const rows = [
  { label: "Game Floor", Icon: Gamepad2 },
  { label: "Account Activity", Icon: ReceiptText },
  { label: "Account Settings", Icon: Settings },
];

export default function PhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative rounded-[2.5rem] border-[6px] border-slate-900 bg-gradient-to-b from-brand-950 to-[#021a10] p-4 shadow-2xl ${
        compact ? "w-44" : "w-64 sm:w-72"
      }`}
    >
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-slate-800" />
      <div className="mb-4 flex items-center gap-2 text-white">
        <ChevronLeft className="h-4 w-4" />
        <div className="origin-left scale-[0.6]">
          <Logo light />
        </div>
      </div>

      <div className="rounded-xl bg-white/10 p-3 text-white">
        {!compact && <p className="text-xs font-semibold">Welcome Back!</p>}
        <p className={`mt-1 font-bold ${compact ? "text-xl" : "text-2xl"}`}>$0.00</p>
        <p className="text-[10px] text-brand-100/80">Available Balance</p>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-md bg-brand-500 py-1.5 text-center text-[10px] font-semibold">Add Funds</span>
          <span className="flex-1 rounded-md bg-white py-1.5 text-center text-[10px] font-semibold text-brand-800">
            Cash Out
          </span>
        </div>
      </div>

      <ul className="mt-3 divide-y divide-slate-100 rounded-xl bg-white">
        {rows.map(({ label, Icon }) => (
          <li key={label} className="flex items-center gap-2 px-3 py-2.5 text-[11px] font-medium text-ink">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-700 text-white">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1">{label}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </li>
        ))}
      </ul>
    </div>
  );
}
