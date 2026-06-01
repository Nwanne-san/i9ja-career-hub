"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Menu, Moon, Sun, X } from "lucide-react";
import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";
import { NAV_LINKS } from "@/utils/constants";
import { cn } from "@/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => pathname === href;
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center border-b border-border-line bg-bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-page items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href={AppRoutes.home}
            className="font-display text-lg font-black text-brand-green-light sm:text-xl"
          >
            i9ja
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b-2 pb-1 text-sm transition-colors",
                  isActive(link.href)
                    ? "border-brand-green font-bold text-brand-green-light"
                    : "border-transparent text-ink-muted hover:text-brand-green-light"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-ink-muted transition-colors hover:bg-bg-card hover:text-ink"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2 text-ink-muted transition-colors hover:bg-bg-card hover:text-ink"
          >
            <Bell className="h-4 w-4" />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <Button href={AppRoutes.authLogin} variant="ghost" className="px-4 py-2">
              Login
            </Button>
            <Button href={AppRoutes.authLogin} className="rounded-xl px-5 py-2">
              Join Free
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-ink md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-border-line bg-bg-base md:hidden">
          <div className="flex flex-col gap-3 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "py-2 text-sm font-semibold",
                  isActive(link.href) ? "text-brand-green-light" : "text-ink-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 border-t border-border-line pt-3">
              <Button href={AppRoutes.authLogin} variant="ghost" className="flex-1">
                Login
              </Button>
              <Button href={AppRoutes.authLogin} className="flex-1">
                Join Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
