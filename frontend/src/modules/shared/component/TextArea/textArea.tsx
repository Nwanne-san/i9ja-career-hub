"use client";

import { TextareaAutosize } from "@mui/material";
import { cn } from "@/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

export default function TextArea({
  label,
  errorMessage,
  className,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm text-on-surface-variant">
          {label}
        </label>
      )}
      <TextareaAutosize
        className={cn(
          "w-full min-h-[100px] resize-y rounded-xl border border-border-low-contrast bg-surface-container-low px-3 py-2 text-on-surface outline-none focus:border-primary",
          errorMessage && "border-error",
          className
        )}
        {...props}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-error">{errorMessage}</p>
      )}
    </div>
  );
}
