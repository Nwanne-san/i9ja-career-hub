import Link from "next/link";
import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { AppRoutes } from "@/routes/app.routes";
import type { Job } from "@/types";
import { formatJobPostedAt } from "@/utils";

interface ProfileSavedJobCardProps {
  job: Job;
}

export function ProfileSavedJobCard({ job }: ProfileSavedJobCardProps) {
  return (
    <Link
      href={AppRoutes.jobDetail(job.id)}
      className="group block rounded-xl border border-border-low-contrast p-4 transition-colors hover:bg-surface-container-low"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-headline-md text-headline-md text-on-surface transition-colors group-hover:text-primary">
            {job.title}
          </h3>
          <p className="mt-1 font-body-sm text-on-surface-variant">
            {job.company} · {job.location}
          </p>
        </div>
        <span className="whitespace-nowrap font-body-sm text-on-surface-variant">
          {formatJobPostedAt(job.postedAt)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-on-surface-variant">
        {job.salary && (
          <span className="flex items-center gap-1 font-body-sm">
            <MaterialIcon name="payments" className="text-[18px]" />
            {job.salary}
          </span>
        )}
        <span className="rounded-full bg-primary-fixed px-2 py-0.5 font-label-pill text-label-pill text-on-primary-fixed-variant">
          {job.type}
        </span>
      </div>
    </Link>
  );
}
