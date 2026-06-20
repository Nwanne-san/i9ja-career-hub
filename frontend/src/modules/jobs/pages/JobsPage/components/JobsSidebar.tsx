import { CommunitySidebar } from "@/modules/shared/component/CommunitySidebar";
import { JobsSidebarAd } from "./JobsSidebarAd";

export function JobsSidebar() {
  return (
    <aside className="flex w-full flex-col gap-6 lg:w-72">
      <CommunitySidebar variant="card" />
      <JobsSidebarAd />
    </aside>
  );
}
