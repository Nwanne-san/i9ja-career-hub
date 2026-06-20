"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import Button from "@/modules/shared/component/Button";
import { DataRenderer } from "@/modules/shared/component/DataRenderer";
import useFilter from "@/utils/hooks/useFilter";
import { useThreadsQuery } from "@/services/queryService";
import { AppRoutes } from "@/routes/app.routes";
import type { RootState } from "@/redux/store";
import type { Thread } from "@/types";
import { FORUMS_PAGE_COPY } from "./forumsPage.content";
import { ForumsEmptyState } from "./components/ForumsEmptyState";
import { ForumsFilters } from "./components/ForumsFilters";
import { ForumsListingCard } from "./components/ForumsListingCard";
import { ForumsSkeleton } from "./components/ForumsSkeleton";

export function ForumsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { filters, applyFilters } = useFilter({
    category: categoryParam && categoryParam !== "all" ? categoryParam : "all",
  });

  useEffect(() => {
    if (categoryParam && categoryParam !== filters.category) {
      applyFilters({ category: categoryParam });
    }
  }, [categoryParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const queryParams = useMemo(
    () => ({
      category: filters.category === "all" ? undefined : String(filters.category),
    }),
    [filters.category]
  );

  const { data: threads = [], isLoading, isError, refetch } = useThreadsQuery(queryParams);

  const filteredThreads = useMemo(() => {
    if (filters.category === "all") return threads;
    return threads.filter((t: Thread) => t.categoryId === filters.category);
  }, [threads, filters.category]);

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-gutter pb-section-padding pt-24">
        <div className="mb-8 rounded-2xl bg-primary-container p-6 text-on-primary-container sm:p-8">
          <h1 className="mb-2 font-headline-lg text-headline-lg">
            {FORUMS_PAGE_COPY.title}
          </h1>
          <p className="mb-4 opacity-90">{FORUMS_PAGE_COPY.subtitle}</p>
          {isAuthenticated ? (
            <Button href={AppRoutes.forumsNew}>{FORUMS_PAGE_COPY.createCta}</Button>
          ) : (
            <Button href={AppRoutes.auth}>{FORUMS_PAGE_COPY.signInCta}</Button>
          )}
        </div>

        <ForumsFilters
          selectedCategory={String(filters.category)}
          onSelectCategory={(cat) => applyFilters({ category: cat })}
        />

        <DataRenderer<Thread[]>
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && filteredThreads.length === 0}
          data={filteredThreads}
          errorTitle={FORUMS_PAGE_COPY.errorTitle}
          errorSubTitle={FORUMS_PAGE_COPY.errorDescription}
          onRetry={() => refetch()}
          renderLoading={<ForumsSkeleton />}
          renderEmpty={<ForumsEmptyState onClear={() => applyFilters({ category: "all" })} />}
        >
          {() => (
            <div className="space-y-4">
              {filteredThreads.map((thread) => (
                <ForumsListingCard key={thread.id} thread={thread} />
              ))}
            </div>
          )}
        </DataRenderer>
      </main>
    </SiteShell>
  );
}
