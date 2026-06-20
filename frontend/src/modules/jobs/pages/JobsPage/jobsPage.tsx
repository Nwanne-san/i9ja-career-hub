"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import {
  useJobsQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
} from "@/services/queryService";
import type { Job } from "@/types";
import type { RootState } from "@/redux/store";
import { saveJob, unsaveJob } from "@/redux/store/slices/jobSlice";
import { JOBS_PAGE_COPY, JOBS_PER_PAGE } from "./jobsPage.content";
import { JobsEmptyState } from "./components/JobsEmptyState";
import { JobsListingCard } from "./components/JobsListingCard";
import { PaginationControls } from "@/modules/shared/component/Pagination";
import { JobsResultsHeader } from "./components/JobsResultsHeader";
import {
  JobsFiltersSkeleton,
  JobsPageSkeleton,
} from "./components/JobsSkeleton";
import { JobsSearchFilters, type JobsFiltersState } from "./components/JobsSearchFilters";
import { JobsSidebar } from "./components/JobsSidebar";

const DEFAULT_FILTERS: JobsFiltersState = {
  search: "",
  location: "",
  workMode: "hybrid",
  verifiedOnly: "all",
};

function filterJobs(jobs: Job[], filters: JobsFiltersState): Job[] {
  const search = filters.search.trim().toLowerCase();
  const location = filters.location.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.category?.toLowerCase().includes(search);

    const matchesLocation =
      !location || job.location.toLowerCase().includes(location);

    const matchesWorkMode =
      filters.workMode === "remote"
        ? job.remote === true || job.location.toLowerCase().includes("remote")
        : filters.workMode === "on-site"
          ? !job.remote && !job.location.toLowerCase().includes("hybrid")
          : true;

    const matchesVerified =
      filters.verifiedOnly !== "verified" || job.verified;

    return matchesSearch && matchesLocation && matchesWorkMode && matchesVerified;
  });
}

export function JobsPage() {
  const dispatch = useDispatch();
  const savedJobIds = useSelector((state: RootState) => state.jobs.savedJobs);
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<JobsFiltersState>({
    ...DEFAULT_FILTERS,
    search: initialSearch,
  });
  const [appliedFilters, setAppliedFilters] = useState<JobsFiltersState>({
    ...DEFAULT_FILTERS,
    search: initialSearch,
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(JOBS_PER_PAGE);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== appliedFilters.search) {
      const next = { ...appliedFilters, search: q };
      setFilters(next);
      setAppliedFilters(next);
      setPage(1);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: jobs = [], isLoading, isFetching, isError } = useJobsQuery();
  const saveMutation = useSaveJobMutation();
  const unsaveMutation = useUnsaveJobMutation();

  const filtered = useMemo(
    () => filterJobs(jobs, appliedFilters),
    [jobs, appliedFilters]
  );

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSearch = () => {
    setAppliedFilters(filters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handleToggleSave = (jobId: string) => {
    const isSaved = savedJobIds.includes(jobId);
    if (isSaved) {
      unsaveMutation.mutate(jobId);
      dispatch(unsaveJob(jobId));
    } else {
      saveMutation.mutate(jobId);
      dispatch(saveJob(jobId));
    }
  };

  const showSkeleton = isLoading || (isFetching && jobs.length === 0);

  return (
    <SiteShell>
      <main className="mx-auto max-w-container-max px-gutter pb-section-padding pt-24">
        <header className="mb-8">
          <h1 className="font-headline-lg text-headline-lg mb-6 text-on-surface">
            {JOBS_PAGE_COPY.title}
          </h1>
          {showSkeleton ? (
            <JobsFiltersSkeleton />
          ) : (
            <JobsSearchFilters
              filters={filters}
              onChange={setFilters}
              onSearch={handleSearch}
            />
          )}
        </header>

        <div className="flex flex-col gap-8 lg:flex-row">
          <JobsSidebar />

          <div className="min-w-0 flex-1">
            {!showSkeleton && (
              <JobsResultsHeader
                count={filtered.length}
                searchTerm={appliedFilters.search}
              />
            )}

            {showSkeleton ? (
              <JobsPageSkeleton />
            ) : isError ? (
              <JobsEmptyState onClearFilters={handleClearFilters} />
            ) : paginated.length === 0 ? (
              <JobsEmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-stack-gap md:grid-cols-2">
                  {paginated.map((job) => (
                    <JobsListingCard
                      key={job.id}
                      job={job}
                      saved={savedJobIds.includes(job.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
                <PaginationControls
                  currentPage={page}
                  rowsPerPage={rowsPerPage}
                  totalItems={filtered.length}
                  onPageChange={({ page: nextPage, rowsPerPage: nextRowsPerPage }) => {
                    setPage(nextPage);
                    setRowsPerPage(nextRowsPerPage);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
