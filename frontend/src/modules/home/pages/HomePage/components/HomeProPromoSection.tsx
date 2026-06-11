import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";
import { HOME_PRO_PROMO } from "../homePage.content";

export function HomeProPromoSection() {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-green/10 p-6 text-center">
      <span className="text-xs font-bold text-brand-green-light sm:text-sm">
        {HOME_PRO_PROMO.title}
      </span>
      <p className="mt-2 text-xs text-ink-muted sm:text-sm">
        {HOME_PRO_PROMO.description}
      </p>
      <Button href={AppRoutes.login} className="mt-4 rounded-lg px-4 py-2 text-sm">
        {HOME_PRO_PROMO.ctaLabel}
      </Button>
    </div>
  );
}
