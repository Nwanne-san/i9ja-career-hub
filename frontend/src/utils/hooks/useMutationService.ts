"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import client, { ApiMethods } from "../client";
import { useAppDispatch } from "@/redux/store/hooks";
import { success as toastSuccess, error as toastError } from "@/utils/toast";

type ServiceConfig<Req> =
  | {
      path: string;
      method?: ApiMethods;
      headers?: Record<string, string>;
      data?: Record<string, unknown>;
    }
  | ((variables: Req) => {
      path: string;
      method?: ApiMethods;
      headers?: Record<string, string>;
      data?: Record<string, unknown>;
    });

export interface UseMutationServiceOptions<Req, Resp> {
  keys?: string[];
  invalidateKeys?: string[];
  successMessage?: string | ((response: Resp) => string);
  errorTitle?: string;
  redirectTo?: string;
  isFormData?: boolean;
  isOnlyPhotoUpload?: boolean;
  onSuccess?: (
    response: Resp,
    variables: Req,
    queryClient: ReturnType<typeof useQueryClient>
  ) => void;
  onError?: (error: unknown) => void;
}

export interface UseMutationServiceProps<Req extends object | string, Resp = unknown> {
  service: ServiceConfig<Req>;
  options?: UseMutationServiceOptions<Req, Resp>;
}

export function useMutationService<Req extends object | string, Resp = unknown>(
  props: UseMutationServiceProps<Req, Resp>
) {
  const { options = {} } = props;
  const {
    keys = [],
    invalidateKeys,
    successMessage,
    errorTitle,
    redirectTo,
    isFormData,
    isOnlyPhotoUpload = false,
    onSuccess,
    onError,
    ...rest
  } = options;

  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<Resp, unknown, Req>({
    ...rest,
    mutationKey: [...keys, props.service],
    mutationFn: async (data: Req) => {
      const resolved =
        typeof props.service === "function"
          ? props.service(data)
          : props.service;

      const { data: requestBody, ...serviceConfig } = resolved as typeof resolved & {
        data?: Req extends string ? never : Req;
      };

      const payload =
        requestBody !== undefined
          ? requestBody
          : typeof data === "string"
            ? undefined
            : data;

      return client.request({
        ...serviceConfig,
        method: resolved.method ?? ApiMethods.POST,
        data: payload as object | undefined,
        options: { isFormData },
      });
    },
    onSuccess: async (response, variables) => {
      onSuccess?.(response, variables, queryClient);

      if (invalidateKeys?.length) {
        invalidateKeys.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key] })
        );
      }

      if (!isOnlyPhotoUpload && successMessage) {
        const message =
          typeof successMessage === "function"
            ? successMessage(response)
            : successMessage;
        toastSuccess(message);
      }

      if (redirectTo) {
        router.replace(redirectTo);
      }

      void dispatch;
    },
    onError: (error) => {
      onError?.(error);
      const message =
        (error as { message?: string })?.message ?? "Something went wrong.";
      toastError(errorTitle ? `${errorTitle}: ${message}` : message);
    },
  });
}
