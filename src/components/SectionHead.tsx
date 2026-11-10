import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
};

export default function SectionHead({
  index,
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : "text-left"}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : "justify-start"}`}>
        {centered && <span className="h-px w-8 bg-gradient-to-l from-electric-500 to-transparent" />}
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-electric-400">
          {index} · {eyebrow}
        </span>
        <span className="h-px w-8 bg-gradient-to-r from-electric-500 to-transparent" />
      </div>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-ink-400 sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
