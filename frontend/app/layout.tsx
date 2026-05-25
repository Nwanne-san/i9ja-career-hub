import type { Metadata } from 'next'
import '../styles/globals.css'
import MobileBottomNav from '@/components/MobileBottomNav'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'i9ja | Your Nigerian Hub for Jobs, Courses & Community',
  description: 'Connect with Nigeria\'s trusted platform for jobs, free courses, and community discussions.',
  keywords: 'Nigeria, jobs, courses, community, forums, career',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface font-body-lg text-on-surface flex flex-col min-h-screen">
        <ScrollToTop />
        <div className="flex-1">
          {children}
        </div>
        <MobileBottomNav />
      </body>
    </html>
  )
}
