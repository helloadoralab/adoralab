import { AppWindow, ArrowRight, Camera, Clapperboard, Smartphone } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { scrollTo } from "./Navbar";

const SERVICES = [
  {
    icon: Smartphone,
    num: "01",
    title: "UGC Videos",
    desc: "Authentic creator-style videos that feel native to the feed — scripted, voiced, and edited to turn scrollers into buyers.",
    tags: ["TikTok · Reels · Shorts", "Scroll-stopping hooks", "Natural voiceover & dialogue"],
  },
  {
    icon: Camera,
    num: "02",
    title: "Product Photography",
    desc: "Studio-grade product shots in any scene, lighting, or style — no shipping, no studio rental. Consistent and on-brand, every single time.",
    tags: ["Lifestyle & studio scenes", "Ad-ready crops & ratios", "On-brand color grading"],
  },
  {
    icon: Clapperboard,
    num: "03",
    title: "Cinematic Ads",
    desc: "TV-grade story ads with cinematic camera moves, custom scores, and sound design that make a small brand feel massive.",
    tags: ["15–60s story arcs", "Music + SFX included", "4K mastering"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-electric-500/[0.07] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="01"
          eyebrow="What I offer"
          title={
            <>
              Content that makes{" "}
              <span className="text-gradient">brands look big.</span>
            </>
          }
          description="Three core services, one goal — assets that stop the scroll and turn attention into revenue."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article className="hover-card group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-electric-500/0 blur-3xl transition-all duration-500 group-hover:bg-electric-500/20"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute right-7 top-6 select-none font-display text-5xl font-bold text-white/[0.05]">
                  {s.num}
                </span>

                <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-electric-500/25 bg-gradient-to-b from-electric-500/15 to-transparent text-electric-300 transition-transform duration-500 group-hover:scale-105">
                  <s.icon size={24} strokeWidth={1.75} />
                </div>

                <h3 className="relative mt-7 font-display text-xl font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-400">{s.desc}</p>

                <ul className="relative mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
                  {s.tags.map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[13px] text-ink-300">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-electric-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* smart web tools — bonus strip */}
        <Reveal delay={360} className="mt-6">
          <div className="rounded-3xl bg-gradient-to-r from-electric-500/40 via-white/10 to-electric-500/40 p-px">
            <div className="flex flex-col items-start gap-6 rounded-[calc(1.5rem-1px)] bg-navy-800/90 px-7 py-7 sm:flex-row sm:items-center sm:px-9">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-electric-500/25 bg-electric-500/10 text-electric-300">
                <AppWindow size={21} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <p className="font-display text-base font-semibold text-white">
                  Plus: Smart Web Tools
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-400">
                  Custom interactive micro-tools — cost calculators, quizzes, product
                  configurators — that capture leads while your ads bring the clicks.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-electric-400/60 hover:bg-electric-500/10"
              >
                Add to any plan
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
