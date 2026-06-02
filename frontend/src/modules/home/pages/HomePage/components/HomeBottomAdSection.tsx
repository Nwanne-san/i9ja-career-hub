import AdPlaceholder from "@/modules/shared/component/AdPlaceholder";
import { HOME_BOTTOM_AD } from "../homePage.content";

export function HomeBottomAdSection() {
  return (
    <AdPlaceholder variant="banner" className="mt-12 h-24 sm:mt-16 sm:h-32">
      <div className="flex items-center gap-4 px-4 sm:gap-6">
        <div className="hidden h-14 w-14 shrink-0 rounded-lg border border-border-line bg-bg-card p-2 sm:block sm:h-16 sm:w-16">
          <img
            className="h-full w-full object-contain"
            src={HOME_BOTTOM_AD.image}
            alt="Partner app"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-brand-green-light sm:text-base">
            {HOME_BOTTOM_AD.title}
          </p>
          <p className="text-xs text-ink-muted sm:text-sm">
            {HOME_BOTTOM_AD.description}
          </p>
        </div>
      </div>
    </AdPlaceholder>
  );
}
