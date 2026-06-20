"use client";

import React from "react";
import { cn } from "@/utils";
import Button from "@/modules/shared/component/Button";
import EmptyState from "@/modules/shared/component/EmptyState";

export interface DataRendererProps<T = unknown> {
  children?: (args: { data?: T }) => React.ReactNode;
  data?: T;
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  showRetry?: boolean;
  renderError?: React.ReactNode;
  renderLoading?: React.ReactNode;
  renderEmpty?: React.ReactNode;
  emptyTitle?: string;
  emptySubTitle?: string;
  errorTitle?: string;
  errorSubTitle?: string;
  onRetry?: () => void;
  className?: string;
}

export function DefaultLoadingElement({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center py-12", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export function DefaultErrorElement({
  title = "Something went wrong",
  subtitle = "We could not load this content. Try again.",
  onRetry,
}: {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon="error_outline"
      title={title}
      description={subtitle}
      action={
        onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        ) : undefined
      }
    />
  );
}

export function DataRenderer<T>({
  children,
  data,
  isLoading,
  isEmpty,
  isError,
  showRetry = true,
  renderError,
  renderLoading,
  renderEmpty,
  emptyTitle = "Nothing here yet",
  emptySubTitle = "Check back later or adjust your filters.",
  errorTitle = "Something went wrong",
  errorSubTitle = "We could not load this content.",
  onRetry,
  className,
}: DataRendererProps<T>) {
  if (isLoading) {
    return <>{renderLoading ?? <DefaultLoadingElement className={className} />}</>;
  }

  if (isError) {
    return (
      <>
        {renderError ?? (
          <DefaultErrorElement
            title={errorTitle}
            subtitle={errorSubTitle}
            onRetry={showRetry ? onRetry : undefined}
          />
        )}
      </>
    );
  }

  if (isEmpty) {
    return (
      <>
        {renderEmpty ?? (
          <EmptyState
            icon="inbox"
            title={emptyTitle}
            description={emptySubTitle}
          />
        )}
      </>
    );
  }

  return <>{children?.({ data })}</>;
}
