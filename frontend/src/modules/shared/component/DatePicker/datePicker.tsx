"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/utils";
import MaterialIcon from "@/modules/shared/component/MaterialIcon";

export interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  errorText?: string;
  className?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  errorText,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm text-on-surface-variant">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-border-low-contrast bg-surface-container-low px-3 py-2 text-left text-on-surface"
      >
        <span>
          {value ? value.toLocaleDateString() : "Select date"}
        </span>
        <MaterialIcon name="calendar_today" className="text-on-surface-variant" />
      </button>
      {errorText && (
        <p className="mt-1 text-xs text-error">{errorText}</p>
      )}
      {open && (
        <div className="absolute z-20 mt-1 rounded-xl border border-border-low-contrast bg-surface-container-high p-2 shadow-lg [&_.react-calendar]:border-0 [&_.react-calendar]:bg-transparent [&_.react-calendar__tile--active]:bg-primary [&_.react-calendar__tile--active]:text-on-primary">
          <Calendar
            value={value}
            onChange={(d) => {
              onChange(d as Date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
