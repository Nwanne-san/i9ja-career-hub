"use client";

import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import client from "../client";
import { delayPromise } from "../helper";

const DEFAULT_PAGE_LIMIT = 15;

interface PaginatedResponse {
  pagination?: PaginationData;
  data?: unknown[];
  notifications?: unknown[];
}

export function useInfiniteQueryService<
  Req extends Omit<Partial<PaginationData>, "count"> | undefined | null,
  Resp extends PaginatedResponse,
>(props: UseInfinityQueryServiceProps<Req, Resp>) {
  const {
    service: { data: serviceData, ...service },
    options: queryOptions,
  } = props;

  const payload = serviceData || ({} as PageParams);
  const {
    keys = [],
    mockData,
    enableMockFallback = false,
    ...rest
  } = queryOptions || {};

  const initialPageParam: PageParams = {
    pos: payload.pos || 0,
    delta: payload.delta ?? DEFAULT_PAGE_LIMIT,
  };

  return useInfiniteQuery<
    Resp,
    Error,
    InfiniteData<Resp, PageParams>,
    QueryKey,
    PageParams
  >({
    initialPageParam,
    ...rest,
    queryKey: [...keys, service],
    queryFn: async ({ pageParam }) => {
      try {
        return await client.request<Req & PageParams, Resp>({
          ...service,
          data: { ...payload, ...pageParam } as Req & PageParams,
        });
      } catch (error) {
        if (enableMockFallback && mockData !== undefined) {
          await delayPromise(300);
          return mockData;
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage: Resp) => {
      const delta =
        payload.delta || initialPageParam.delta || DEFAULT_PAGE_LIMIT;
      const lastPos = lastPage.pagination?.pos || 0;
      const nextPos = lastPos + delta;
      const total = lastPage.pagination?.count ?? Infinity;
      return nextPos >= total ? undefined : { pos: nextPos, delta };
    },
    getPreviousPageParam: (previousPage: Resp) => {
      const delta =
        payload.delta || initialPageParam.delta || DEFAULT_PAGE_LIMIT;
      const lastPos = previousPage.pagination?.pos || 0;
      const prevPos = lastPos - delta;
      return { pos: prevPos > 0 ? prevPos : 0, delta };
    },
  });
}
