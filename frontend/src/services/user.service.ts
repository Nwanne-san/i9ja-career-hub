import { ApiMethods } from "@/utils/client";

export const userServices = {
  getProfile: (username?: string) => ({
    path: username ? `/users/${username}` : "/users/profile",
    method: ApiMethods.GET,
  }),
  updateProfile: { path: "/users/profile", method: ApiMethods.PUT },
  search: { path: "/users/search", method: ApiMethods.GET },
  follow: (userId: string) => ({
    path: `/users/${userId}/follow`,
    method: ApiMethods.POST,
  }),
  unfollow: (userId: string) => ({
    path: `/users/${userId}/follow`,
    method: ApiMethods.DELETE,
  }),
};
