// ============================================================
// JOBS PAGE - Job listings and search
// Routes: GET /jobs
// ============================================================

'use client'

import { useState, useEffect, useCallback, memo, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import Badge from '@/modules/shared/component/Badge'
import { jobAPI } from '@/services/api'
import { JOB_TYPES } from '@/utils/constants'
import { AppRoutes } from '@/routes/app.routes'
import type { RootState } from '@/redux/store'

// Memoized job card
const JobCard = memo(({ job, isSaved }: { job: any; isSaved: boolean }) => (
  <Link
    href={AppRoutes.jobDetail(job.id)}
    className="block bg-bg-card border border-border-low-contrast rounded-lg p-4 hover:shadow-md transition-all"
  >
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex gap-2 items-center mb-1">
          <h3 className="font-semibold text-on-surface text-lg">{job.title}</h3>
          {job.verified && <span className="text-xs bg-success-green text-white px-2 py-1 rounded">✓ Verified</span>}
        </div>
        <p className="text-primary font-semibold mb-2">{job.company}</p>
        <div className="flex gap-3 items-center text-sm text-on-surface-variant mb-2">
          <span>📍 {job.location}</span>
          <Badge variant="primary">{job.type}</Badge>
          {job.salary && <span>💰 {job.salary}</span>}
        </div>
        <p className="text-sm text-on-surface-variant line-clamp-1">{job.description}</p>
      </div>
      <button
        onClick={(e) => e.preventDefault()}
        className="text-2xl hover:scale-125 transition-transform"
      >
        {isSaved ? '💾' : '📌'}
      </button>
    </div>
  </Link>
))
JobCard.displayName = 'JobCard'

export default function JobsPage() {
  const router = useRouter()
  const { savedJobs } = useSelector((state: RootState) => state.jobs)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterLocation, setFilterLocation] = useState('all')
  const [cache, setCache] = useState<Record<string, any[]>>({})

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
      const data = response.data || []
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
            Find your next opportunity in Nigeria's tech ecosystem
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs..."
              className="flex-1 px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary/90"
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
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-bg-card border border-border-low-contrast rounded-lg p-4 animate-pulse">
                  <div className="h-5 bg-surface-container-low rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-surface-container-low rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-surface-container-low rounded w-full mb-2"></div>
                  <div className="h-3 bg-surface-container-low rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                isSaved={savedJobs.includes(job.id)}
              />
            ))
          ) : (
            <p className="text-on-surface-variant text-center py-8">
              No jobs found. Try adjusting your filters.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
