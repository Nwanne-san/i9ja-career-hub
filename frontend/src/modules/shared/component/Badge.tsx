import { cn } from "@/utils";
import type { BadgeVariant } from "@/types";
import type { ReactNode } from "react";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "border-brand-green/30 bg-brand-green/10 text-brand-green-light",
  accent: "border-brand-gold/30 bg-brand-gold/10 text-brand-gold",
  success: "border-green-500/30 bg-green-500/10 text-green-400",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  ghost: "border-border-line bg-bg-card/50 text-ink-muted",
};

export default function Badge({
  variant = "ghost",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
