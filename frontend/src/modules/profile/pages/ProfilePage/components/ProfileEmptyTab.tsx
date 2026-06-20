import Link from "next/link";
import EmptyState from "@/modules/shared/component/EmptyState";
import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";
import type { ProfileTabId } from "../profilePage.content";
import { PROFILE_PAGE_COPY } from "../profilePage.content";

interface ProfileEmptyTabProps {
  tab: ProfileTabId;
}

export function ProfileEmptyTab({ tab }: ProfileEmptyTabProps) {
  if (tab === "threads") {
    const copy = PROFILE_PAGE_COPY.empty.threads;
    return (
      <EmptyState
        icon="forum"
        title={copy.title}
        description={copy.description}
        action={
          <Button href={AppRoutes.forumsNew}>{copy.cta}</Button>
        }
      />
    );
  }

  if (tab === "saved") {
    const copy = PROFILE_PAGE_COPY.empty.saved;
    return (
      <EmptyState
        icon="bookmark"
        title={copy.title}
        description={copy.description}
        action={
          <Button href={AppRoutes.jobs}>{copy.cta}</Button>
        }
      />
    );
  }

  const copy = PROFILE_PAGE_COPY.empty.activity;
  return (
    <EmptyState
      icon="history"
      title={copy.title}
      description={copy.description}
      action={
        <Link
          href={AppRoutes.forums}
          className="font-label-bold text-primary hover:underline"
        >
          Browse forums
        </Link>
      }
    />
  );
}
