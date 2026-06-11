import SiteShell from "@/modules/shared/component/SiteShell";
import { AboutCta } from "./components/AboutCta";
import { AboutMissionHero } from "./components/AboutMissionHero";
import { AboutTeam } from "./components/AboutTeam";
import { AboutValues } from "./components/AboutValues";

export function AboutPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-page space-y-8 px-4 pb-24 md:pb-16 pt-16 sm:space-y-12 sm:px-6 md:pt-20">
        <AboutMissionHero />
        <AboutTeam />
        <AboutValues />
        <AboutCta />
      </main>
    </SiteShell>
  );
}
