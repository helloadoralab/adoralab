import { useEffect, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { InstagramIcon } from "./BrandIcons";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@adora.studio" },
  { icon: InstagramIcon, label: "Instagram", value: "@adora.studio" },
  { icon: MessageCircle, label: "WhatsApp", value: "+1 (555) 012-3456" },
];

const BUDGETS = ["Under $150", "$150 – $300", "$300 – $500", "$500+ / Custom"];

const FIELD =
  "form-field w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-ink-500";

const LABEL =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-ink-300";

export default function Contact() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // Prefill the brief when a pricing "Get Started" button is clicked.
  useEffect(() => {
    const onPlan = (e: Event) => {
      const detail = (e as CustomEvent).detail as { plan?: string; budget?: string };
      if (detail?.plan) {
        setMessage(`Hi! I'd like to get started with the ${detail.plan} package. `);
      }
      if (detail?.budget) setBudget(detail.budget);
    };
    window.addEventListener("adora:plan", onPlan);
    return () => window.removeEventListener("adora:plan", onPlan);
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  const reset = () => {
    setName("");
    setBrand("");
    setBudget("");
    setMessage("");
    setStatus("idle");
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute right-[-8%] top-[8%] h-[420px] w-[420px] rounded-full bg-electric-500/[0.1] blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] h-[380px] w-[380px] rounded-full bg-electric-600/[0.08] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* ——— channels ——— */}
          <div>
            <SectionHead
              align="left"
              index="04"
              eyebrow="Contact"
              title={
                <>
                  Let's make content{" "}
                  <span className="text-gradient">that sells itself.</span>
                </>
              }
              description="Tell me about your brand and what you're launching. I'll come back with ideas, a timeline, and the fastest route to scroll-stopping content."
            />

            <Reveal delay={150}>
              <div className="mt-10 space-y-3">
                {CHANNELS.map((c) => (
                  <div
                    key={c.label}
                    className="hover-card flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-electric-500/25 bg-electric-500/10 text-electric-300">
                      <c.icon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-500">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-white">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-2 text-xs font-medium text-electric-300">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-electric-400" />
                Currently accepting new projects
              </div>
            </Reveal>
          </div>

          {/* ——— form ——— */}
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-7 shadow-[0_40px_120px_-40px_rgba(5,8,28,0.9)] sm:p-9">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-electric-500/15 blur-3xl"
                aria-hidden="true"
              />

              {status === "sent" ? (
                <div className="relative flex min-h-[430px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl border border-electric-500/30 bg-electric-500/15 text-electric-300">
                    <CheckCircle2 size={28} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    Message sent!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
                    Thanks{name ? `, ${name.split(" ")[0]}` : ""}! Your brief is in —
                    I'll get back to you within 24 hours with ideas and next steps.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-electric-400/60 hover:bg-electric-500/10"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="relative space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className={LABEL}>
                        Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Cooper"
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-brand" className={LABEL}>
                        Brand Name
                      </label>
                      <input
                        id="c-brand"
                        type="text"
                        required
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Cooper & Co."
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-budget" className={LABEL}>
                      Budget
                    </label>
                    <div className="relative">
                      <select
                        id="c-budget"
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className={`${FIELD} appearance-none pr-11 ${
                          budget ? "text-white" : "text-ink-500"
                        }`}
                      >
                        <option value="" disabled className="bg-navy-800 text-ink-500">
                          Select a range
                        </option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-navy-800 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-message" className={LABEL}>
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your brand, your product, and what you want this content to achieve…"
                      className={`${FIELD} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-electric-600 to-electric-500 px-7 py-4 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-80 sm:text-base"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-ink-500">
                    Average reply time: under 24 hours.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
