"use client";

import Link from "next/link";
import type { Thread } from "@/types";
import { AppRoutes } from "@/routes/app.routes";

export function ForumsListingCard({ thread }: { thread: Thread }) {
  return (
    <Link
      href={AppRoutes.forumDetail(thread.id)}
      className="group block rounded-lg border border-border-low-contrast bg-bg-card p-4 transition-all hover:shadow-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-3 rounded-lg border border-border-low-contrast bg-bg-card px-3 py-2 sm:min-w-[60px] sm:flex-col">
          <span className="text-xs text-on-surface-variant">Votes</span>
          <span className="text-sm font-bold text-primary">
            {thread.likeCount || 0}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 font-semibold text-on-surface transition-colors group-hover:text-primary">
            {thread.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-on-surface-variant">
            {thread.body?.substring(0, 100)}...
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
            <span>
              <span className="font-medium">{thread.replyCount || 0}</span> replies
            </span>
            <span>
              <span className="font-medium">{thread.viewCount || 0}</span> views
            </span>
            <span className="rounded bg-primary px-2 py-1 font-medium text-on-primary">
              {thread.categoryId}
            </span>
          </div>
        </div>
        <div className="hidden text-right text-xs text-on-surface-variant sm:block">
          <p className="font-medium">{thread.author?.displayName}</p>
          <p>{new Date(thread.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
}
