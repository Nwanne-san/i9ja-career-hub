import {
  ABOUT_MISSION_STATS,
  MISSION_HERO_IMAGE,
} from "../aboutPage.content";
import { BadgeCheck } from "lucide-react";

export function AboutMissionHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border-line bg-bg-card px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto flex max-w-page flex-col items-center gap-10 md:flex-row md:gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1">
            <BadgeCheck className="h-4 w-4 text-brand-green-light" />
            <span className="text-xs font-medium text-brand-green-light">
              Our Mission
            </span>
          </div>

          <h1 className="font-display max-w-2xl text-3xl font-bold leading-tight text-brand-green-light sm:text-4xl lg:text-5xl">
            Connecting Nigeria&apos;s brightest minds to global opportunities.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            At i9ja, we believe talent is universal, but opportunity is not. We
            are building the digital infrastructure to empower Nigerian
            professionals, artisans, and students through verified networking,
            high-signal discussions, and direct access to growth.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {ABOUT_MISSION_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex w-28 flex-col items-center justify-center rounded-xl border border-border-line bg-bg-elevated p-4 sm:w-32"
              >
                <span className="font-display text-xl font-bold text-brand-green-light">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-ink-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-brand-green/20 blur-3xl sm:h-64 sm:w-64" />
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl border-4 border-bg-elevated shadow-2xl">
            <img
              src={MISSION_HERO_IMAGE}
              alt="Collaborative workspace in Lagos, Nigeria"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
