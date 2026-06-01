import JobCard from "@/modules/shared/component/JobCard";
import { AppRoutes } from "@/routes/app.routes";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HOME_LATEST_JOBS } from "../homePage.content";

export function HomeJobsSection() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
          Latest Opportunities
        </h2>
        <Link
          href={AppRoutes.jobs}
          className="flex items-center gap-1 text-xs font-bold text-brand-green-light hover:underline sm:text-sm"
        >
          All Jobs <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {HOME_LATEST_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
