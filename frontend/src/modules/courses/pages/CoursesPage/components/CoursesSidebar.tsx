import { CommunitySidebar } from "@/modules/shared/component/CommunitySidebar";

export function CoursesSidebar() {
  return (
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-64px)] w-64 flex-col gap-stack-gap border-r border-border-low-contrast bg-surface p-4 lg:flex">
      <CommunitySidebar variant="flat" showPromo />
    </aside>
  );
}
