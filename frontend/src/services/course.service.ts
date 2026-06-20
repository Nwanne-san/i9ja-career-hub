import { ApiMethods } from "@/utils/client";

const courseRoot = "/courses";

export const courseServices = {
  getAll: { path: courseRoot, method: ApiMethods.GET },
  getById: (id: string) => ({
    path: `${courseRoot}/${id}`,
    method: ApiMethods.GET,
  }),
  search: { path: `${courseRoot}/search`, method: ApiMethods.GET },
  enroll: (courseId: string) => ({
    path: `${courseRoot}/${courseId}/enroll`,
    method: ApiMethods.POST,
  }),
  getEnrolled: { path: `${courseRoot}/enrolled`, method: ApiMethods.GET },
  getProgress: (courseId: string) => ({
    path: `${courseRoot}/${courseId}/progress`,
    method: ApiMethods.GET,
  }),
  submitReview: (courseId: string) => ({
    path: `${courseRoot}/${courseId}/reviews`,
    method: ApiMethods.POST,
  }),
};
