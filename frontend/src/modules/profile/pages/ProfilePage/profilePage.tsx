"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import type { RootState } from "@/redux/store";
import type { User } from "@/types";
import { mockJobs, mockThreads } from "@/utils/mockData";
import { ProfileEmptyTab } from "./components/ProfileEmptyTab";
import { ProfileHeaderCard } from "./components/ProfileHeaderCard";
import { ProfileSavedJobCard } from "./components/ProfileSavedJobCard";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ProfileStatsRow } from "./components/ProfileStatsRow";
import { ProfileTabs } from "./components/ProfileTabs";
import { ProfileThreadCard } from "./components/ProfileThreadCard";
import {
  PROFILE_PAGE_COPY,
  PROFILE_THREADS_PAGE_SIZE,
  type ProfileTabId,
} from "./profilePage.content";

interface ProfilePageViewProps {
  user: User;
}

export function ProfilePageView({ user }: ProfilePageViewProps) {
  const savedJobIds = useSelector(
    (state: RootState) => state.jobs.savedJobs
  );
  const [activeTab, setActiveTab] = useState<ProfileTabId>("threads");
  const [visibleThreadCount, setVisibleThreadCount] = useState(
    PROFILE_THREADS_PAGE_SIZE
  );

  const userThreads = useMemo(
    () => mockThreads.filter((thread) => thread.author.username === user.username),
    [user.username]
  );

  const savedJobs = useMemo(
    () => mockJobs.filter((job) => savedJobIds.includes(job.id)),
    [savedJobIds]
  );

  const visibleThreads = userThreads.slice(0, visibleThreadCount);
  const hasMoreThreads = visibleThreadCount < userThreads.length;

  const savedJobsCount = user.savedJobsCount ?? savedJobs.length;

  const handleTabChange = (tab: ProfileTabId) => {
    setActiveTab(tab);
    if (tab === "threads") {
      setVisibleThreadCount(PROFILE_THREADS_PAGE_SIZE);
    }
  };

  const renderTabContent = () => {
    if (activeTab === "threads") {
      if (userThreads.length === 0) {
        return <ProfileEmptyTab tab="threads" />;
      }

      return (
        <>
          <div className="space-y-4">
            {visibleThreads.map((thread) => (
              <ProfileThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
          {hasMoreThreads && (
            <button
              type="button"
              onClick={() =>
                setVisibleThreadCount((count) => count + PROFILE_THREADS_PAGE_SIZE)
              }
              className="mt-4 w-full rounded-xl py-4 text-center font-label-bold text-primary transition-colors hover:bg-surface-container"
            >
              {PROFILE_PAGE_COPY.loadMoreThreads}
            </button>
          )}
        </>
      );
    }

    if (activeTab === "saved") {
      if (savedJobs.length === 0) {
        return <ProfileEmptyTab tab="saved" />;
      }

      return (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <ProfileSavedJobCard key={job.id} job={job} />
          ))}
        </div>
      );
    }

    return <ProfileEmptyTab tab="activity" />;
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-container-max px-gutter pb-section-padding pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <ProfileSidebar className="hidden lg:block lg:col-span-3" />

          <div className="space-y-stack-gap lg:col-span-9">
            <ProfileHeaderCard user={user} />
            <ProfileStatsRow
              reputation={user.reputation ?? 0}
              threads={user.threadCount ?? userThreads.length}
              replies={user.replyCount ?? 0}
              savedJobs={savedJobsCount}
            />

            <div className="overflow-hidden rounded-xl border border-border-low-contrast bg-surface-container-lowest">
              <ProfileTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
              <div className="p-4">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
