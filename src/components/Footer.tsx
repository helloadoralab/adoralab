import type { MouseEvent } from "react";
import { ArrowUp } from "lucide-react";
import LogoMark from "./LogoMark";
import { scrollTo } from "./Navbar";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const go =
    (href: string) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollTo(href);
    };

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-navy-950/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 py-12 sm:px-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <LogoMark small />
          <p className="text-xs text-ink-500">AI-powered content that converts.</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="text-sm text-ink-400 transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <button
            onClick={toTop}
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ink-300 transition-all duration-300 hover:border-electric-400/60 hover:bg-electric-500/10 hover:text-white"
          >
            <ArrowUp size={16} />
          </button>
          <p className="text-xs text-ink-500">© 2024 Adora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
