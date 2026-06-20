"use client";

import { useSelector } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import Button from "@/modules/shared/component/Button";
import { ProfilePageView } from "./profilePage";
import { PROFILE_PAGE_COPY } from "./profilePage.content";
import type { RootState } from "@/redux/store";
import { AppRoutes } from "@/routes/app.routes";

export function ProfilePage() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated || !user) {
    return (
      <SiteShell>
        <div className="flex min-h-[60vh] items-center justify-center px-gutter">
          <div className="text-center">
            <p className="mb-4 text-lg text-on-surface-variant">
              {PROFILE_PAGE_COPY.signInPrompt}
            </p>
            <Button href={AppRoutes.auth}>{PROFILE_PAGE_COPY.signInCta}</Button>
          </div>
        </div>
      </SiteShell>
    );
  }

  return <ProfilePageView user={user} />;
}

export default ProfilePage;
