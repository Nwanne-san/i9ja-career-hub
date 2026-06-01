"use client";

import { cn } from "@/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-light border-transparent shadow-sm",
  accent:
    "bg-brand-gold/15 text-brand-gold border-brand-gold/30 hover:bg-brand-gold/25",
  outline:
    "bg-transparent text-ink border-border-line hover:border-brand-green/40 hover:text-brand-green-light",
  ghost:
    "bg-transparent text-ink-muted border-transparent hover:bg-bg-card hover:text-ink",
  danger:
    "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
