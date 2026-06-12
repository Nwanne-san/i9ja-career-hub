// ============================================================
// JOBS PAGE - Job listings and search
// Routes: GET /jobs
// ============================================================

'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Badge from '@/modules/shared/component/Badge'
import { jobAPI } from '@/services/api'
import { JOB_TYPES } from '@/utils/constants'
import { AppRoutes } from '@/routes/app.routes'
import type { RootState } from '@/redux/store'
import type { Job } from '@/types'

// Memoized job card
const JobCard = memo(({ job, isSaved }: { job: Job; isSaved: boolean }) => (
  <Link
    href={AppRoutes.jobDetail(job.id)}
    className="block bg-bg-card border border-border-low-contrast hover:border-primary rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all h-full"
  >
    <div className="flex flex-col gap-3 h-full">
      {/* Header with title and verified badge */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <h3 className="font-semibold text-on-surface text-sm sm:text-base leading-tight flex-1 line-clamp-2">{job.title}</h3>
        {job.verified && (
          <span className="flex-shrink-0 text-xs bg-success-green text-white px-2 py-0.5 rounded-full whitespace-nowrap">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Company name */}
      <p className="text-xs sm:text-sm text-primary font-semibold">{job.company}</p>

      {/* Location, type, and salary */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-on-surface-variant">
        <span className="flex items-center gap-1">📍 {job.location}</span>
        <span>•</span>
        <Badge variant="primary" className="text-xs">{job.type}</Badge>
        {job.salary && (
          <>
            <span>•</span>
            <span>💰 {job.salary}</span>
          </>
        )}
      </div>

      {/* Description - takes remaining space */}
      <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 flex-1">{job.description}</p>

      {/* Save button at bottom */}
      <div className="flex items-center justify-end pt-2 border-t border-border-low-contrast">
        <button
          onClick={(e) => e.preventDefault()}
          className="text-lg sm:text-xl hover:scale-110 transition-transform"
          title={isSaved ? 'Unsave job' : 'Save job'}
        >
          {isSaved ? '💾' : '📌'}
        </button>
      </div>
    </div>
  </Link>
))
JobCard.displayName = 'JobCard'

export default function JobsPage() {
  const { savedJobs } = useSelector((state: RootState) => state.jobs)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterLocation, setFilterLocation] = useState('all')
  const [cache, setCache] = useState<Record<string, Job[]>>({})

  const fetchJobs = useCallback(async (search: string, type: string, location: string) => {
    const cacheKey = `${search}|${type}|${location}`
    
    // Check cache first
    if (cache[cacheKey]) {
      setJobs(cache[cacheKey])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const response = await jobAPI.getAll({
        search: search || undefined,
        type: type === 'all' ? undefined : type,
        location: location === 'all' ? undefined : location,
      })
      const data = (response.data as Job[]) || []
      setJobs(data)
      setCache(prev => ({ ...prev, [cacheKey]: data }))
    } catch (error) {
      console.error('Failed to fetch jobs', error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [cache])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(searchTerm, filterType, filterLocation)
    }, 300) // Debounce search by 300ms
    
    return () => clearTimeout(timer)
  }, [searchTerm, filterType, filterLocation, fetchJobs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search happens via useEffect when searchTerm changes
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-primary-container rounded-2xl p-6 sm:p-8 text-on-primary-container mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Jobs</h1>
          <p className="text-on-primary-container opacity-90">
            Find your next opportunity in Nigeria&rsquo;s tech ecosystem
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 w-full flex-col sm:flex-row">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs..."
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90 whitespace-nowrap"
            >
              Search
            </button>
          </form>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary whitespace-nowrap"
            >
              <option value="all">All Types</option>
              {JOB_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary whitespace-nowrap"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="portharcourt">Port Harcourt</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-bg-card border border-border-low-contrast rounded-lg p-4 animate-pulse">
                  <div className="h-5 bg-surface-container-low rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-surface-container-low rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-surface-container-low rounded w-full mb-2"></div>
                  <div className="h-3 bg-surface-container-low rounded w-2/3"></div>
                </div>
              ))}
            </>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                isSaved={savedJobs.includes(job.id)}
              />
            ))
          ) : (
            <div className="col-span-full">
              <p className="text-on-surface-variant text-center py-8">
                No jobs found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
