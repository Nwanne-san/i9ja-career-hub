"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppRoutes } from "@/routes/app.routes";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function ForumsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

function CreateIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
}

function JobsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const navItems: NavItem[] = [
    {
      href: AppRoutes.home,
      label: "Home",
      icon: <HomeIcon active={isActive(AppRoutes.home)} />,
    },
    {
      href: AppRoutes.forums,
      label: "Forums",
      icon: <ForumsIcon active={isActive(AppRoutes.forums)} />,
    },
    {
      href: AppRoutes.forumsNew,
      label: "Create",
      icon: <CreateIcon active={isActive(AppRoutes.forumsNew)} />,
    },
    {
      href: AppRoutes.jobs,
      label: "Jobs",
      icon: <JobsIcon active={isActive(AppRoutes.jobs)} />,
    },
    {
      href: AppRoutes.profile,
      label: "Profile",
      icon: <ProfileIcon active={isActive(AppRoutes.profile)} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-border-low-contrast bg-bg-card shadow-xl md:hidden">
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors duration-200 ${
                active ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
              title={item.label}
            >
              {item.icon}
              <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
