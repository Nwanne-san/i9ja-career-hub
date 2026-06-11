import type { CourseCardData } from "@/modules/shared/component/CourseCard";
import type { JobCardData } from "@/modules/shared/component/JobCard";
import type { ThreadCardData } from "@/modules/shared/component/ThreadCard";

export const HOME_TOP_AD_COPY =
  "Featured Platform Update: New Tech Mentorship Program Starting Soon!";

export const HOME_HERO = {
  trustLabel: "Trusted by 48,200+ Nigerian Professionals",
  title: "Your Nigerian hub for jobs, courses & community",
  searchPlaceholder: "Search jobs, skills, or threads...",
  ctaLabel: "Find Opportunities",
} as const;

export const HOME_STATS = [
  { label: "Members", value: "48k+" },
  { label: "Active Jobs", value: "3k+" },
  { label: "Free Courses", value: "820+" },
  { label: "Forum Posts", value: "92k+" },
] as const;

export const HOME_FEATURED_COURSES: CourseCardData[] = [
  {
    id: "1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIEGO62BzHqEJwtKGKm0ZY8ZcMZIbvKPlT4DCGM2nm1mPUaw9dq8SotFm_7w1G7pSoxpVLBL-m6BhXctjonjUlHB_cg6AKgz8m9GqzwatbG2fPY_2LkSZDI3IFh-RI-Is0XtlMpBobCirPHh3rNueP7uV6wm6RY7hGfzhYyAQwfCcPS01REoVOhn6l0IeumxELHjwpo-TbiOeWU1DuSX3uEwpCvpzKaIkRaT5et4IczpsbM9XEeRDoSSWkuvbcnCueh6CrnR9uJnI",
    category: "Design",
    categoryVariant: "accent",
    title: "UI/UX Fundamentals for Startups",
    description: "Free for 3 more days",
  },
  {
    id: "2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATEQn76Ol0QiSSvyst0YoPMh0rRmvP2EZcHQM9EokjBAkHiv2gMwSOkp5x_KkfA5_d72rZdrk9hWrUQ8SvYNljeP2BRcST-4Yb2N-AmepBHfp5touxEsH2Cy4i3U5GfTb0-v3BkxYFPCaJbpA92zp3uZG-vqjUbMhGUHThw2iYGfRhwVdz1gRwW9ddQrejhsYLW8eJDNSo6drpslA5rSmNA1-wAb1t1zAkOq7qp3xIHhwfp1mgyS_PhfUo9PKrn7mkFPciIHAlJbY",
    category: "Development",
    categoryVariant: "primary",
    title: "React for Nigerian Fintechs",
    description: "Instructor: Tunde James",
  },
  {
    id: "3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB50OgTrAqB4RZ3WSdvvLJZQhdVO4IhWueOR6SSWpp3FSv0dJm-w78lL4Y1DSwN5b0CXK12MN_SZaAorGIinFs93mJgwmcfaIwwclnENW2kyrVrHjOGpd7OWQot5LL8VARvW4Ygivqq3PzwBHMzPv_x2o7L8ItGwD5F2DzhiUAa1n2fYKfAK7fdX-fAnootrlLpx5NLnjDYYps9ptxYkIHbZF33Z7OWu83MfJIFw_rvdPOyYFl2S9NZ-YhBkjvq7DnvCyieZ6-qBAk",
    category: "Business",
    categoryVariant: "info",
    title: "Product Management 101",
    description: "2.4k Students Enrolled",
  },
];

export const HOME_FORUM_CATEGORIES = [
  { id: "career", label: "Career Advice" },
  { id: "tech", label: "Tech Stack" },
  { id: "money", label: "Money Talk" },
  { id: "rent", label: "Rent & Real Estate" },
] as const;

export const HOME_LATEST_JOBS: JobCardData[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Paystack",
    location: "Remote (Lagos)",
    verified: true,
    tags: ["Full-time", "₦1.2M - 1.8M /mo", "92% AI Match"],
  },
  {
    id: "2",
    title: "Product Designer (UI/UX)",
    company: "Moniepoint",
    location: "Victoria Island",
    verified: false,
    tags: ["On-site", "Contract", "85% AI Match"],
  },
];

export const HOME_TRENDING_THREADS: ThreadCardData[] = [
  {
    id: "1",
    title: "Is Japa really the only option for Tech in 2024?",
    preview:
      "I've been seeing a lot of mixed reviews lately. Some say remote local pay is catching up while...",
    comments: 142,
    likes: 89,
    time: "2h ago",
  },
  {
    id: "2",
    title: "Building an MVP with no budget in Nigeria",
    preview:
      "Sharing my journey of launching a logistics app using only open-source tools and free hosting...",
    comments: 67,
    likes: 152,
    time: "5h ago",
  },
];

export const HOME_PRO_PROMO = {
  title: "i9ja Pro",
  description: "Get priority job alerts and exclusive mentor sessions.",
  ctaLabel: "Learn More",
} as const;

export const HOME_BOTTOM_AD = {
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDoNOAI100HnPV-5e_zSiqE3CrU3YHbC5HZOpbVddA9nwZfCGzkwQbhgkiS0P5bzctHLzIvp1xMq5PvrFfgsrxSFqGx1lPGwfBlm5BwqDC6YWeNDvgp4OcA5myCUy33qwVwXj9h1SUT33gWUOli62N63nmjrD3ycUtUQ3FNCvsbRIwAG4R59ffFwZ0jAzRytUBh_LfCEONBNx5bJTQzhoBswJadTmD4Y7P3609xZZd4kUtVviPdRvkgcYo6xDonMylzQ8TL1NFoccI",
  title: "Simplify Your Business Finances",
  description: "Open a corporate account in 5 minutes. No hidden fees.",
} as const;
