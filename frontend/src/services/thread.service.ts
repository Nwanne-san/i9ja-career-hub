import { ApiMethods } from "@/utils/client";

const threadRoot = "/threads";

export const threadServices = {
  getAll: { path: threadRoot, method: ApiMethods.GET },
  getById: (id: string) => ({
    path: `${threadRoot}/${id}`,
    method: ApiMethods.GET,
  }),
  create: { path: threadRoot, method: ApiMethods.POST },
  update: (id: string) => ({
    path: `${threadRoot}/${id}`,
    method: ApiMethods.PUT,
  }),
  delete: (id: string) => ({
    path: `${threadRoot}/${id}`,
    method: ApiMethods.DELETE,
  }),
  getByCategory: (categoryId: string) => ({
    path: `${threadRoot}/category/${categoryId}`,
    method: ApiMethods.GET,
  }),
  search: { path: `${threadRoot}/search`, method: ApiMethods.GET },
  upvote: (threadId: string) => ({
    path: `${threadRoot}/${threadId}/upvote`,
    method: ApiMethods.POST,
  }),
  downvote: (threadId: string) => ({
    path: `${threadRoot}/${threadId}/downvote`,
    method: ApiMethods.POST,
  }),
};

export const replyServices = {
  getByThread: (threadId: string) => ({
    path: `${threadRoot}/${threadId}/replies`,
    method: ApiMethods.GET,
  }),
  create: (threadId: string) => ({
    path: `${threadRoot}/${threadId}/replies`,
    method: ApiMethods.POST,
  }),
};
