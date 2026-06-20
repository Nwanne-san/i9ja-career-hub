"use client";

import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { AppRoutes } from "@/routes/app.routes";
import { useEnrollCourseMutation } from "@/services/queryService";
import type { Course } from "@/types";
import Link from "next/link";
import { cn } from "@/utils";
import { COURSE_CATEGORY_BADGE } from "../coursesPage.content";

const IMAGE_BG: Record<string, string> = {
  "primary-fixed": "bg-primary-fixed",
  "tertiary-fixed": "bg-tertiary-fixed",
  "secondary-fixed-dim": "bg-secondary-fixed-dim",
  "primary-fixed-dim": "bg-primary-fixed-dim",
  "error-container": "bg-error-container",
  "surface-container-highest": "bg-surface-container-highest",
};

const AVATAR_BG: Record<string, string> = {
  "primary-fixed": "bg-primary-fixed text-primary",
  "secondary-fixed": "bg-secondary-fixed text-on-secondary-fixed",
  "primary-container": "bg-primary-container text-on-primary-container",
  "outline-variant": "bg-outline-variant text-on-surface",
  "tertiary-fixed": "bg-tertiary-fixed text-on-tertiary-fixed",
};

interface CoursesListingCardProps {
  course: Course;
}

function formatStudents(count?: number) {
  if (!count) return "0 Students";
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k Students`;
  return `${count} Students`;
}

export function CoursesListingCard({ course }: CoursesListingCardProps) {
  const enrollMutation = useEnrollCourseMutation();
  const badgeClass =
    COURSE_CATEGORY_BADGE[course.category] ??
    "bg-secondary-container text-on-secondary-container";

  const imageBg = IMAGE_BG[course.imageBg ?? ""] ?? "bg-primary-fixed";
  const avatarBg =
    AVATAR_BG[course.providerAvatarBg ?? ""] ?? "bg-primary-fixed text-primary";

  return (
    <article className="group overflow-hidden rounded-2xl border border-border-low-contrast bg-surface-container-lowest transition-all duration-300 hover:shadow-md">
      <div className={cn("relative h-40 overflow-hidden sm:h-48", imageBg)}>
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            {course.thumbnailEmoji ?? "📚"}
          </div>
        )}
        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-label-pill font-bold",
              badgeClass
            )}
          >
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link href={AppRoutes.courseDetail(course.id)}>
            <h3 className="font-headline-md text-on-surface transition-colors group-hover:text-primary line-clamp-2">
              {course.title}
            </h3>
          </Link>
          {course.verified !== false && (
            <MaterialIcon
              name="verified"
              filled
              className="shrink-0 text-success-green"
            />
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-body-sm text-on-surface-variant">
          {course.duration && (
            <div className="flex items-center gap-1">
              <MaterialIcon name="schedule" className="text-body-sm" />
              <span>{course.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <MaterialIcon name="group" className="text-body-sm" />
            <span>{formatStudents(course.studentCount)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-low-contrast pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full font-bold text-[10px]",
                avatarBg
              )}
            >
              {course.providerInitials ?? course.provider.charAt(0)}
            </div>
            <span className="text-label-bold">{course.provider}</span>
          </div>
          <button
            type="button"
            disabled={enrollMutation.isPending}
            onClick={() => enrollMutation.mutate(course.id)}
            className="rounded-full bg-primary px-5 py-2 text-label-pill font-bold text-on-primary transition-all active:scale-95 disabled:opacity-60"
          >
            {enrollMutation.isPending ? "Enrolling…" : "Enrol Free"}
          </button>
        </div>
      </div>
    </article>
  );
}
