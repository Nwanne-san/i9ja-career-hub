import { AppRoutes } from "@/routes/app.routes";
import { cn } from "@/utils";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export interface ThreadCardData {
  id: string;
  title: string;
  preview: string;
  comments: number;
  likes: number;
  time: string;
  href?: string;
}

interface ThreadCardProps {
  thread: ThreadCardData;
  className?: string;
}

export default function ThreadCard({ thread, className }: ThreadCardProps) {
  const href = thread.href ?? AppRoutes.forums;

  return (
    <Link
      href={href}
      className={cn(
        "card-lift block rounded-xl border border-border-line bg-bg-card p-3 transition-colors hover:bg-bg-card-hover sm:p-4",
        className
      )}
    >
      <h3 className="mb-1 text-sm font-bold text-ink sm:text-base">
        {thread.title}
      </h3>
      <p className="line-clamp-2 text-xs text-ink-muted sm:text-sm">
        {thread.preview}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-dim sm:mt-3 sm:gap-4 sm:text-sm">
        <span className="flex items-center gap-1">
          <MessageCircle className="h-3.5 w-3.5" />
          {thread.comments}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-3.5 w-3.5" />
          {thread.likes}
        </span>
        <span>{thread.time}</span>
      </div>
    </Link>
  );
}
