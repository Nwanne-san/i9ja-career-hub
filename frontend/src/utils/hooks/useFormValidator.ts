"use client";

import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny } from "zod";

export interface UseFormValidatorProps<T extends FieldValues> {
  validationSchema: ZodTypeAny;
  defaultValues?: DefaultValues<T>;
}

export function useFormValidator<T extends FieldValues>({
  validationSchema,
  defaultValues,
}: UseFormValidatorProps<T>) {
  return useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(validationSchema as any),
    defaultValues,
    mode: "onBlur",
  });
}
