import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import LogoMark from "./LogoMark";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go =
    (href: string) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setOpen(false);
      scrollTo(href);
    };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-navy-900/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <LogoMark />

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="nav-link text-sm font-medium text-ink-300 transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            onClick={go("#pricing")}
            className="btn-primary hidden items-center gap-2 rounded-full bg-gradient-to-r from-electric-600 to-electric-500 px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex"
          >
            Get Started
            <ArrowRight size={15} />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition-colors hover:border-electric-400/50 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu border-t border-white/[0.06] bg-navy-900/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                className="group flex items-center justify-between border-b border-white/[0.05] py-4 last:border-0"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-electric-400">
                    0{i + 1}
                  </span>
                  <span className="font-display text-lg font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
                    {l.label}
                  </span>
                </span>
                <ArrowUpRight size={17} className="text-ink-500 transition-colors group-hover:text-electric-400" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
