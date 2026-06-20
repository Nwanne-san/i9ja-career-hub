export function CoursesListingCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border-low-contrast bg-surface-container-lowest">
      <div className="h-40 bg-surface-container sm:h-48" />
      <div className="space-y-3 p-5">
        <div className="h-6 w-3/4 rounded bg-surface-container" />
        <div className="flex gap-4">
          <div className="h-4 w-20 rounded bg-surface-container" />
          <div className="h-4 w-24 rounded bg-surface-container" />
        </div>
        <div className="flex items-center justify-between border-t border-border-low-contrast pt-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-surface-container" />
            <div className="h-4 w-24 rounded bg-surface-container" />
          </div>
          <div className="h-9 w-28 rounded-full bg-surface-container" />
        </div>
      </div>
    </div>
  );
}

export function CoursesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CoursesListingCardSkeleton key={i} />
      ))}
    </div>
  );
}
