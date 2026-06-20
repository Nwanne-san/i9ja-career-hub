import { cn } from "@/utils";
import type { ProfileTabId } from "../profilePage.content";
import { PROFILE_PAGE_COPY } from "../profilePage.content";

interface ProfileTabsProps {
  activeTab: ProfileTabId;
  onTabChange: (tab: ProfileTabId) => void;
}

const TABS: { id: ProfileTabId; label: string }[] = [
  { id: "threads", label: PROFILE_PAGE_COPY.tabs.threads },
  { id: "saved", label: PROFILE_PAGE_COPY.tabs.saved },
  { id: "activity", label: PROFILE_PAGE_COPY.tabs.activity },
];

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="flex border-b border-border-low-contrast px-4">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative px-6 py-4 transition-colors",
              isActive
                ? "font-bold text-primary"
                : "font-body-sm text-on-surface-variant hover:text-primary"
            )}
          >
            {tab.label}
            {isActive && <span className="active-tab-indicator" />}
          </button>
        );
      })}
    </div>
  );
}
