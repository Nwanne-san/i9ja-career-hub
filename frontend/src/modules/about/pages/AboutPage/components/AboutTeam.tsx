"use client";

import { ABOUT_TEAM } from "../aboutPage.content";
import { ChevronLeft, ChevronRight, Link2, Mail } from "lucide-react";
import { useRef } from "react";

function TeamCard({
  name,
  role,
  image,
  quote,
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
}) {
  return (
    <div className="group relative min-w-[280px] snap-start overflow-hidden rounded-2xl border border-border-line bg-bg-card shadow-sm transition-shadow hover:shadow-md md:min-w-[320px]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-brand-green/90 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
          <p className="mb-4 text-sm italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={`${name} profile link`}
              className="rounded p-1 transition-colors hover:text-brand-gold"
            >
              <Link2 className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={`Email ${name}`}
              className="rounded p-1 transition-colors hover:text-brand-gold"
            >
              <Mail className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{name}</h3>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-green-light">
          {role}
        </p>
      </div>
    </div>
  );
}

export function AboutTeam() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollTeam = (direction: number) => {
    carouselRef.current?.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="rounded-2xl border border-border-line bg-bg-elevated/50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-page">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Our Team
            </h2>
            <p className="max-w-lg text-sm text-ink-muted sm:text-base">
              The architects behind the signal. A dedicated group of Nigerians
              committed to fostering a culture of excellence.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollTeam(-1)}
              aria-label="Scroll team left"
              className="rounded-full border border-border-line bg-bg-card p-3 transition-all hover:bg-brand-green/10 active:scale-90"
            >
              <ChevronLeft className="h-5 w-5 text-ink" />
            </button>
            <button
              type="button"
              onClick={() => scrollTeam(1)}
              aria-label="Scroll team right"
              className="rounded-full border border-border-line bg-bg-card p-3 transition-all hover:bg-brand-green/10 active:scale-90"
            >
              <ChevronRight className="h-5 w-5 text-ink" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
        >
          {ABOUT_TEAM.map((member) => (
            <TeamCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
