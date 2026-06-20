"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import Button from "@/modules/shared/component/Button";
import { DataRenderer } from "@/modules/shared/component/DataRenderer";
import {
  useCourseQuery,
  useEnrollCourseMutation,
} from "@/services/queryService";
import type { RootState } from "@/redux/store";
import type { Course } from "@/types";
import { enrollCourse } from "@/redux/store/slices/courseSlice";
import { AppRoutes } from "@/routes/app.routes";

function CourseDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-48 rounded-2xl bg-surface-container-low" />
      <div className="h-8 w-2/3 rounded bg-surface-container-low" />
      <div className="h-24 rounded bg-surface-container-low" />
    </div>
  );
}

export function CourseDetailPage({ courseId }: { courseId: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { enrolledCourses } = useSelector((state: RootState) => state.courses);
  const isEnrolled = enrolledCourses.includes(courseId);

  const { data: course, isLoading, isError, refetch } = useCourseQuery(courseId);
  const enrollMutation = useEnrollCourseMutation();

  const handleEnroll = () => {
    if (!user) {
      router.push(AppRoutes.auth);
      return;
    }
    enrollMutation.mutate(courseId, {
      onSuccess: () => dispatch(enrollCourse(courseId)),
    });
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-gutter pb-section-padding pt-24">
        <DataRenderer<Course>
          isLoading={isLoading}
          isError={isError || !course}
          isEmpty={false}
          data={course}
          onRetry={() => refetch()}
          renderLoading={<CourseDetailSkeleton />}
          errorTitle="Course not found"
        >
          {({ data }) =>
            data ? (
              <div className="rounded-2xl border border-border-low-contrast bg-bg-card p-8">
                <h1 className="mb-2 text-3xl font-bold text-on-surface">
                  {data.title}
                </h1>
                <p className="mb-4 text-lg font-semibold text-primary">
                  {data.provider}
                </p>
                <div className="mb-6 flex flex-wrap gap-3 text-sm text-on-surface-variant">
                  <span className="capitalize">{data.level}</span>
                  <span>•</span>
                  <span>{data.category}</span>
                  {data.duration && (
                    <>
                      <span>•</span>
                      <span>{data.duration}</span>
                    </>
                  )}
                  {data.rating && (
                    <>
                      <span>•</span>
                      <span>★ {data.rating}</span>
                    </>
                  )}
                </div>
                <p className="mb-8 text-on-surface-variant">
                  {data.free ? "Free course" : "Paid course"} — enroll to start learning.
                </p>
                <Button
                  onClick={handleEnroll}
                  disabled={enrollMutation.isPending || isEnrolled}
                >
                  {isEnrolled
                    ? "Enrolled"
                    : enrollMutation.isPending
                      ? "Enrolling..."
                      : "Enroll for free"}
                </Button>
              </div>
            ) : null
          }
        </DataRenderer>
      </main>
    </SiteShell>
  );
}
