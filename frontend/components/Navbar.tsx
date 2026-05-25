// ============================================================
// NAVBAR - Global navigation component
// ============================================================

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/forums', label: 'Forums' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/courses', label: 'Courses' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="fixed top-0 w-full z-40 bg-surface border-b border-border-low-contrast shadow-sm h-16 flex items-center">
      <div className="flex justify-between items-center px-gutter w-full max-w-container-max mx-auto h-full">
        {/* Logo & Navigation */}
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <Link className="text-lg sm:text-headline-md font-bold text-primary shrink-0" href="/">
            i9ja
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
            {navLinks.map(link => (
              <Link
                key={link.href}
                className={`transition-colors text-sm font-body-lg whitespace-nowrap pb-1 border-b-2 ${
                  isActive(link.href)
                    ? 'text-primary font-bold border-primary'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden sm:flex flex-1 max-w-xs lg:max-w-md px-2 lg:px-4">
          <div className="relative group w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-9 pr-3 text-xs sm:text-body-sm focus:ring-2 focus:ring-primary/20 transition-all group-hover:bg-surface-container"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <div className="hidden sm:flex items-center gap-1 lg:gap-2">
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-1.5 sm:p-2 rounded-full transition-colors text-sm">
              dark_mode
            </button>
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-1.5 sm:p-2 rounded-full transition-colors text-sm">
              notifications
            </button>
          </div>
          <Link
            href="/profile"
            className="hidden sm:block text-primary px-3 sm:px-4 py-2 font-body-sm font-semibold hover:bg-surface-container-low rounded-lg transition-all text-xs sm:text-sm"
          >
            Profile
          </Link>
          <button className="bg-primary-600 text-white px-3 sm:px-6 py-2 rounded-lg font-bold shadow-sm active:scale-95 transition-all text-xs sm:text-sm">
            Join
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 ml-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-surface border-b border-border-low-contrast z-40">
          <div className="px-gutter py-4 flex flex-col gap-3">
            {/* Mobile Search */}
            <div className="relative group w-full mb-2">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
              <input
                className="w-full bg-surface-container-low border-none rounded-full py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Search discussions..."
                type="text"
              />
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-body-lg font-bold py-2 transition-colors ${
                  isActive(link.href)
                    ? 'text-primary border-l-4 border-primary pl-2'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Additional Links */}
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-body-lg text-on-surface-variant hover:text-primary py-2 transition-colors"
            >
              About
            </Link>
            <Link
              href="/guidelines"
              onClick={() => setIsMenuOpen(false)}
              className="text-body-lg text-on-surface-variant hover:text-primary py-2 transition-colors"
            >
              Guidelines
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="flex gap-2 pt-3 border-t border-border-low-contrast">
              <button className="px-4 py-2.5 text-primary font-bold flex-1 text-sm rounded-lg hover:bg-surface-container-low transition-colors">
                Login
              </button>
              <button className="px-4 py-2.5 bg-primary-600 text-white font-bold rounded-lg flex-1 text-sm hover:bg-primary-700 transition-colors shadow-md active:scale-95">
                Join Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
