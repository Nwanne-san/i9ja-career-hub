"use client";

import { COURSES_CATEGORIES, COURSES_LEVELS } from "../coursesPage.content";
import { cn } from "@/utils";

interface CoursesFiltersProps {
  category: string;
  level: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
}

export function CoursesFilters({
  category,
  level,
  onCategoryChange,
  onLevelChange,
}: CoursesFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-6">
      <div className="hide-scrollbar flex items-center gap-4 overflow-x-auto pb-2">
        {COURSES_CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 font-label-pill transition-colors",
                active
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-label-bold uppercase tracking-wider text-outline">
          Level:
        </span>
        {COURSES_LEVELS.map((lvl) => {
          const active = level === lvl;
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onLevelChange(active ? "" : lvl)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-label-pill transition-colors",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant hover:bg-surface-container"
              )}
            >
              {lvl}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CoursesFiltersSkeleton() {
  return (
    <div className="mb-8 animate-pulse space-y-4">
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-28 shrink-0 rounded-full bg-surface-container" />
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-24 rounded-full bg-surface-container" />
        ))}
      </div>
    </div>
  );
}
