import { ApiMethods } from "@/utils/client";

const notificationRoot = "/notifications";

export const notificationServices = {
  getAll: { path: notificationRoot, method: ApiMethods.GET },
  markAsRead: (id: string) => ({
    path: `${notificationRoot}/${id}/read`,
    method: ApiMethods.PUT,
  }),
  markAllAsRead: {
    path: `${notificationRoot}/read-all`,
    method: ApiMethods.PUT,
  },
  delete: (id: string) => ({
    path: `${notificationRoot}/${id}`,
    method: ApiMethods.DELETE,
  }),
  getPreferences: {
    path: `${notificationRoot}/preferences`,
    method: ApiMethods.GET,
  },
  updatePreferences: {
    path: `${notificationRoot}/preferences`,
    method: ApiMethods.PUT,
  },
};
