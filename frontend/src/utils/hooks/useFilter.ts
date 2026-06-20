"use client";

import { useState, useCallback } from "react";

interface FilterState {
  [key: string]: unknown;
}

export default function useFilter(defaultFilters: FilterState = {}) {
  const [filters, setFilters] = useState(defaultFilters);

  const clearFilters = useCallback(
    (params?: FilterState | string[]) => {
      if (params && Array.isArray(params) && params.length) {
        setFilters((prev) => {
          const copied = { ...prev };
          params.forEach((param) => delete copied[param]);
          return copied;
        });
        return;
      }
      setFilters({});
    },
    []
  );

  const applyFilters = useCallback((params: FilterState) => {
    setFilters((prev) => {
      const copiedParams = { ...prev, ...params };
      Object.keys(copiedParams).forEach((key) => {
        if (typeof copiedParams[key] === "string") {
          const trimmed = (copiedParams[key] as string).trim();
          if (!trimmed) delete copiedParams[key];
          else copiedParams[key] = trimmed;
        }
      });
      return copiedParams;
    });
  }, []);

  const setFilter = useCallback(
    (key: string, value: unknown) => {
      applyFilters({ [key]: value });
    },
    [applyFilters]
  );

  return { filters, applyFilters, clearFilters, setFilter };
}
