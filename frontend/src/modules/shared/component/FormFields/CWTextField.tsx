"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import TextField, { type I9jaTextFieldProps } from "../TextField/textField";

export interface CWTextFieldProps<T extends FieldValues>
  extends Omit<I9jaTextFieldProps, "name"> {
  name: FieldPath<T>;
  control: Control<T>;
}

export function CWTextField<T extends FieldValues>({
  name,
  control,
  ...props
}: CWTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}
