import CourseCard from "@/modules/shared/component/CourseCard";
import { AppRoutes } from "@/routes/app.routes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HOME_FEATURED_COURSES } from "../homePage.content";

export function HomeCoursesSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
          Free Courses This Week
        </h2>
        <Link
          href={AppRoutes.courses}
          className="flex items-center gap-1 text-xs font-bold text-brand-green-light hover:underline sm:text-sm"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
        {HOME_FEATURED_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} compact />
        ))}
      </div>
    </div>
  );
}
