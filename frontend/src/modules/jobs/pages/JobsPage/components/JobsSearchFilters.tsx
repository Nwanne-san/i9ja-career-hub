"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import {
  JOBS_VERIFIED_FILTERS,
  JOBS_WORK_MODES,
  JOBS_PAGE_COPY,
} from "../jobsPage.content";

export interface JobsFiltersState {
  search: string;
  location: string;
  workMode: string;
  verifiedOnly: string;
}

interface JobsSearchFiltersProps {
  filters: JobsFiltersState;
  onChange: (filters: JobsFiltersState) => void;
  onSearch: () => void;
}

export function JobsSearchFilters({
  filters,
  onChange,
  onSearch,
}: JobsSearchFiltersProps) {
  const update = (patch: Partial<JobsFiltersState>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border-low-contrast bg-surface-container-lowest p-4 shadow-sm md:grid-cols-4 lg:grid-cols-5">
      <div className="relative">
        <MaterialIcon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder={JOBS_PAGE_COPY.defaultSearch}
          className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container focus:outline-none"
        />
      </div>

      <div className="relative">
        <MaterialIcon
          name="location_on"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="text"
          value={filters.location}
          onChange={(e) => update({ location: e.target.value })}
          placeholder={JOBS_PAGE_COPY.defaultLocation}
          className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-container focus:outline-none"
        />
      </div>

      <div className="relative">
        <MaterialIcon
          name="work"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <select
          value={filters.workMode}
          onChange={(e) => update({ workMode: e.target.value })}
          className="w-full appearance-none rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-body-sm font-body-sm text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none"
        >
          {JOBS_WORK_MODES.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <MaterialIcon
          name="verified"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <select
          value={filters.verifiedOnly}
          onChange={(e) => update({ verifiedOnly: e.target.value })}
          className="w-full appearance-none rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 text-body-sm font-body-sm text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none"
        >
          {JOBS_VERIFIED_FILTERS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="w-full rounded-xl bg-primary py-3 font-label-bold text-label-bold text-on-primary transition-all hover:bg-primary-container active:scale-95"
      >
        Search Jobs
      </button>
    </div>
  );
}
