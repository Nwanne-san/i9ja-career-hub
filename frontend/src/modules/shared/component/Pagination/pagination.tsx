"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { cn } from "@/utils";
import {
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { ITEMS_PER_PAGE } from "@/modules/shared/constant";

export interface PaginationControlsProps {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  rowsPerPageList?: number[];
  onPageChange?: (args: { page: number; rowsPerPage: number }) => void;
  className?: string;
}

export function PaginationControls({
  currentPage,
  rowsPerPage,
  totalItems,
  rowsPerPageList = [ITEMS_PER_PAGE, 25, 50],
  onPageChange,
  className,
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  if (totalPages <= 1 && totalItems <= rowsPerPageList[0]) return null;

  const pages = buildPageNumbers(currentPage, totalPages);

  const handleRowsChange = (e: SelectChangeEvent<number>) => {
    onPageChange?.({ page: 1, rowsPerPage: Number(e.target.value) });
  };

  return (
    <div
      className={cn(
        "mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
        <span>Rows per page</span>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={handleRowsChange}
          className="min-w-[4rem] text-on-surface"
          sx={{
            color: "inherit",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#2a3030" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#334040" },
            ".MuiSvgIcon-root": { color: "#8a9e90" },
          }}
        >
          {rowsPerPageList.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </div>

      <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.({ page: currentPage - 1, rowsPerPage })}
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
              onClick={() => onPageChange?.({ page, rowsPerPage })}
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
          onClick={() => onPageChange?.({ page: currentPage + 1, rowsPerPage })}
          className="rounded-lg border border-border-low-contrast p-2 text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-40"
        >
          <MaterialIcon name="chevron_right" />
        </button>
      </nav>
    </div>
  );
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current, "...", total];
}
