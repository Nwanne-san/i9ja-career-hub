import MaterialIcon from "@/modules/shared/component/MaterialIcon";
import { AppRoutes } from "@/routes/app.routes";
import Link from "next/link";
import { cn } from "@/utils";

const COMMUNITY_LINKS = [
  { href: AppRoutes.guidelines, icon: "gavel", label: "Guidelines" },
  { href: AppRoutes.report, icon: "report", label: "Report" },
  { href: AppRoutes.about, icon: "info", label: "About" },
  { href: AppRoutes.terms, icon: "description", label: "Terms" },
] as const;

interface CommunitySidebarProps {
  variant?: "card" | "flat";
  className?: string;
  showPromo?: boolean;
}

export function CommunitySidebar({
  variant = "card",
  className,
  showPromo = false,
}: CommunitySidebarProps) {
  const isCard = variant === "card";

  return (
    <aside className={cn("flex flex-col gap-6", className)}>
      <div
        className={cn(
          "flex flex-col gap-4",
          isCard &&
            "rounded-2xl border border-border-low-contrast bg-surface-container-lowest p-4"
        )}
      >
        <div className={cn("flex items-center gap-3", !isCard && "mb-2 px-2")}>
          {isCard && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-fixed">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_vUcdU5tAeGXvd0LG8KzPorFqcqEVtlsW0-hZVWIC-MRuCELKYrbtdw6CG7VOrqX_dVaqIa_jmjYTf6F697_yxYO2UGGImA2j6lHoyKHYAohQQxBIyV_rPN6oIyyS-ACEXUMUf34-OKC7ZvxdeTS8Jxqv2hj88vX206P02y5Z7uMVyblCNWiEzKT1e1V9JsQWVFdWfTHjBgLjIlYVTAto8_Woj9tUyYlXcaMnS-ian9xJ9lqQvNFjYVwGObrEOLPiYLuuXkWOGfs"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div>
            <p
              className={cn(
                "text-on-surface",
                isCard ? "font-label-bold text-label-bold" : "font-headline-md text-headline-md text-primary"
              )}
            >
              Community Menu
            </p>
            <p className="text-body-sm text-on-surface-variant">i9ja Platform</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {COMMUNITY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl text-on-surface-variant transition-all font-body-sm hover:bg-surface-container-high",
                isCard ? "px-3 py-2" : "p-3 hover:bg-surface-container"
              )}
            >
              <MaterialIcon name={link.icon} className="text-[20px]" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {showPromo && (
        <div className="rounded-xl bg-secondary-container p-4">
          <p className="font-label-bold text-on-secondary-container mb-2">
            Ready to level up?
          </p>
          <Link
            href={AppRoutes.register}
            className="block w-full rounded-lg bg-brand-green py-2 text-center font-label-bold text-label-bold text-white transition-opacity hover:opacity-90"
          >
            Join Free
          </Link>
        </div>
      )}
    </aside>
  );
}
