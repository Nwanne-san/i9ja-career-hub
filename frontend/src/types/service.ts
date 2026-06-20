import { ClientRequestConfig } from "@/utils/client";

export enum ApiMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

declare global {
  interface ServiceInterface<Req extends object, Resp>
    extends Omit<ClientRequestConfig<Req>, "responseType"> {
    transform?: (req: Req, resp: Resp) => Resp;
  }
}

export {};
