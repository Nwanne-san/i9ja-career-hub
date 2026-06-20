import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { COURSES_SPONSORED_AD } from "../coursesPage.content";

export function CoursesSponsoredAd() {
  return (
    <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6 md:flex-row">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-surface-container-highest p-3">
          <MaterialIcon name="campaign" className="text-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-outline-variant">
            {COURSES_SPONSORED_AD.label}
          </span>
          <h4 className="font-headline-md text-on-surface">
            {COURSES_SPONSORED_AD.title}
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            {COURSES_SPONSORED_AD.description}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="whitespace-nowrap rounded-full bg-surface-container-highest px-6 py-2 font-label-bold text-on-surface transition-colors hover:bg-outline-variant"
      >
        {COURSES_SPONSORED_AD.cta}
      </button>
    </div>
  );
}

export function CoursesSponsoredAdSkeleton() {
  return (
    <div className="mb-10 animate-pulse rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="h-12 w-12 rounded-lg bg-surface-container" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded bg-surface-container" />
          <div className="h-5 w-2/3 rounded bg-surface-container" />
          <div className="h-4 w-full rounded bg-surface-container" />
        </div>
        <div className="h-10 w-32 rounded-full bg-surface-container" />
      </div>
    </div>
  );
}
