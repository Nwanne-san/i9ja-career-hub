export const COURSES_PAGE_COPY = {
  title: "Free Courses",
  subtitle:
    "High-quality educational resources tailored for the Nigerian tech ecosystem. Signal-over-noise learning.",
  loadMore: "Load More Courses",
  emptyTitle: "No courses in this category yet",
  emptyDescription:
    "We add new free courses every week. Try another category or check back soon.",
  emptyAction: "View all courses",
} as const;

export const COURSES_CATEGORIES = [
  "All Category",
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Data Science",
  "Product Management",
  "Branding",
  "Animation",
] as const;

export const COURSES_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export const COURSES_SPONSORED_AD = {
  label: "Sponsored",
  title: "Boost your career with i9 Premium Mentorship",
  description:
    "Get 1-on-1 sessions with industry experts from top Nigerian startups.",
  cta: "Learn More",
} as const;

export const COURSES_PER_PAGE = 6;

export const COURSE_CATEGORY_BADGE: Record<string, string> = {
  "UI/UX Design": "bg-secondary-container text-on-secondary-container",
  "Graphic Design": "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  "Web Development": "bg-secondary-fixed text-on-secondary-fixed-variant",
  Branding: "bg-primary-fixed text-on-primary-fixed-variant",
  Animation: "bg-surface-variant text-on-surface-variant",
  "Data Science": "bg-surface-variant text-on-surface-variant",
  "Product Management": "bg-surface-variant text-on-surface-variant",
};
