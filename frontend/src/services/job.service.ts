import { ApiMethods } from "@/utils/client";

const jobRoot = "/jobs";

export const jobServices = {
  getAll: { path: jobRoot, method: ApiMethods.GET },
  getById: (id: string) => ({
    path: `${jobRoot}/${id}`,
    method: ApiMethods.GET,
  }),
  create: { path: jobRoot, method: ApiMethods.POST },
  update: (id: string) => ({
    path: `${jobRoot}/${id}`,
    method: ApiMethods.PUT,
  }),
  delete: (id: string) => ({
    path: `${jobRoot}/${id}`,
    method: ApiMethods.DELETE,
  }),
  search: { path: `${jobRoot}/search`, method: ApiMethods.GET },
  apply: (jobId: string) => ({
    path: `${jobRoot}/${jobId}/apply`,
    method: ApiMethods.POST,
  }),
  getSaved: { path: `${jobRoot}/saved`, method: ApiMethods.GET },
  saveJob: (jobId: string) => ({
    path: `${jobRoot}/${jobId}/save`,
    method: ApiMethods.POST,
  }),
  unsaveJob: (jobId: string) => ({
    path: `${jobRoot}/${jobId}/save`,
    method: ApiMethods.DELETE,
  }),
};
