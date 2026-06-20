"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import Button from "@/modules/shared/component/Button";
import Badge from "@/modules/shared/component/Badge";
import { DataRenderer } from "@/modules/shared/component/DataRenderer";
import {
  useJobQuery,
  useApplyJobMutation,
  useSaveJobMutation,
  useUnsaveJobMutation,
} from "@/services/queryService";
import { formatJobPostedAt } from "@/utils";
import type { RootState } from "@/redux/store";
import type { Job } from "@/types";
import { saveJob, unsaveJob } from "@/redux/store/slices/jobSlice";
import { AppRoutes } from "@/routes/app.routes";

function JobDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-2/3 rounded bg-surface-container-low" />
      <div className="h-4 w-1/3 rounded bg-surface-container-low" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 rounded bg-surface-container-low" />
        ))}
      </div>
      <div className="h-32 rounded bg-surface-container-low" />
    </div>
  );
}

export function JobDetailPage({ jobId }: { jobId: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { savedJobs } = useSelector((state: RootState) => state.jobs);
  const isSaved = savedJobs.includes(jobId);

  const { data: job, isLoading, isError, refetch } = useJobQuery(jobId);
  const applyMutation = useApplyJobMutation();
  const saveMutation = useSaveJobMutation();
  const unsaveMutation = useUnsaveJobMutation();

  const handleApply = () => {
    if (!user) {
      router.push(AppRoutes.auth);
      return;
    }
    applyMutation.mutate({ jobId });
  };

  const handleSave = () => {
    if (!user) {
      router.push(AppRoutes.auth);
      return;
    }
    if (isSaved) {
      unsaveMutation.mutate(jobId);
      dispatch(unsaveJob(jobId));
    } else {
      saveMutation.mutate(jobId);
      dispatch(saveJob(jobId));
    }
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-gutter pb-section-padding pt-24">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-primary transition-colors hover:text-primary-container"
        >
          ← Back
        </button>

        <DataRenderer<Job>
          isLoading={isLoading}
          isError={isError || !job}
          isEmpty={false}
          data={job}
          onRetry={() => refetch()}
          renderLoading={<JobDetailSkeleton />}
          errorTitle="Job not found"
          errorSubTitle="This listing may have been removed."
        >
          {({ data }) =>
            data ? (
              <div className="rounded-2xl border border-border-low-contrast bg-bg-card p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-on-surface">
                      {data.title}
                    </h1>
                    <p className="text-lg font-semibold text-primary">
                      {data.company}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    className={`rounded-lg border px-4 py-2 transition-colors ${
                      isSaved
                        ? "border-primary bg-primary text-on-primary"
                        : "border-border-low-contrast text-on-surface hover:bg-bg-base"
                    }`}
                  >
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4 border-y border-border-low-contrast py-4 sm:grid-cols-4">
                  <div>
                    <p className="mb-1 text-sm text-on-surface-variant">Location</p>
                    <p className="font-semibold">{data.location}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-on-surface-variant">Type</p>
                    <Badge variant="primary">{data.type}</Badge>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-on-surface-variant">Salary</p>
                    <p className="font-semibold">{data.salary || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-on-surface-variant">Posted</p>
                    <p className="text-sm font-semibold">
                      {formatJobPostedAt(data.postedAt)}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-bold text-on-surface">
                    About this role
                  </h2>
                  <p className="leading-relaxed text-on-surface-variant">
                    {data.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleApply}
                    disabled={applyMutation.isPending}
                  >
                    {applyMutation.isPending ? "Applying..." : "Apply Now"}
                  </Button>
                  <Button variant="ghost" onClick={() => router.back()}>
                    Back
                  </Button>
                </div>
              </div>
            ) : null
          }
        </DataRenderer>
      </main>
    </SiteShell>
  );
}
