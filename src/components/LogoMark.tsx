import { Image as ImageIcon } from "lucide-react";

/**
 * LOGO PLACEHOLDER
 * Replace the dashed <span> below with your real logo, e.g.:
 * <img src="/logo.png" alt="Adora" className="h-10 w-auto" />
 * and drop the "Logo placeholder" caption.
 */
export default function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <a href="#home" className="group inline-flex items-center gap-3" aria-label="Adora Studio — home">
      <span
        className={`grid shrink-0 place-items-center rounded-xl border border-dashed border-electric-400/60 bg-electric-500/[0.06] text-electric-400 transition-colors duration-300 group-hover:bg-electric-500/15 ${
          small ? "h-9 w-9" : "h-10 w-10"
        }`}
      >
        <ImageIcon size={small ? 15 : 17} strokeWidth={1.75} />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display font-semibold tracking-tight text-white ${
            small ? "text-base" : "text-lg"
          }`}
        >
          Adora<span className="text-gradient"> Studio</span>
        </span>
        <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.38em] text-ink-500">
          Logo placeholder
        </span>
      </span>
    </a>
  );
}
