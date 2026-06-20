"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

export interface DropdownOption<T extends string = string> {
  label: string;
  value: T;
}

export interface DropdownProps<T extends string = string> {
  label?: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  disabled?: boolean;
}

export default function Dropdown<T extends string = string>({
  label,
  value,
  options,
  onChange,
  className,
  disabled,
}: DropdownProps<T>) {
  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value as T);
  };

  return (
    <FormControl fullWidth size="small" className={className} disabled={disabled}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
