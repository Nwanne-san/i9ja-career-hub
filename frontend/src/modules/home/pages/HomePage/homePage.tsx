import SiteShell from "@/modules/shared/component/SiteShell";
import { HomeBottomAdSection } from "./components/HomeBottomAdSection";
import { HomeCoursesSection } from "./components/HomeCoursesSection";
import { HomeForumCategoriesSection } from "./components/HomeForumCategoriesSection";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { HomeJobsSection } from "./components/HomeJobsSection";
import { HomeProPromoSection } from "./components/HomeProPromoSection";
import { HomeStatsSection } from "./components/HomeStatsSection";
import { HomeTopAdSection } from "./components/HomeTopAdSection";
import { HomeTrendingSection } from "./components/HomeTrendingSection";

export function HomePage() {
  return (
    <SiteShell>
      <main className="mx-auto mb-20 max-w-page px-4 pb-16 pt-16 sm:px-6 md:pb-0 md:pt-20">
        <HomeTopAdSection />
        <HomeHeroSection />
        <HomeStatsSection />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <HomeCoursesSection />
          </div>
          <div className="lg:col-span-4">
            <HomeForumCategoriesSection />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HomeJobsSection />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <HomeTrendingSection />
            <HomeProPromoSection />
          </div>
        </div>

        <HomeBottomAdSection />
      </main>
    </SiteShell>
  );
}
