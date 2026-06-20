import Link from "next/link";
import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { AppRoutes } from "@/routes/app.routes";
import type { User } from "@/types";
import { formatJoinedDate } from "@/utils";
import { PROFILE_PAGE_COPY } from "../profilePage.content";

interface ProfileHeaderCardProps {
  user: User;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function isImageUrl(value?: string): boolean {
  if (!value) return false;
  return value.startsWith("http") || value.startsWith("/");
}

export function ProfileHeaderCard({ user }: ProfileHeaderCardProps) {
  const joinedLabel = formatJoinedDate(user.joinedAt);
  const websiteUrl = user.website?.trim();
  const websiteDisplay = websiteUrl
    ? websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "";

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-low-contrast bg-surface-container-lowest p-8">
      <div className="absolute left-0 top-0 -z-0 h-32 w-full bg-gradient-to-r from-primary/10 to-secondary/10" />

      <div className="relative z-10 mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end">
        <div className="group relative">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-surface-container-lowest shadow-md">
            {isImageUrl(user.avatarUrl) ? (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-container text-3xl font-bold text-on-primary-container">
                {user.avatarUrl || getInitials(user.displayName)}
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label={PROFILE_PAGE_COPY.changePhoto}
            className="absolute bottom-1 right-1 rounded-full bg-primary p-2 text-on-primary shadow-lg transition-transform active:scale-95"
          >
            <MaterialIcon name="photo_camera" className="text-[18px]" />
          </button>
        </div>

        <div className="min-w-0 flex-grow">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface md:text-headline-lg">
                {user.displayName}
              </h1>
              <p className="font-body-lg text-on-surface-variant">@{user.username}</p>
            </div>
            <Link
              href={AppRoutes.profileEdit}
              className="rounded-full border border-primary px-6 py-2.5 font-label-bold text-primary transition-colors hover:bg-primary/5 active:scale-95"
            >
              {PROFILE_PAGE_COPY.editProfile}
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 font-body-sm text-on-surface-variant">
            {user.location && (
              <span className="flex items-center gap-1">
                <MaterialIcon name="location_on" className="text-[18px]" />
                {user.location}
              </span>
            )}
            {joinedLabel && (
              <span className="flex items-center gap-1">
                <MaterialIcon name="calendar_today" className="text-[18px]" />
                {joinedLabel}
              </span>
            )}
            {websiteUrl && (
              <span className="flex items-center gap-1">
                <MaterialIcon name="link" className="text-[18px]" />
                <a
                  href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {websiteDisplay}
                </a>
              </span>
            )}
          </div>
        </div>
      </div>

      {user.bio && (
        <div className="relative z-10 mt-8 md:ml-[152px]">
          <p className="max-w-2xl font-body-lg leading-relaxed text-on-surface">
            {user.bio}
          </p>
        </div>
      )}
    </div>
  );
}
