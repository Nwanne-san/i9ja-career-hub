import { ApiMethods } from "@/utils/client";

const authRoot = "/auth";

export const authServices = {
  login: { path: `${authRoot}/login`, method: ApiMethods.POST },
  register: { path: `${authRoot}/register`, method: ApiMethods.POST },
  verify: { path: `${authRoot}/verify-email`, method: ApiMethods.POST },
  resetPassword: { path: `${authRoot}/reset-password`, method: ApiMethods.POST },
  updatePassword: { path: `${authRoot}/update-password`, method: ApiMethods.POST },
  getCurrentUser: { path: `${authRoot}/me`, method: ApiMethods.GET },
};
