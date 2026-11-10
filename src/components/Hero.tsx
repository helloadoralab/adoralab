import { ArrowDown, ArrowUpRight, Play, Sparkles, TrendingUp, Zap } from "lucide-react";
import ParticleField from "./ParticleField";
import Reveal from "./Reveal";
import { scrollTo } from "./Navbar";

const STATS = [
  { value: "120+", label: "Assets delivered" },
  { value: "48h", label: "Avg. turnaround" },
  { value: "100%", label: "On-brand output" },
];

function Chip({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-800/85 px-3.5 py-2 text-xs font-semibold text-ink-100 shadow-[0_12px_32px_-12px_rgba(5,8,28,0.9)] backdrop-blur-md ${className}`}
    >
      <span className="text-electric-300">{icon}</span>
      {label}
    </span>
  );
}

export default function Hero() {
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* backdrop layers */}
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-44 right-[-8%] h-[480px] w-[480px] rounded-full bg-electric-500/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-24%] left-[-12%] h-[420px] w-[420px] rounded-full bg-electric-600/10 blur-[130px]"
        aria-hidden="true"
      />
      <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-navy-900 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36 lg:pb-32 lg:pt-44">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          {/* ——— copy ——— */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric-300">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-electric-400" />
                AI Content Studio
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-7 font-display text-[clamp(2.65rem,5.8vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-white">
                AI-Powered Content
                <br />
                That <span className="text-gradient">Converts.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-400 sm:text-lg">
                UGC videos, product photography, and cinematic story ads for small brands,
                local businesses, and e-commerce shops — built with cutting-edge AI,
                finished by a human creative eye.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#pricing"
                  onClick={go("#pricing")}
                  className="btn-primary group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-electric-600 to-electric-500 px-7 py-3.5 text-sm font-semibold text-white sm:text-base"
                >
                  View Plans
                  <ArrowDown
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
                <a
                  href="#contact"
                  onClick={go("#contact")}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-electric-400/60 hover:bg-electric-500/10 sm:text-base"
                >
                  Contact Me
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-white/10">
                {STATS.map((s, i) => (
                  <div key={s.label} className={i === 0 ? "pr-6" : "px-6"}>
                    <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-500 sm:text-[11px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ——— collage ——— */}
          <Reveal delay={260} className="relative">
            <div className="relative mx-auto h-[430px] max-w-md sm:h-[520px] lg:max-w-none xl:h-[580px]">
              <div
                className="absolute inset-x-10 bottom-8 top-12 rounded-full bg-electric-500/25 blur-[110px]"
                aria-hidden="true"
              />

              {/* main: product photography */}
              <figure className="absolute right-0 top-0 w-[64%] rotate-[1.5deg] overflow-hidden rounded-[26px] border border-white/10 shadow-[0_40px_120px_-24px_rgba(30,111,255,0.5)]">
                <img
                  src="/images/hero-product.jpg"
                  alt="AI-generated studio product shot with electric-blue rim light"
                  className="aspect-[3/4] w-full object-cover"
                />
                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-navy-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-electric-300 backdrop-blur">
                  <Sparkles size={11} />
                  AI-crafted
                </span>
              </figure>

              {/* UGC frame */}
              <figure className="float-slow absolute left-0 top-[11%] w-[40%] -rotate-[4deg] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_32px_90px_-20px_rgba(5,8,28,0.9)]">
                <img
                  src="/images/hero-ugc.jpg"
                  alt="Creator filming a UGC-style product video on a smartphone"
                  className="aspect-[3/4] w-full object-cover"
                />
              </figure>

              {/* cinematic frame */}
              <figure className="float-slower absolute bottom-[3%] left-[13%] w-[54%] rotate-[2.5deg] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_32px_90px_-18px_rgba(30,111,255,0.4)]">
                <img
                  src="/images/hero-cinematic.jpg"
                  alt="Cinematic watch commercial still with drifting blue smoke"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>

              {/* floating chips */}
              <Chip
                icon={<Zap size={13} />}
                label="48h turnaround"
                className="float-slow absolute -top-3 right-[22%]"
              />
              <Chip
                icon={<TrendingUp size={13} />}
                label="+38% avg. CTR"
                className="float-slower absolute bottom-[26%] -right-1 sm:right-[2%]"
              />
              <Chip
                icon={<Play size={13} />}
                label="4K · 9:16 ready"
                className="float-slow absolute left-[-2%] top-[54%] sm:left-[3%]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
