"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Menu, Moon, Sun, X, LogOut } from "lucide-react";
import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";
import { NAV_LINKS } from "@/utils/constants";
import { cn } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/store/slices/authSlice";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/utils/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);

  const isActive = (href: string) => pathname === href;
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    Cookies.remove(AUTH_COOKIE_NAME);
    dispatch(logout());
    setIsProfileMenuOpen(false);
    router.push("/");
  };

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

          {isAuthenticated && (
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-full p-2 text-ink-muted transition-colors hover:bg-bg-card hover:text-ink"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-error text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          <div className="hidden items-center gap-2 sm:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-bg-card px-3 py-1.5 hover:bg-surface-container-low"
                >
                  <img
                    src={user?.avatarUrl || "https://via.placeholder.com/32"}
                    alt={user?.displayName}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-sm font-medium text-primary">{user?.displayName}</span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-bg-card border border-border-low-contrast shadow-lg">
                    <Link
                      href={AppRoutes.profile}
                      className="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low rounded-t-lg"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={AppRoutes.profileEdit}
                      className="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-low"
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-container-low rounded-b-lg flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button href={AppRoutes.login} variant="ghost" className="px-4 py-2">
                  Login
                </Button>
                <Button href={AppRoutes.register} className="rounded-xl px-5 py-2">
                  Join Free
                </Button>
              </>
            )}
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
              {isAuthenticated ? (
                <>
                  <Button href={AppRoutes.profile} variant="ghost" className="flex-1">
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    className="flex-1"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button href={AppRoutes.login} variant="ghost" className="flex-1">
                    Login
                  </Button>
                  <Button href={AppRoutes.register} className="flex-1">
                    Join Free
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
