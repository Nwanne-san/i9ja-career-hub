import { PROFILE_PAGE_COPY } from "../profilePage.content";

interface ProfileStatsRowProps {
  reputation: number;
  threads: number;
  replies: number;
  savedJobs: number;
}

export function ProfileStatsRow({
  reputation,
  threads,
  replies,
  savedJobs,
}: ProfileStatsRowProps) {
  const stats = [
    {
      label: PROFILE_PAGE_COPY.stats.reputation,
      value: reputation,
      valueClass: "text-primary",
    },
    {
      label: PROFILE_PAGE_COPY.stats.threads,
      value: threads,
      valueClass: "text-on-surface",
    },
    {
      label: PROFILE_PAGE_COPY.stats.replies,
      value: replies,
      valueClass: "text-on-surface",
    },
    {
      label: PROFILE_PAGE_COPY.stats.savedJobs,
      value: savedJobs,
      valueClass: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border-low-contrast bg-surface-container-lowest p-6 text-center transition-shadow hover:shadow-sm"
        >
          <div
            className={`font-headline-md text-headline-md ${stat.valueClass}`}
          >
            {stat.value}
          </div>
          <div className="font-label-pill text-body-sm uppercase tracking-wider text-on-surface-variant">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
