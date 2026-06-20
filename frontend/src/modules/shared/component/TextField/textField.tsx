"use client";

import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { cn } from "@/utils";

export interface I9jaTextFieldProps extends Omit<MuiTextFieldProps, "variant"> {
  errorMessage?: string;
  labelOnTop?: boolean;
}

export default function TextField({
  errorMessage,
  labelOnTop = true,
  className,
  ...props
}: I9jaTextFieldProps) {
  return (
    <div className={cn("w-full", className)}>
      <MuiTextField
        fullWidth
        variant="outlined"
        size="small"
        {...props}
        error={Boolean(errorMessage) || props.error}
        helperText={errorMessage || props.helperText}
        slotProps={{
          inputLabel: { shrink: labelOnTop ? true : undefined },
        }}
      />
    </div>
  );
}
