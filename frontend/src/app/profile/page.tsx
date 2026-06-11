// ============================================================
// USER PROFILE PAGE - User profile and activity
// Routes: GET /profile/[username] or GET /profile (current user)
// ============================================================

'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { AppRoutes } from '@/routes/app.routes'
import type { RootState } from '@/redux/store'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated || !user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-on-surface-variant mb-4">Please sign in to view your profile</p>
            <Button href={AppRoutes.login}>Sign In</Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex gap-6 items-start mb-6">
            <img
              src={user.avatarUrl || 'https://via.placeholder.com/100'}
              alt={user.displayName}
              className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">{user.displayName}</h1>
                {user.verified && <span className="text-success-green">✓ Verified</span>}
              </div>
              <p className="text-primary font-semibold mb-2">{user.username}</p>
              {user.location && <p className="text-on-surface-variant mb-2">📍 {user.location}</p>}
              {user.bio && <p className="text-on-surface-variant mb-4">{user.bio}</p>}
              <Button href={AppRoutes.profileEdit} variant="primary">
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-low-contrast">
            <div className="text-center">
              <p className="text-on-surface-variant text-sm mb-1">Threads</p>
              <p className="text-2xl font-bold text-primary">{user.threadCount || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-on-surface-variant text-sm mb-1">Followers</p>
              <p className="text-2xl font-bold text-primary">{user.reputation || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-on-surface-variant text-sm mb-1">Following</p>
              <p className="text-2xl font-bold text-primary">{user.replyCount || 0}</p>
            </div>
          </div>
        </div>

        {/* Activity Sections */}
        <div className="grid grid-cols-1 gap-8">
          {/* Recent Threads */}
          <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-6">
            <h2 className="text-xl font-bold text-on-surface mb-4">Recent Threads</h2>
            <p className="text-on-surface-variant text-center py-8">
              No threads yet. <a href={AppRoutes.forumsNew} className="text-primary font-semibold">Create one now</a>
            </p>
          </div>

          {/* Saved Jobs */}
          <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-6">
            <h2 className="text-xl font-bold text-on-surface mb-4">Saved Jobs</h2>
            <p className="text-on-surface-variant text-center py-8">
              You haven't saved any jobs yet. <a href={AppRoutes.jobs} className="text-primary font-semibold">Browse jobs</a>
            </p>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-6">
            <h2 className="text-xl font-bold text-on-surface mb-4">Enrolled Courses</h2>
            <p className="text-on-surface-variant text-center py-8">
              You haven't enrolled in any courses yet. <a href={AppRoutes.courses} className="text-primary font-semibold">Explore courses</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
