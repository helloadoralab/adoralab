import { ArrowRight, Check, Crown, Fingerprint, Music, RefreshCw } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { scrollTo } from "./Navbar";

type Tier = { name: string; price: number; items: string[] };
type Plan = {
  name: string;
  badge: string;
  tagline: string;
  ctaBudget: string;
  popular?: boolean;
  tiers: Tier[];
};

const PLANS: Plan[] = [
  {
    name: "Adora Family Starter",
    badge: "Referral / Family Only",
    tagline: "A taste of Adora for the inner circle.",
    ctaBudget: "Under $150",
    tiers: [
      {
        name: "UGC Essentials",
        price: 99,
        items: ["2 AI product photos", "2 UGC-style videos", "Direct social ad + dialogue"],
      },
      {
        name: "Cinematic Suite",
        price: 149,
        items: ["2 AI product photos", "2 cinematic videos", "TV-grade story ad"],
      },
    ],
  },
  {
    name: "Monthly Brand Booster",
    badge: "Most Popular",
    tagline: "Fresh, on-trend content every single month.",
    ctaBudget: "$150 – $300",
    popular: true,
    tiers: [
      {
        name: "UGC Essentials",
        price: 149,
        items: ["4 AI product photos", "4 UGC-style videos", "High-converting UGC pack"],
      },
      {
        name: "Cinematic Suite",
        price: 199,
        items: ["4 AI product photos", "4 cinematic videos", "Story ads + smart web tool idea"],
      },
    ],
  },
  {
    name: "Brand Scale Domination",
    badge: "Best Value",
    tagline: "Maximum output for brands ready to scale.",
    ctaBudget: "$300 – $500",
    tiers: [
      {
        name: "UGC Essentials",
        price: 199,
        items: ["8 AI product photos", "8 UGC-style videos", "Best value for small brands"],
      },
      {
        name: "Cinematic Flagship",
        price: 299,
        items: ["8 AI product photos", "8 cinematic videos", "Custom web tool + biz growth ideas"],
      },
    ],
  },
];

const INCLUDED = [
  { icon: Fingerprint, label: "Character & product consistency" },
  { icon: Music, label: "Music + SFX" },
  { icon: RefreshCw, label: "Revisions" },
];

function getStarted(plan: Plan) {
  window.dispatchEvent(
    new CustomEvent("adora:plan", {
      detail: { plan: plan.name, budget: plan.ctaBudget },
    })
  );
  scrollTo("#contact");
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      {/* ambient glows */}
      <div
        className="absolute left-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-electric-500/[0.08] blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute right-[-10%] top-[10%] h-[380px] w-[380px] rounded-full bg-electric-600/[0.07] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="02"
          eyebrow="Pricing"
          title={
            <>
              Simple packs. <span className="text-gradient">Serious output.</span>
            </>
          }
          description="Transparent, productized pricing — pick a pack, brief me once, and get ad-ready content back in days."
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-7">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 130} className="h-full">
              <div className={`relative h-full ${plan.popular ? "z-10 lg:-mt-5 lg:mb-5" : ""}`}>
                <article
                  className={`pricing-card relative flex h-full flex-col rounded-[26px] border p-7 sm:p-8 ${
                    plan.popular
                      ? "border-electric-500/60 bg-gradient-to-b from-electric-500/[0.14] to-navy-800/90 shadow-[0_0_90px_-24px_rgba(30,111,255,0.75)]"
                      : "border-white/[0.09] bg-navy-800/60 backdrop-blur"
                  }`}
                >
                  {/* badge */}
                  <span
                    className={`absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] ${
                      plan.popular
                        ? "bg-gradient-to-r from-electric-600 to-electric-500 text-white shadow-[0_10px_28px_-8px_rgba(30,111,255,0.9)]"
                        : "border border-white/15 bg-navy-700 text-ink-300"
                    }`}
                  >
                    {plan.popular && <Crown size={11} />}
                    {plan.badge}
                  </span>

                  <h3 className="mt-4 font-display text-[1.45rem] font-semibold tracking-tight text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-500">{plan.tagline}</p>

                  {/* tiers */}
                  <div className="mt-7 space-y-4">
                    {plan.tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="pt-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-electric-300">
                            {tier.name}
                          </span>
                          <span className="text-right">
                            <span className="font-display text-[1.7rem] font-semibold leading-none text-white">
                              ${tier.price}
                            </span>
                            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">
                              per pack
                            </span>
                          </span>
                        </div>
                        <ul className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
                          {tier.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-300">
                              <Check size={15} className="mt-0.5 shrink-0 text-electric-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* included in every plan + CTA pinned to bottom */}
                  <div className="mt-auto pt-7">
                    <div className="rounded-2xl border border-white/[0.07] bg-navy-900/70 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-500">
                        Every plan includes
                      </p>
                      <ul className="mt-3 space-y-2">
                        {INCLUDED.map((inc) => (
                          <li
                            key={inc.label}
                            className="flex items-center gap-2.5 text-[13px] text-ink-300"
                          >
                            <inc.icon size={14} className="shrink-0 text-electric-400" />
                            {inc.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => getStarted(plan)}
                      className={`group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 sm:text-base ${
                        plan.popular
                          ? "btn-primary bg-gradient-to-r from-electric-600 to-electric-500 text-white"
                          : "border border-white/15 bg-white/[0.03] text-white hover:border-electric-400/60 hover:bg-electric-500/10"
                      }`}
                    >
                      Get Started
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-14 text-center text-sm text-ink-500">
            All packs include full commercial usage rights. Need a custom mix?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="font-semibold text-electric-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Let's build your own bundle
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
