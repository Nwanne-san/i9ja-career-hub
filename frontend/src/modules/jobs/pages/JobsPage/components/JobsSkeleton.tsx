export function JobsListingCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border-low-contrast bg-surface-container-lowest p-4 sm:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="h-12 w-12 rounded-xl bg-surface-container" />
        <div className="h-6 w-6 rounded bg-surface-container" />
      </div>
      <div className="mb-2 h-6 w-3/4 rounded bg-surface-container" />
      <div className="mb-4 h-4 w-1/2 rounded bg-surface-container" />
      <div className="mb-6 flex gap-2">
        <div className="h-6 w-20 rounded-full bg-surface-container" />
        <div className="h-6 w-24 rounded-full bg-surface-container" />
        <div className="h-6 w-28 rounded-full bg-surface-container" />
      </div>
      <div className="flex items-center justify-between border-t border-border-low-contrast pt-4">
        <div className="h-4 w-20 rounded bg-surface-container" />
        <div className="h-9 w-28 rounded-xl bg-surface-container" />
      </div>
    </div>
  );
}

export function JobsPageSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-stack-gap md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <JobsListingCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function JobsFiltersSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 gap-4 rounded-2xl border border-border-low-contrast bg-surface-container-lowest p-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-surface-container" />
      ))}
    </div>
  );
}
