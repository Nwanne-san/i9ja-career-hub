"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { AppRoutes } from "@/routes/app.routes";
import { useApplyJobMutation } from "@/services/queryService";
import type { Job } from "@/types";
import Link from "next/link";
import { cn } from "@/utils";

interface JobsListingCardProps {
  job: Job;
  saved?: boolean;
  onToggleSave?: (jobId: string) => void;
}

function JobTag({ label, variant }: { label: string; variant: "default" | "match" | "salary" }) {
  const styles = {
    default: "bg-surface-container-high text-on-surface-variant",
    match: "bg-secondary-container/20 text-on-secondary-container",
    salary: "bg-tertiary-fixed text-on-tertiary-fixed",
  };

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-label-pill font-label-pill",
        styles[variant]
      )}
    >
      {label}
    </span>
  );
}

function tagVariant(tag: string): "default" | "match" | "salary" {
  if (tag.includes("Match") || tag === "Direct Hire" || tag === "Urgent") return "match";
  if (tag.includes("₦") || tag.includes("USD") || tag === "Negotiable") return "salary";
  return "default";
}

export function JobsListingCard({ job, saved, onToggleSave }: JobsListingCardProps) {
  const applyMutation = useApplyJobMutation();
  const tags =
    job.tags ??
    [
      job.type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      job.salary,
    ].filter(Boolean);

  const logoBg =
    job.logoBg === "primary-fixed" ? "bg-primary-fixed" : "bg-surface-container";

  return (
    <article className="group rounded-2xl border border-border-low-contrast bg-surface-container-lowest p-4 transition-all duration-200 hover:shadow-md sm:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl p-1",
            logoBg
          )}
        >
          {job.logoUrl ? (
            <img
              src={job.logoUrl}
              alt={job.company}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="font-label-bold text-label-bold text-primary">
              {job.company.charAt(0)}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={saved ? "Remove bookmark" : "Bookmark job"}
          onClick={() => onToggleSave?.(job.id)}
          className="text-outline transition-colors hover:text-primary"
        >
          <MaterialIcon
            name="bookmark"
            filled={saved}
            className={saved ? "text-primary" : undefined}
          />
        </button>
      </div>

      <div className="mb-1 flex items-center gap-1">
        <Link href={AppRoutes.jobDetail(job.id)}>
          <h3 className="font-headline-md text-headline-md text-on-surface transition-colors hover:text-primary">
            {job.title}
          </h3>
        </Link>
        {job.verified && (
          <MaterialIcon
            name="verified"
            filled
            className="text-[18px] text-success-green"
          />
        )}
      </div>

      <p className="mb-4 text-body-sm font-body-sm text-on-surface-variant">
        {job.company} • {job.location}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <JobTag key={tag} label={tag as string} variant={tagVariant(tag as string)} />
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-border-low-contrast pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm font-body-sm text-outline">{job.postedAt}</p>
        <button
          type="button"
          disabled={applyMutation.isPending}
          onClick={() => applyMutation.mutate({ jobId: job.id })}
          className="rounded-xl bg-primary px-6 py-2 font-label-bold text-label-bold text-on-primary transition-all hover:bg-primary-container active:scale-95 disabled:opacity-60"
        >
          {applyMutation.isPending ? "Applying…" : "Apply Now"}
        </button>
      </div>
    </article>
  );
}
