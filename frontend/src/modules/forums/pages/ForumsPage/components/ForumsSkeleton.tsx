export function ForumsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-border-low-contrast bg-bg-card p-4"
        >
          <div className="mb-2 h-4 w-3/4 rounded bg-surface-container-low" />
          <div className="mb-4 h-3 w-full rounded bg-surface-container-low" />
          <div className="h-3 w-1/2 rounded bg-surface-container-low" />
        </div>
      ))}
    </div>
  );
}
