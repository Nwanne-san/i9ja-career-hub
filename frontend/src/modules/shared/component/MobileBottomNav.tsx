"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppRoutes } from "@/routes/app.routes";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const navItems = [
    { href: AppRoutes.home, icon: "home", label: "Home" },
    { href: AppRoutes.forums, icon: "chat_bubble", label: "Forums" },
    {
      href: AppRoutes.forumsNew,
      icon: "add_circle",
      label: "Create",
      isCreate: true,
    },
    { href: AppRoutes.jobs, icon: "work", label: "Jobs" },
    { href: AppRoutes.profile, icon: "person", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-around border-t border-border-line bg-bg-card px-0 py-0 shadow-lg md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex h-full flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 ${
            item.isCreate
              ? "text-brand-green-light"
              : isActive(item.href)
                ? "text-brand-green-light"
                : "text-ink-muted hover:text-brand-green-light"
          }`}
          title={item.label}
        >
          <span
            className={`material-symbols-outlined ${item.isCreate ? "text-3xl" : "text-xl"}`}
          >
            {item.icon}
          </span>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
