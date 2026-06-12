"use client";

import Link from "next/link";
import { Globe, Mail, Share2 } from "lucide-react";
import { AppRoutes } from "@/routes/app.routes";
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  SITE_TAGLINE,
} from "@/utils/constants";
import { cn } from "@/utils";

const FOOTER_PLATFORM = [
  { href: AppRoutes.guidelines, label: "Guidelines" },
  { href: AppRoutes.report, label: "Report" },
  { href: AppRoutes.report, label: "Support" },
] as const;

const FOOTER_ABOUT = [
  { href: AppRoutes.about, label: "Our Story" },
  { href: AppRoutes.privacy, label: "Privacy" },
  { href: AppRoutes.terms, label: "Terms" },
  { href: AppRoutes.disclaimer, label: "Disclaimer" },
  { href: AppRoutes.dmca, label: "DMCA" },
] as const;

const FOOTER_COMMUNITY = [
  { href: AppRoutes.forums, label: "Forums" },
  { href: AppRoutes.jobs, label: "Jobs" },
  { href: AppRoutes.courses, label: "Courses" },
] as const;

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border-line bg-bg-card/60 py-10 sm:py-12">
      <div className="mx-auto max-w-page px-4 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
          <div className="max-w-xs">
            <Link
              href={AppRoutes.home}
              className="font-display text-xl font-black text-brand-green-light"
            >
              i9ja
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {SITE_TAGLINE}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border border-border-line",
                  "text-ink-muted transition-colors hover:border-brand-green/40 hover:text-brand-green-light"
                )}
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border border-border-line",
                  "text-ink-muted transition-colors hover:border-brand-green/40 hover:text-brand-green-light"
                )}
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border border-border-line",
                  "text-ink-muted transition-colors hover:border-brand-green/40 hover:text-brand-green-light"
                )}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">
                Platform
              </h3>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_PLATFORM.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-brand-green-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">
                About
              </h3>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_ABOUT.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-brand-green-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink">
                Community
              </h3>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_COMMUNITY.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-brand-green-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border-line pt-4 sm:pt-6 sm:mt-10">
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-dim">
              © 2025 i9ja.com — Made with ❤️ for Nigeria 🇳🇬. All rights reserved.
            </p>
            <div className="flex flex-row gap-2 sm:gap-4 sm:items-center items-start flex-wrap">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xs text-ink-muted hover:text-brand-green-light transition-colors"
              >
                Email: {CONTACT_EMAIL}
              </a>
              <span className="text-ink-muted">•</span>
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ink-muted hover:text-brand-green-light transition-colors"
              >
                WhatsApp: +234 706 176 9157
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
