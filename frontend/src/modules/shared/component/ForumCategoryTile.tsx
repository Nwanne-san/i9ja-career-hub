import { cn } from "@/utils";
import Link from "next/link";

interface ForumCategoryTileProps {
  emoji: string;
  label: string;
  href: string;
  className?: string;
}

export default function ForumCategoryTile({
  emoji,
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
      <span className="text-2xl">{emoji}</span>
      <span className="text-sm font-bold text-ink transition-colors group-hover:text-brand-green-light">
        {label}
      </span>
    </Link>
  );
}
