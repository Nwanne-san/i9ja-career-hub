export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-stack-gap">
      <div className="rounded-xl border border-border-low-contrast bg-surface-container-lowest p-8">
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end">
          <div className="h-32 w-32 rounded-full bg-surface-container" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-48 rounded-lg bg-surface-container" />
            <div className="h-4 w-32 rounded bg-surface-container" />
            <div className="h-4 w-64 rounded bg-surface-container" />
          </div>
        </div>
        <div className="mt-8 space-y-2 md:ml-[152px]">
          <div className="h-4 w-full max-w-xl rounded bg-surface-container" />
          <div className="h-4 w-3/4 max-w-lg rounded bg-surface-container" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border-low-contrast bg-surface-container-lowest p-6"
          >
            <div className="mx-auto mb-2 h-7 w-12 rounded bg-surface-container" />
            <div className="mx-auto h-3 w-20 rounded bg-surface-container" />
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border-low-contrast bg-surface-container-lowest">
        <div className="flex gap-4 border-b border-border-low-contrast px-4 py-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 w-24 rounded bg-surface-container" />
          ))}
        </div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border-low-contrast p-4"
            >
              <div className="mb-2 h-4 w-20 rounded-full bg-surface-container" />
              <div className="mb-2 h-5 w-3/4 rounded bg-surface-container" />
              <div className="h-4 w-full rounded bg-surface-container" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
