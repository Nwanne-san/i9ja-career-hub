import Cookies from "js-cookie";
import axios from "axios";
import { AUTH_COOKIE_NAME } from "@/utils/constants";
import type { User } from "@/types";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  expires: 7,
};

export function setAuthCookie(token: string) {
  Cookies.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
}

export function clearAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME);
}

export function getAuthCookie(): string | undefined {
  return Cookies.get(AUTH_COOKIE_NAME);
}

/** Minimum length check until backend JWT validation exists. */
export function isValidAuthToken(token: string | undefined | null): boolean {
  return Boolean(token && token.trim().length >= 8);
}

export function isAuthResponse(
  data: unknown
): data is { accessToken: string; user: User } {
  if (!data || typeof data !== "object") return false;
  const record = data as Record<string, unknown>;
  return (
    typeof record.accessToken === "string" &&
    record.accessToken.length > 0 &&
    typeof record.user === "object" &&
    record.user !== null
  );
}

/** Mock session used when the API is unreachable (no backend yet). */
export function createMockAuthSession(
  email: string,
  displayName?: string
): { accessToken: string; user: User } {
  const slug = email
    .split("@")[0]
    .replace(/[^a-z0-9_]/gi, "_")
    .toLowerCase();
  const id = `mock-${slug}`;

  return {
    accessToken: `mock-token-${id}-${Date.now()}`,
    user: {
      id,
      username: slug,
      displayName: displayName ?? slug.replace(/_/g, " "),
      email,
      avatarUrl: "👤",
      bio: "",
      location: "Lagos, Nigeria",
      verified: false,
      reputation: 0,
      threadCount: 0,
      replyCount: 0,
      savedJobsCount: 0,
    },
  };
}

export function getSafeReturnUrl(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}

/** Use mock auth when the API is down or not deployed yet — not for 401/403. */
export function shouldUseMockAuth(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return true;
  if (!error.response) return true;

  const status = error.response.status;
  return status === 404 || status >= 502;
}
