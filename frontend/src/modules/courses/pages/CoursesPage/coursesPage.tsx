"use client";

import { useMemo, useState } from "react";
import SiteShell from "@/modules/shared/component/SiteShell";
import { useCoursesQuery } from "@/services/queryService";
import type { Course } from "@/types";
import {
  COURSES_PAGE_COPY,
  COURSES_PER_PAGE,
} from "./coursesPage.content";
import { CoursesEmptyState } from "./components/CoursesEmptyState";
import {
  CoursesFilters,
  CoursesFiltersSkeleton,
} from "./components/CoursesFilters";
import { CoursesListingCard } from "./components/CoursesListingCard";
import { CoursesLoadMore } from "./components/CoursesLoadMore";
import { CoursesSidebar } from "./components/CoursesSidebar";
import {
  CoursesSponsoredAd,
  CoursesSponsoredAdSkeleton,
} from "./components/CoursesSponsoredAd";
import { CoursesGridSkeleton } from "./components/CoursesSkeleton";

function filterCourses(
  courses: Course[],
  category: string,
  level: string
): Course[] {
  return courses.filter((course) => {
    const matchesCategory =
      category === "All Category" ||
      course.category.toLowerCase() === category.toLowerCase() ||
      course.category.toLowerCase().includes(category.toLowerCase());

    const courseLevel = course.level.toLowerCase();
    const matchesLevel =
      !level || courseLevel === level.toLowerCase();

    return matchesCategory && matchesLevel;
  });
}

export function CoursesPage() {
  const [category, setCategory] = useState("All Category");
  const [level, setLevel] = useState("");
  const [visibleCount, setVisibleCount] = useState(COURSES_PER_PAGE);

  const { data: courses = [], isLoading, isFetching, isError } = useCoursesQuery();

  const filtered = useMemo(
    () => filterCourses(courses, category, level),
    [courses, category, level]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const showSkeleton = isLoading || (isFetching && courses.length === 0);

  const handleReset = () => {
    setCategory("All Category");
    setLevel("");
    setVisibleCount(COURSES_PER_PAGE);
  };

  return (
    <SiteShell>
      <CoursesSidebar />

      <main className="flex-1 px-gutter pb-section-padding pt-16 lg:ml-64 lg:pt-20">
        <div className="mx-auto max-w-container-max">
          <div className="mb-8">
            <h1 className="font-headline-lg text-headline-lg mb-2 text-on-surface md:text-headline-lg">
              {COURSES_PAGE_COPY.title}
            </h1>
            <p className="text-on-surface-variant">{COURSES_PAGE_COPY.subtitle}</p>
          </div>

          {showSkeleton ? (
            <CoursesFiltersSkeleton />
          ) : (
            <CoursesFilters
              category={category}
              level={level}
              onCategoryChange={(cat) => {
                setCategory(cat);
                setVisibleCount(COURSES_PER_PAGE);
              }}
              onLevelChange={(lvl) => {
                setLevel(lvl);
                setVisibleCount(COURSES_PER_PAGE);
              }}
            />
          )}

          {showSkeleton ? (
            <CoursesSponsoredAdSkeleton />
          ) : (
            <CoursesSponsoredAd />
          )}

          {showSkeleton ? (
            <CoursesGridSkeleton />
          ) : isError || visible.length === 0 ? (
            <CoursesEmptyState onReset={handleReset} />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((course) => (
                  <CoursesListingCard key={course.id} course={course} />
                ))}
              </div>
              <CoursesLoadMore
                hasMore={hasMore}
                loading={isFetching && !isLoading}
                onLoadMore={() =>
                  setVisibleCount((n) => n + COURSES_PER_PAGE)
                }
              />
            </>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
