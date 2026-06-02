"use client";

import Badge from "@/modules/shared/component/Badge";
import { AppRoutes } from "@/routes/app.routes";
import { cn } from "@/utils";
import { Bookmark, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export interface JobCardData {
  id: string;
  title: string;
  company: string;
  location: string;
  verified?: boolean;
  tags: string[];
  href?: string;
}

interface JobCardProps {
  job: JobCardData;
  className?: string;
}

export default function JobCard({ job, className }: JobCardProps) {
  const href = job.href ?? AppRoutes.jobs;

  return (
    <Link
      href={href}
      className={cn(
        "card-lift flex gap-3 rounded-xl border border-border-line bg-bg-card p-4 sm:gap-4 sm:p-5",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-elevated sm:h-12 sm:w-12">
        <Building2 className="h-5 w-5 text-brand-green-light" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="flex items-center gap-1 truncate text-sm font-bold text-ink sm:text-base">
              {job.title}
              {job.verified && (
                <CheckCircle2 className="h-4 w-4 shrink-0 fill-brand-green-light/20 text-brand-green-light" />
              )}
            </h3>
            <p className="truncate text-xs text-ink-muted sm:text-sm">
              {job.company} · {job.location}
            </p>
          </div>
          <button
            type="button"
            aria-label="Save job"
            className="shrink-0 text-ink-dim transition-colors hover:text-brand-green-light"
            onClick={(e) => e.preventDefault()}
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
          {job.tags.map((tag) => (
            <Badge
              key={tag}
              variant={tag.includes("Match") ? "accent" : "ghost"}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
