"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils";

export interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}

export default function InfiniteScroll({
  children,
  onLoadMore,
  hasMore = false,
  loading = false,
  className,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading || !onLoadMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return (
    <div className={className}>
      {children}
      <div ref={sentinelRef} className="h-1" />
      {loading && (
        <div className={cn("flex justify-center py-4")}>
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
