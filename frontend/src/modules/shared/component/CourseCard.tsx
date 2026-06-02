import Badge from "@/modules/shared/component/Badge";
import { AppRoutes } from "@/routes/app.routes";
import { cn } from "@/utils";
import type { BadgeVariant } from "@/types";
import Link from "next/link";

export interface CourseCardData {
  id: string;
  image: string;
  category: string;
  categoryVariant?: BadgeVariant;
  title: string;
  description: string;
  href?: string;
}

interface CourseCardProps {
  course: CourseCardData;
  className?: string;
  compact?: boolean;
}

export default function CourseCard({
  course,
  className,
  compact = false,
}: CourseCardProps) {
  const href = course.href ?? AppRoutes.courses;

  return (
    <Link
      href={href}
      className={cn(
        "card-lift group block shrink-0 overflow-hidden rounded-xl border border-border-line bg-bg-card",
        compact ? "min-w-[280px]" : "w-full",
        className
      )}
    >
      <img
        src={course.image}
        alt={course.title}
        className="h-32 w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
      />
      <div className="p-4">
        <Badge variant={course.categoryVariant ?? "primary"} className="mb-2">
          {course.category}
        </Badge>
        <h3 className="line-clamp-1 text-sm font-bold text-ink sm:text-base">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-ink-muted sm:text-sm">
          {course.description}
        </p>
      </div>
    </Link>
  );
}
