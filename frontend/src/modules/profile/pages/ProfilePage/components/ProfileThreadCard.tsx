import Link from "next/link";
import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { AppRoutes } from "@/routes/app.routes";
import type { Thread } from "@/types";
import { FORUM_CATEGORIES } from "@/utils/constants";
import { formatRelativeTime } from "@/utils";
import { PROFILE_PAGE_COPY } from "../profilePage.content";

interface ProfileThreadCardProps {
  thread: Thread;
}

function getCategoryLabel(categoryId: string): string {
  const match = FORUM_CATEGORIES.find((cat) => cat.id === categoryId);
  return match?.name ?? categoryId;
}

function getCategoryBadgeClass(categoryId: string): string {
  if (categoryId === "technology" || categoryId === "engineering") {
    return "bg-secondary-container text-on-secondary-container";
  }
  return "bg-primary-fixed text-on-primary-fixed-variant";
}

export function ProfileThreadCard({ thread }: ProfileThreadCardProps) {
  const excerpt = thread.body?.trim() ?? "";
  const categoryLabel = getCategoryLabel(thread.categoryId);

  return (
    <Link
      href={AppRoutes.forumDetail(thread.id)}
      className="group block rounded-xl border border-border-low-contrast p-4 transition-colors hover:bg-surface-container-low"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span
            className={`rounded-full px-2 py-0.5 font-label-pill text-label-pill ${getCategoryBadgeClass(thread.categoryId)}`}
          >
            {categoryLabel}
          </span>
          <h3 className="mt-2 font-headline-md text-headline-md text-on-surface transition-colors group-hover:text-primary">
            {thread.title}
          </h3>
          {excerpt && (
            <p className="mt-1 line-clamp-2 font-body-sm text-on-surface-variant">
              {excerpt}
            </p>
          )}
        </div>
        <span className="whitespace-nowrap font-body-sm text-on-surface-variant">
          {formatRelativeTime(thread.createdAt)}
        </span>
      </div>

      <div className="mt-4 flex gap-6 text-on-surface-variant">
        <span className="flex items-center gap-1 font-body-sm">
          <MaterialIcon name="forum" className="text-[18px]" />
          {thread.replyCount}
        </span>
        <span className="flex items-center gap-1 font-body-sm">
          <MaterialIcon name="favorite" className="text-[18px]" />
          {thread.likeCount}
        </span>
        <span className="flex items-center gap-1 font-body-sm">
          <MaterialIcon name="share" className="text-[18px]" />
          {PROFILE_PAGE_COPY.share}
        </span>
      </div>
    </Link>
  );
}
