import AdPlaceholder from "@/modules/shared/component/AdPlaceholder";
import { HOME_TOP_AD_COPY } from "../homePage.content";

export function HomeTopAdSection() {
  return (
    <AdPlaceholder variant="banner" className="my-4 sm:my-6">
      <p className="px-4 text-center text-xs italic text-ink-muted sm:text-sm">
        {HOME_TOP_AD_COPY}
      </p>
    </AdPlaceholder>
  );
}
