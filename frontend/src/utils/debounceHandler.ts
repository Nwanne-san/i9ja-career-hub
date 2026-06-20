import { useEffect, useState } from "react";

let timeoutId: ReturnType<typeof setTimeout>;

export function debounceHandler(func: () => void, delay?: number) {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
