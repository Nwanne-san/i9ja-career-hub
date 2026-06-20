const ALLOWED_PATH_PREFIXES = [
  "/forums",
  "/jobs",
  "/courses",
  "/profile",
  "/u/",
  "/search",
  "/auth",
] as const;

/** Allow only same-app relative paths for notification and redirect links. */
export function getSafeAppHref(href: string | undefined | null): string {
  if (!href) return "#";

  const trimmed = href.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return "#";

  const path = trimmed.split(/[?#]/)[0];
  const allowed = ALLOWED_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix)
  );

  return allowed ? trimmed : "#";
}
