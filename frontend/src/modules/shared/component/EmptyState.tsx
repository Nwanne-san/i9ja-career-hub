import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import Button from "@/modules/shared/component/Button";
import { cn } from "@/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
  children?: ReactNode;
}

export default function EmptyState({
  icon = "inbox",
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
  children,
  action,
}: EmptyStateProps & { action?: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-low-contrast bg-surface-container-low px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container">
        <MaterialIcon name={icon} className="text-4xl text-outline" />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
      <p className="mt-2 max-w-md text-body-sm text-on-surface-variant">{description}</p>
      {children}
      {action}
      {actionLabel && (actionHref || onAction) && (
        <div className="mt-6">
          {actionHref ? (
            <Button href={actionHref}>{actionLabel}</Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
}
