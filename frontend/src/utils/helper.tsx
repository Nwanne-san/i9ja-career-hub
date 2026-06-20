import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildQuery(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function formatJobPostedAt(postedAt: string): string {
  if (!postedAt) return "";
  const relativePattern =
    /ago$|hour|day|week|month|minute|just now|yesterday/i;
  if (relativePattern.test(postedAt.trim())) {
    return postedAt;
  }
  const date = new Date(postedAt);
  if (Number.isNaN(date.getTime())) return postedAt;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function delayPromise(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatJoinedDate(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
}

export function formatRelativeTime(iso: string): string {
  if (!iso) return "";
  const relativePattern =
    /ago$|hour|day|week|month|minute|just now|yesterday/i;
  if (relativePattern.test(iso.trim())) {
    return iso;
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 5) return `${diffWeek}w ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
