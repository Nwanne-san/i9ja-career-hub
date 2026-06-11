'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import { searchAPI } from '@/services/api'
import Link from 'next/link'
import { AppRoutes } from '@/routes/app.routes'
import type { Thread, Job, Course, User } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<{
    threads: Thread[]
    jobs: Job[]
    courses: Course[]
    users: User[]
  }>({
    threads: [],
    jobs: [],
    courses: [],
    users: [],
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const res = await searchAPI.global(searchQuery)
      setResults(res.data as {
        threads: Thread[]
        jobs: Job[]
        courses: Course[]
        users: User[]
      })
    } catch (error) {
      console.error('Search failed', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-on-surface mb-4">Search</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threads, jobs, courses..."
              className="flex-1 px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </div>

        {loading && <p className="text-on-surface-variant">Searching...</p>}

        {!loading && searchQuery && (
          <>
            {results.threads?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-on-surface mb-4">Threads</h2>
                <div className="space-y-3">
                  {results.threads.map((thread: Thread) => (
                    <Link
                      key={thread.id}
                      href={AppRoutes.forumDetail(thread.id)}
                      className="block bg-bg-card border border-border-low-contrast rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-primary mb-1">{thread.title}</h3>
                      <p className="text-sm text-on-surface-variant">{thread.body?.substring(0, 100)}...</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.jobs?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-on-surface mb-4">Jobs</h2>
                <div className="space-y-3">
                  {results.jobs.map((job: Job) => (
                    <Link
                      key={job.id}
                      href={AppRoutes.jobDetail(job.id)}
                      className="block bg-bg-card border border-border-low-contrast rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-primary mb-1">{job.title}</h3>
                      <p className="text-sm text-on-surface-variant">{job.company} • {job.location}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.courses?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-on-surface mb-4">Courses</h2>
                <div className="space-y-3">
                  {results.courses.map((course: Course) => (
                    <Link
                      key={course.id}
                      href={AppRoutes.courseDetail(course.id)}
                      className="block bg-bg-card border border-border-low-contrast rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-primary mb-1">{course.title}</h3>
                      <p className="text-sm text-on-surface-variant">{course.provider}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {Object.values(results).every((arr) => Array.isArray(arr) && arr?.length === 0) && (
              <p className="text-center text-on-surface-variant py-12">
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </>
        )}

        {!searchQuery && (
          <p className="text-center text-on-surface-variant py-12">
            Enter a search term to find threads, jobs, and courses
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
