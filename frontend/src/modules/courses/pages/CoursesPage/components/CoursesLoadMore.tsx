"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { COURSES_PAGE_COPY } from "../coursesPage.content";

interface CoursesLoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
}

export function CoursesLoadMore({
  onLoadMore,
  hasMore,
  loading,
}: CoursesLoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container px-8 py-3 font-label-bold text-on-surface transition-colors hover:bg-surface-container-high disabled:opacity-60"
      >
        {loading ? "Loading…" : COURSES_PAGE_COPY.loadMore}
        <MaterialIcon name="expand_more" />
      </button>
    </div>
  );
}
