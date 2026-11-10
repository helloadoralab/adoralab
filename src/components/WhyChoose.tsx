import { Film, Sparkles, Store, Zap } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const POINTS = [
  {
    icon: Sparkles,
    num: "01",
    title: "AI-Enhanced Quality",
    desc: "Cutting-edge generative AI guided by a human creative eye. Studio polish on every frame, product, and pixel.",
  },
  {
    icon: Zap,
    num: "02",
    title: "Fast Delivery",
    desc: "Most packs land in your inbox within 48–72 hours, so your content calendar never has to wait on production.",
  },
  {
    icon: Store,
    num: "03",
    title: "Small Brand Focused",
    desc: "Built for local businesses and growing e-commerce shops — agency-grade output without the agency invoice.",
  },
  {
    icon: Film,
    num: "04",
    title: "Story-Driven Content",
    desc: "Hook, tension, payoff. Every asset is engineered to hold attention and sell the click — not just look pretty.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative border-y border-white/[0.05] bg-navy-950/40 py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/[0.06] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="03"
          eyebrow="Why choose me"
          title={
            <>
              Built different, <span className="text-gradient">on purpose.</span>
            </>
          }
          description="A one-person studio with AI doing the heavy lifting — which means you get speed, quality, and pricing no traditional agency can match."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110} className="h-full">
              <article className="hover-card group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-navy-900/60 p-7">
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/0 blur-2xl transition-all duration-500 group-hover:bg-electric-500/20"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-electric-500/25 bg-gradient-to-b from-electric-500/15 to-transparent text-electric-300 transition-transform duration-500 group-hover:scale-105">
                    <p.icon size={21} strokeWidth={1.75} />
                  </div>
                  <span className="select-none font-display text-3xl font-bold text-white/[0.06]">
                    {p.num}
                  </span>
                </div>
                <h3 className="relative mt-6 font-display text-lg font-semibold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-ink-400">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
