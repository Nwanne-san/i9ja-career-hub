import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

declare global {
  interface PaginationData {
    count?: number;
    delta?: number;
    pos?: number;
    search?: string;
  }

  type PageParams = Omit<PaginationData, "count">;

  interface UseQueryServiceProps<Req, Resp> {
    service: ServiceInterface<Req, Resp>;
    options?: Omit<
      UseQueryOptions<Resp, Error, Resp, QueryKey>,
      "queryKey" | "queryFn"
    > & {
      keys?: string[] | Array<string | number | unknown>;
      mockData?: Resp;
      enableMockFallback?: boolean;
      isDownload?: boolean;
      isPdf?: boolean;
      fileName?: string;
    };
  }

  interface UseMutationServiceProps<Req, Resp> {
    service: ServiceInterface<Req, Resp>;
    options?: Omit<
      UseMutationOptions<Resp, Error, Req>,
      "mutationKey" | "mutationFn"
    > & {
      keys?: string[];
      invalidateKeys?: string[];
      successMessage?: string | ((response: Resp) => string);
      errorTitle?: string;
      redirectTo?: string;
      isFormData?: boolean;
      isOnlyPhotoUpload?: boolean;
    };
  }

  interface UseInfinityQueryServiceProps<Req, Resp> {
    service: ServiceInterface<Req, Resp>;
    options?: Omit<
      UndefinedInitialDataInfiniteOptions<
        Resp,
        Error,
        InfiniteData<Resp, PageParams>,
        QueryKey,
        PageParams
      >,
      | "queryKey"
      | "queryFn"
      | "initialPageParam"
      | "getNextPageParam"
      | "getPreviousPageParam"
    > & {
      keys?: string[];
      mockData?: Resp;
      enableMockFallback?: boolean;
    };
  }
}

export {};
