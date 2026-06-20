"use client";

import { useParams } from "next/navigation";
import { CourseDetailPage } from "@/modules/courses/pages/CourseDetailPage";

export default function Page() {
  const params = useParams();
  return <CourseDetailPage courseId={params.id as string} />;
}
