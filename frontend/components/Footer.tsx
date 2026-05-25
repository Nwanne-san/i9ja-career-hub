'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-container py-6 sm:py-section-padding border-t border-border-low-contrast mt-12">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <h2 className="text-headline-md font-headline-md font-bold text-primary mb-3 sm:mb-4 text-sm sm:text-headline-md">i9ja</h2>
            <p className="text-on-surface-variant font-body-sm mb-4 sm:mb-6 text-xs sm:text-body-sm">
              Nigeria's community platform for jobs, free courses and real discussions. Built by Nigerians, for Nigerians.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://twitter.com/i9jatech" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-sm">language</span>
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" title="Share i9ja">
                <span className="material-symbols-outlined text-sm">share</span>
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="mailto:hello@i9ja.com">
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12">
            <div className="flex flex-col gap-2 sm:gap-4">
              <span className="font-label-bold text-on-surface text-xs sm:text-body-lg">Community</span>
              <Link className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="/guidelines">
                Guidelines
              </Link>
              <Link className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="/report">
                Report
              </Link>
              <Link className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="/forums">
                Forums
              </Link>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
              <span className="font-label-bold text-on-surface text-xs sm:text-body-lg">Company</span>
              <Link className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="/about">
                About
              </Link>
              <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="#">
                Terms & Conditions
              </a>
              <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="#">
                Privacy Policy
              </a>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
              <span className="font-label-bold text-on-surface text-xs sm:text-body-lg">Legal</span>
              <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="#">
                Disclaimer
              </a>
              <a className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="#">
                DMCA
              </a>
              <Link className="text-on-surface-variant font-body-sm hover:text-primary transition-colors text-xs sm:text-body-sm" href="/jobs">
                Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-16 pt-4 sm:pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-on-surface-variant font-body-sm text-xs sm:text-body-sm">© {currentYear} i9ja.com. Built by Nigerians, for Nigerians.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success-green animate-pulse"></div>
            <span className="text-on-surface-variant font-label-pill text-label-pill text-xs sm:text-sm">System Status: All systems nominal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
