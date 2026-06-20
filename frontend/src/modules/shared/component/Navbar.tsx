"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bell, Menu, Moon, Sun, X, LogOut, Search } from "lucide-react";
import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";
import { NAV_LINKS } from "@/utils/constants";
import { cn } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/store/slices/authSlice";
import { clearAuthCookie } from "@/utils/authSession";
import NotificationsPanel from "@/modules/shared/component/NotificationsPanel/notificationsPanel";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);

  const isActive = (href: string) => pathname === href;
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${AppRoutes.search}?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    clearAuthCookie();
    dispatch(logout());
    setIsProfileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center border-b border-border-line bg-bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-page items-center justify-between gap-3 px-3 sm:px-6">
        {/* Logo */}
        <Link
          href={AppRoutes.home}
          className="flex-shrink-0 font-display text-lg font-black text-brand-green-light sm:text-xl"
        >
          i9ja
        </Link>

        {/* Desktop Navigation */}
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

        {/* Search Bar - Hidden on very small screens */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-xs sm:flex items-center gap-2 rounded-lg border border-border-low-contrast bg-bg-card px-3 py-1.5"
        >
          <Search className="h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-on-surface placeholder-ink-muted focus:outline-none"
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
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

          {/* Notifications */}
          {isAuthenticated && (
            <>
              <button
                type="button"
                aria-label="Notifications"
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
                className="relative rounded-full p-2 text-ink-muted transition-colors hover:bg-bg-card hover:text-ink"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-error text-xs text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <NotificationsPanel
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={() => setNotificationAnchor(null)}
              />
            </>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-1.5 sm:gap-2 sm:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  aria-label="Open profile menu"
                  className="rounded-full transition-opacity hover:opacity-90"
                >
                  <img
                    src={user?.avatarUrl || "https://via.placeholder.com/32"}
                    alt={user?.displayName}
                    className="h-8 w-8 rounded-full border border-primary object-cover"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-bg-card border border-border-low-contrast shadow-lg z-50">
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
                <Button href={AppRoutes.login} variant="ghost" className="px-3 py-1.5 text-sm">
                  Login
                </Button>
                <Button href={AppRoutes.register} className="rounded-lg px-3 sm:px-4 py-1.5 text-sm">
                  Join Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-ink sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-border-line bg-bg-base sm:hidden max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col gap-2 px-3 py-3">
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 rounded-lg border border-border-low-contrast bg-bg-card px-3 py-2 mb-2"
            >
              <Search className="h-4 w-4 text-ink-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-on-surface placeholder-ink-muted focus:outline-none"
              />
            </form>

            {/* Mobile Nav Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                  isActive(link.href) 
                    ? "text-brand-green-light bg-brand-green-light/10" 
                    : "text-ink-muted hover:text-ink hover:bg-bg-card"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border-line pt-3 mt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Button href={AppRoutes.profile} variant="ghost" className="w-full justify-center text-sm">
                    Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    className="w-full justify-center text-sm"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button href={AppRoutes.login} variant="ghost" className="w-full justify-center text-sm">
                    Login
                  </Button>
                  <Button href={AppRoutes.register} className="w-full justify-center text-sm">
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
