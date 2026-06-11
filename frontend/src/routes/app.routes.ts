export const AppRoutes = {
  home: "/",
  forums: "/forums",
  forumsNew: "/forums/new",
  forumDetail: (id: string) => `/forums/${id}`,
  jobs: "/jobs",
  jobDetail: (id: string) => `/jobs/${id}`,
  courses: "/courses",
  courseDetail: (id: string) => `/courses/${id}`,
  about: "/about",
  profile: "/profile",
  profileEdit: "/profile/edit",
  guidelines: "/guidelines",
  report: "/report",
  terms: "/terms",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
  dmca: "/dmca",
  login: "/login",
  register: "/register",
  search: "/search",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
