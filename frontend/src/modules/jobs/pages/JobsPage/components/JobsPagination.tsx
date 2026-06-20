"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { cn } from "@/utils";

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function JobsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JobsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Jobs pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border border-border-low-contrast p-2 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-40"
      >
        <MaterialIcon name="chevron_left" />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="mx-2 text-outline">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg font-label-bold text-label-bold transition-colors",
              page === currentPage
                ? "bg-primary text-on-primary"
                : "border border-border-low-contrast bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border border-border-low-contrast p-2 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-40"
      >
        <MaterialIcon name="chevron_right" />
      </button>
    </nav>
  );
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current, "...", total];
}
