import EmptyState from "@/modules/shared/component/EmptyState";
import { FORUMS_PAGE_COPY } from "../forumsPage.content";

interface ForumsEmptyStateProps {
  onClear?: () => void;
}

export function ForumsEmptyState({ onClear }: ForumsEmptyStateProps) {
  return (
    <EmptyState
      icon="forum"
      title={FORUMS_PAGE_COPY.emptyTitle}
      description={FORUMS_PAGE_COPY.emptyDescription}
      action={
        onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-primary hover:underline"
          >
            View all categories
          </button>
        ) : undefined
      }
    />
  );
}
