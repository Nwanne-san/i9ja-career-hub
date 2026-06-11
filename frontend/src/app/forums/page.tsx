// ============================================================
// FORUMS PAGE - All forum-related sections consolidated
// Routes: GET /forums
// ============================================================

'use client'

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { threadAPI } from '@/services/api'
import { FORUM_CATEGORIES } from '@/utils/constants'
import { AppRoutes } from '@/routes/app.routes'
import type { RootState } from '@/redux/store'
import type { Thread } from '@/types'

// Memoized thread card to prevent unnecessary re-renders
const ThreadCard = memo(({ thread }: { thread: Thread }) => (
  <Link
    href={AppRoutes.forumDetail(thread.id)}
    className="block bg-bg-card border border-border-low-contrast rounded-lg p-4 hover:shadow-md transition-all group"
  >
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-1 bg-bg-card border border-border-low-contrast rounded-lg px-3 py-2 sm:min-w-[60px]">
        <div className="flex items-center gap-1">
          <span className="text-xs text-on-surface-variant">Votes</span>
          <span className="font-bold text-primary text-sm">{thread.likeCount || 0}</span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors mb-2">
          {thread.title}
        </h3>
        <p className="text-sm text-on-surface-variant mb-3 line-clamp-2">
          {thread.body?.substring(0, 100)}...
        </p>
        <div className="flex flex-wrap gap-3 items-center text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="font-medium">{thread.replyCount || 0}</span>
            <span>replies</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{thread.viewCount || 0}</span>
            <span>views</span>
          </span>
          <span className="bg-primary text-on-primary px-2 py-1 rounded font-medium">
            {thread.categoryId}
          </span>
        </div>
      </div>
      <div className="text-right text-xs text-on-surface-variant hidden sm:block">
        <p className="font-medium">{thread.author?.displayName}</p>
        <p>{new Date(thread.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  </Link>
))
ThreadCard.displayName = 'ThreadCard'

export default function ForumsPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cache, setCache] = useState<Record<string, Thread[]>>({})

  // Use useCallback to prevent function recreations
  const fetchThreads = useCallback(async (category: string) => {
    // Check cache first
    if (cache[category]) {
      setThreads(cache[category])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const response = await threadAPI.getAll({
        category: category === 'all' ? undefined : category,
      })
      const data = (response.data as Thread[]) || []
      setThreads(data)
      setCache(prev => ({ ...prev, [category]: data }))
    } catch (error) {
      console.error('Failed to fetch threads', error)
      setThreads([])
    } finally {
      setLoading(false)
    }
  }, [cache])

  // Fetch threads only when category changes
  useEffect(() => {
    fetchThreads(selectedCategory)
  }, [selectedCategory, fetchThreads])

  // Memoize categories buttons
  const categoryButtons = useMemo(() => (
    FORUM_CATEGORIES.map((cat) => (
      <button
        key={cat.id}
        onClick={() => setSelectedCategory(cat.id)}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${
          selectedCategory === cat.id
            ? 'bg-primary text-on-primary'
            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
        }`}
      >
        {cat.emoji} {cat.name}
      </button>
    ))
  ), [selectedCategory])

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-primary-container rounded-2xl p-6 sm:p-8 text-on-primary-container mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Forums</h1>
          <p className="text-on-primary-container opacity-90 mb-4">
            Discuss anything with the Nigerian community
          </p>
          {isAuthenticated ? (
            <Button href={AppRoutes.forumsNew}>
              ✏️ Start New Thread
            </Button>
          ) : (
            <Button href={AppRoutes.login}>
              Sign In to Create Thread
            </Button>
          )}
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              All Categories
            </button>
            {categoryButtons}
          </div>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-bg-card border border-border-low-contrast rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-surface-container-low rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-surface-container-low rounded w-full mb-4"></div>
                  <div className="h-3 bg-surface-container-low rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : threads.length > 0 ? (
            threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <p className="text-on-surface-variant text-center py-8">
              No threads found in this category. Be the first to create one!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
