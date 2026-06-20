"use client";

import EmptyState from "@/modules/shared/component/EmptyState";
import { COURSES_PAGE_COPY } from "../coursesPage.content";

interface CoursesEmptyStateProps {
  onReset?: () => void;
}

export function CoursesEmptyState({ onReset }: CoursesEmptyStateProps) {
  return (
    <EmptyState
      icon="school"
      title={COURSES_PAGE_COPY.emptyTitle}
      description={COURSES_PAGE_COPY.emptyDescription}
      actionLabel={COURSES_PAGE_COPY.emptyAction}
      onAction={onReset}
    />
  );
}
