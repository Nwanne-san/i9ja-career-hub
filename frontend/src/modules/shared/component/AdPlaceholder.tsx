import { cn } from "@/utils";
import type { ReactNode } from "react";

interface AdPlaceholderProps {
  label?: string;
  children?: ReactNode;
  variant?: "banner" | "compact" | "sidebar";
  className?: string;
}

export default function AdPlaceholder({
  label = "AD",
  children,
  variant = "banner",
  className,
}: AdPlaceholderProps) {
  const heights = {
    banner: "h-20 sm:h-24",
    compact: "h-16",
    sidebar: "min-h-[120px]",
  };

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-border-line bg-bg-card/60",
        heights[variant],
        className
      )}
    >
      <span className="absolute left-2 top-2 rounded bg-ink-dim/20 px-2 py-0.5 text-[10px] font-bold text-ink-dim">
        {label}
      </span>
      {children ?? (
        <p className="px-4 text-center text-xs italic text-ink-muted sm:text-sm">
          Advertisement space
        </p>
      )}
    </div>
  );
}
