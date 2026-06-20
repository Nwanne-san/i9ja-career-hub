"use client";

import { Popover } from "@mui/material";

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface FilterPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  options: FilterOption[];
  onSelect: (value: string) => void;
  width?: number;
}

export default function FilterPopover({
  open,
  anchorEl,
  onClose,
  options,
  onSelect,
  width = 200,
}: FilterPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: {
          className:
            "mt-1 rounded-xl border border-border-low-contrast bg-surface-container-high shadow-lg",
          style: { width },
        },
      }}
    >
      <ul className="py-1">
        {options.map((opt) => (
          <li key={opt.value}>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container"
              onClick={() => {
                onSelect(opt.value);
                onClose();
              }}
            >
              {opt.icon}
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </Popover>
  );
}
