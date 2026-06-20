"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import EmptyState from "@/modules/shared/component/EmptyState";
import { JOBS_PAGE_COPY } from "../jobsPage.content";

interface JobsEmptyStateProps {
  onClearFilters?: () => void;
}

export function JobsEmptyState({ onClearFilters }: JobsEmptyStateProps) {
  return (
    <EmptyState
      icon="work_off"
      title={JOBS_PAGE_COPY.emptyTitle}
      description={JOBS_PAGE_COPY.emptyDescription}
      actionLabel={JOBS_PAGE_COPY.emptyAction}
      onAction={onClearFilters}
    >
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["Remote", "Lagos", "Verified"].map((hint) => (
          <span
            key={hint}
            className="inline-flex items-center gap-1 rounded-full border border-border-low-contrast px-3 py-1 text-label-pill text-on-surface-variant"
          >
            <MaterialIcon name="lightbulb" className="text-sm" />
            Try {hint}
          </span>
        ))}
      </div>
    </EmptyState>
  );
}
