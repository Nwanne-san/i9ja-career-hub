import { ApiMethods } from "@/utils/client";

const uploadRoot = "/upload";

export const uploadServices = {
  uploadImage: { path: `${uploadRoot}/image`, method: ApiMethods.POST },
  uploadImages: { path: `${uploadRoot}/images`, method: ApiMethods.POST },
  deleteImage: { path: `${uploadRoot}/image`, method: ApiMethods.DELETE },
  uploadFile: { path: `${uploadRoot}/file`, method: ApiMethods.POST },
};
