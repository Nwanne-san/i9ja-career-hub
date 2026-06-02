import ThreadCard from "@/modules/shared/component/ThreadCard";
import { HOME_TRENDING_THREADS } from "../homePage.content";

export function HomeTrendingSection() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
        Trending Discussions
      </h2>
      <div className="flex flex-col gap-4">
        {HOME_TRENDING_THREADS.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
