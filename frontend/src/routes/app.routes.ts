export const AppRoutes = {
  home: "/",
  forums: "/forums",
  forumsNew: "/forums/new",
  jobs: "/jobs",
  courses: "/courses",
  about: "/about",
  profile: "/profile",
  profileEdit: "/profile/edit",
  guidelines: "/guidelines",
  report: "/report",
  terms: "/terms",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
  dmca: "/dmca",
  authLogin: "/?auth=login",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
