import { Sparkles } from "lucide-react";

const ITEMS = [
  "UGC Videos",
  "Product Photography",
  "Cinematic Story Ads",
  "Smart Web Tools",
  "AI-Enhanced Quality",
  "48h Delivery",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-navy-950/60 py-5">
      <div className="marquee-track flex w-max items-center gap-10">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-10" aria-hidden={i >= ITEMS.length}>
            <span className="whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.32em] text-white/35">
              {item}
            </span>
            <Sparkles size={14} className="shrink-0 text-electric-500/70" />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-navy-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-navy-900 to-transparent" />
    </div>
  );
}
