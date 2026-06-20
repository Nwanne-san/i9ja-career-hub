import { CommunitySidebar } from "@/modules/shared/component/CommunitySidebar";
import { cn } from "@/utils";

interface ProfileSidebarProps {
  className?: string;
}

export function ProfileSidebar({ className }: ProfileSidebarProps) {
  return (
    <aside className={cn(className)}>
      <div className="sticky top-24 flex h-[calc(100vh-120px)] flex-col rounded-xl border-r border-border-low-contrast p-4">
        <CommunitySidebar variant="flat" />
      </div>
    </aside>
  );
}
