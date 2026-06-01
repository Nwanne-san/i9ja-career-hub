"use client";

import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HOME_HERO } from "../homePage.content";

export function HomeHeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const q = query.trim();
    router.push(q ? `${AppRoutes.jobs}?q=${encodeURIComponent(q)}` : AppRoutes.jobs);
  };

  return (
    <section className="flex flex-col items-center py-8 text-center sm:py-12">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1.5 sm:mb-6">
        <Users className="h-4 w-4 text-brand-green-light" />
        <span className="text-xs font-medium text-brand-green-light sm:text-sm">
          {HOME_HERO.trustLabel}
        </span>
      </div>

      <h1 className="font-display mb-4 max-w-3xl px-2 text-2xl font-bold text-ink sm:mb-6 sm:text-4xl">
        {HOME_HERO.title}
      </h1>

      <div className="flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-border-line bg-bg-card p-2 shadow-md md:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-bg-elevated px-4">
          <input
            className="w-full border-none bg-transparent py-3 text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:ring-0"
            placeholder={HOME_HERO.searchPlaceholder}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} className="rounded-xl px-8 py-3">
          {HOME_HERO.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
