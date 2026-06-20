"use client";

import Link from "next/link";
import SiteShell from "@/modules/shared/component/SiteShell";
import { mockThreads } from "@/utils/mockData";
import { AppRoutes } from "@/routes/app.routes";
import { ForumsListingCard } from "@/modules/forums/pages/ForumsPage/components/ForumsListingCard";

export function PublicProfilePage({ username }: { username: string }) {
  const threads = mockThreads.filter(
    (t) => t.author.username === username
  );
  const author = threads[0]?.author ?? {
    id: "unknown",
    username,
    displayName: username.replace(/_/g, " "),
    avatarUrl: "👤",
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-gutter pb-section-padding pt-24">
        <div className="mb-8 rounded-2xl border border-border-low-contrast bg-bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-2xl">
              {author.avatarUrl}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-on-surface">
                {author.displayName}
              </h1>
              <p className="text-primary">@{author.username}</p>
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-bold">Threads</h2>
        {threads.length > 0 ? (
          <div className="space-y-4">
            {threads.map((thread) => (
              <ForumsListingCard key={thread.id} thread={thread} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-on-surface-variant">
            No public threads yet.{" "}
            <Link href={AppRoutes.forums} className="text-primary">
              Browse forums
            </Link>
          </p>
        )}
      </main>
    </SiteShell>
  );
}
