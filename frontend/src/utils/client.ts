import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { AUTH_COOKIE_NAME } from "@/utils/constants";
import { debounceHandler } from "./debounceHandler";
import { sessionEventEmitter } from "./eventEmitters";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.i9ja.com";

export enum ApiMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export interface ClientRequestConfig<Req> {
  path: string;
  method: ApiMethods;
  baseUrl?: string;
  headers?: Record<string, string>;
  responseType?: "json" | "blob";
  data?: Req;
  options?: {
    isDownload?: boolean;
    isPdf?: boolean;
    fileName?: string;
    isFormData?: boolean;
    isCsv?: boolean;
    isXlsx?: boolean;
  };
}

interface DefaultHeadersProps {
  Authorization?: string;
  Accept?: string;
  "Cache-Control"?: string;
  "Content-Type"?: string;
}

export interface ClientInstanceConfig<Resp extends object> {
  baseUrl?: string;
  transformResponse?: () => Resp;
}

export class Client<Response extends object> {
  http: AxiosInstance | null = null;

  constructor(config?: ClientInstanceConfig<Response>) {
    this.create(config);
  }

  async request<Req = unknown, Resp = unknown>(
    config: ClientRequestConfig<Req>
  ): Promise<Resp> {
    if (!this.http) {
      throw new Error("Client not initialized.");
    }

    const payloadFormat: Record<ApiMethods, "params" | "data"> = {
      [ApiMethods.GET]: "params",
      [ApiMethods.POST]: "data",
      [ApiMethods.PUT]: "data",
      [ApiMethods.PATCH]: "data",
      [ApiMethods.DELETE]: "data",
    };

    const defaultHeaders: DefaultHeadersProps = {
      Accept: "application/json",
      "Cache-Control": "no-cache",
    };

    const { options } = config || {};
    if (options?.isPdf) defaultHeaders["Content-Type"] = "application/pdf";
    if (options?.isFormData) delete defaultHeaders["Content-Type"];

    const response = await this.http.request({
      url: config.path,
      method: config.method,
      headers: { ...defaultHeaders, ...config.headers },
      baseURL: config.baseUrl || apiUrl,
      responseType: !options?.isDownload && !options?.isPdf ? "json" : "blob",
      [payloadFormat[config.method]]: config.data,
    });

    const data = response.data as Resp;
    if (typeof data === "object" && data !== null && isMockSentinel(data)) {
      throw new MockFallbackError();
    }
    return data;
  }

  create<Resp extends object = Response>(
    config?: ClientInstanceConfig<Resp>
  ) {
    this.http = axios.create({
      baseURL: config?.baseUrl || apiUrl,
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    this.http.interceptors.request.use((reqConfig) => {
      const token =
        store.getState().auth.accessToken ?? Cookies.get(AUTH_COOKIE_NAME);
      if (token) {
        reqConfig.headers = reqConfig.headers || {};
        reqConfig.headers.Authorization = `Bearer ${token}`;
      }
      return reqConfig;
    });

    this.http.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          debounceHandler(() => {
            sessionEventEmitter.emit("unauthorized", {});
          }, 300);
        }
        return Promise.reject(err);
      }
    );
  }
}

export class MockFallbackError extends Error {
  constructor() {
    super("MOCK_FALLBACK");
    this.name = "MockFallbackError";
  }
}

export function isMockSentinel(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    "fromMock" in value &&
    (value as Record<string, unknown>).success === false
  );
}

const client = new Client();
export default client;
