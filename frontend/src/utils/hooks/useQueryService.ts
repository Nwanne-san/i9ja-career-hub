"use client";

import { QueryKey, useQuery } from "@tanstack/react-query";
import client from "../client";
import { delayPromise } from "../helper";

export function useQueryService<Req extends object, Resp extends object>(
  props: UseQueryServiceProps<Req, Resp>
) {
  const { service, options } = props;
  const {
    keys = [],
    mockData,
    enableMockFallback = false,
    isDownload,
    isPdf,
    fileName,
    staleTime = 60_000,
    ...rest
  } = options || {};

  return useQuery<Resp, Error, Resp, QueryKey>({
    staleTime,
    refetchOnWindowFocus: true,
    ...rest,
    queryKey: [...keys, service],
    queryFn: async () => {
      try {
        const result = await client.request<Req, Resp>({
          ...service,
          path: service.path,
          method: service.method,
          data: service.data,
          options: { isDownload, isPdf, fileName },
        });
        if (typeof result === "string") {
          throw new Error("Unexpected string response");
        }
        return result as Resp;
      } catch (error) {
        if (enableMockFallback && mockData !== undefined) {
          await delayPromise(300);
          return mockData;
        }
        throw error;
      }
    },
  });
}
