import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { JOBS_PREMIUM_AD } from "../jobsPage.content";

export function JobsSidebarAd() {
  return (
    <div className="group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-border-low-contrast bg-surface-container p-6 text-center">
      <div className="absolute left-2 top-2 rounded bg-on-surface-variant/10 px-1.5 text-[10px] font-bold text-on-surface-variant">
        AD
      </div>
      <MaterialIcon
        name="rocket_launch"
        className="mb-4 text-4xl text-outline transition-transform group-hover:scale-110"
      />
      <p className="font-label-bold text-label-bold text-on-surface mb-2">
        {JOBS_PREMIUM_AD.title}
      </p>
      <p className="text-body-sm font-body-sm text-on-surface-variant mb-4">
        {JOBS_PREMIUM_AD.description}
      </p>
      <button
        type="button"
        className="w-full rounded-lg bg-brand-green py-2 font-label-bold text-label-bold text-white transition-opacity hover:opacity-90"
      >
        {JOBS_PREMIUM_AD.cta}
      </button>
    </div>
  );
}
