// ============================================================
// MOBILE BOTTOM NAV - Mobile-only persistent navigation (md:hidden)
// Shows: Home, Forums, Create (+), Jobs, Profile
// Fully functional with Next.js Link routing and active state detection
// ============================================================

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const navItems = [
    { href: '/', icon: 'home', label: 'Home' },
    { href: '/forums', icon: 'chat_bubble', label: 'Forums' },
    { href: '/forums/new', icon: 'add_circle', label: 'Create', isCreate: true },
    { href: '/jobs', icon: 'work', label: 'Jobs' },
    { href: '/profile', icon: 'person', label: 'Profile' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-low-contrast px-0 py-0 flex justify-around items-center z-40 h-16 w-full shadow-lg">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 active:scale-95 ${
            item.isCreate
              ? 'text-primary hover:text-primary active:text-primary'
              : isActive(item.href)
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-primary'
          }`}
          title={item.label}
        >
          <span className={`material-symbols-outlined ${item.isCreate ? 'text-3xl' : 'text-xl'}`}>
            {item.icon}
          </span>
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
