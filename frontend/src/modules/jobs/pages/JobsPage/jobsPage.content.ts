export const JOBS_PAGE_COPY = {
  title: "Jobs & Opportunities",
  defaultSearch: "UI/UX Designer",
  defaultLocation: "Lagos, Nigeria",
  resultsLabel: "jobs for",
  emptyTitle: "No jobs match your search",
  emptyDescription:
    "Try a different role, location, or work mode. New listings go up every day from verified Nigerian employers.",
  emptyAction: "Clear filters",
} as const;

export const JOBS_WORK_MODES = [
  { value: "remote", label: "Remote" },
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
] as const;

export const JOBS_VERIFIED_FILTERS = [
  { value: "verified", label: "Verified Only" },
  { value: "all", label: "All Jobs" },
] as const;

export const JOBS_PREMIUM_AD = {
  title: "Upgrade to Premium",
  description: "Get listed first and double your visibility to recruiters.",
  cta: "Learn More",
} as const;

export const JOBS_PER_PAGE = 4;
