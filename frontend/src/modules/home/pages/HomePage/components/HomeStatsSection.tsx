import { HOME_STATS } from "../homePage.content";

export function HomeStatsSection() {
  return (
    <section className="grid grid-cols-2 gap-4 border-y border-border-line py-6 sm:grid-cols-4 sm:py-8">
      {HOME_STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center ${i > 0 ? "border-l border-border-line" : ""}`}
        >
          <span className="font-display text-xl font-bold text-brand-green-light sm:text-2xl">
            {stat.value}
          </span>
          <span className="text-xs text-ink-muted sm:text-sm">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
