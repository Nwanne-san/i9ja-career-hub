"use client";

import { FORUM_CATEGORIES } from "@/utils/constants";
import { FORUMS_PAGE_COPY } from "../forumsPage.content";

interface ForumsFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ForumsFilters({
  selectedCategory,
  onSelectCategory,
}: ForumsFiltersProps) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
      <button
        type="button"
        onClick={() => onSelectCategory("all")}
        className={`whitespace-nowrap rounded-full px-4 py-2 transition-colors ${
          selectedCategory === "all"
            ? "bg-primary text-on-primary"
            : "bg-surface-container-low text-on-surface hover:bg-surface-container"
        }`}
      >
        {FORUMS_PAGE_COPY.allCategories}
      </button>
      {FORUM_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelectCategory(cat.id)}
          className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 transition-colors ${
            selectedCategory === cat.id
              ? "bg-primary text-on-primary"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          }`}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
