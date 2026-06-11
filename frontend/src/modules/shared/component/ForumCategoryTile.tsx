import { cn } from "@/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ForumCategoryTileProps {
  icon?: LucideIcon;
  label: string;
  href: string;
  className?: string;
}

export default function ForumCategoryTile({
  icon: Icon,
  label,
  href,
  className,
}: ForumCategoryTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "card-lift group flex flex-col gap-2 rounded-2xl border border-border-line bg-bg-card p-4 transition-colors hover:bg-bg-card-hover",
        className
      )}
    >
      {Icon && <Icon className="h-6 w-6 text-brand-green-light" />}
      <span className="text-sm font-bold text-ink transition-colors group-hover:text-brand-green-light">
        {label}
      </span>
    </Link>
  );
}
