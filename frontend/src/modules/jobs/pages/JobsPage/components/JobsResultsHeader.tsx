"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { cn } from "@/utils";
import { useState } from "react";

interface JobsResultsHeaderProps {
  count: number;
  searchTerm: string;
}

export function JobsResultsHeader({ count, searchTerm }: JobsResultsHeaderProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-body-sm font-body-sm text-on-surface-variant">
        <span className="font-bold text-on-surface">{count}</span> jobs for{" "}
        <span className="text-on-surface">{searchTerm || "all roles"}</span> found
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          onClick={() => setView("grid")}
          className={cn(
            "rounded-lg p-2 material-symbols-outlined text-[20px]",
            view === "grid"
              ? "bg-surface-container-highest text-on-surface"
              : "bg-surface-container text-on-surface-variant"
          )}
        >
          <MaterialIcon name="grid_view" className="text-[20px]" />
        </button>
        <button
          type="button"
          aria-label="List view"
          aria-pressed={view === "list"}
          onClick={() => setView("list")}
          className={cn(
            "rounded-lg p-2",
            view === "list"
              ? "bg-surface-container-highest text-on-surface"
              : "bg-surface-container text-on-surface-variant"
          )}
        >
          <MaterialIcon name="list" className="text-[20px]" />
        </button>
      </div>
    </div>
  );
}
