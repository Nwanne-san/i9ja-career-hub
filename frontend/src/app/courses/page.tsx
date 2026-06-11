// ============================================================
// COURSES PAGE - Free courses and learning materials
// Routes: GET /courses
// ============================================================

'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Badge from '@/modules/shared/component/Badge'
import { courseAPI } from '@/services/api'
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/utils/constants'
import { AppRoutes } from '@/routes/app.routes'
import type { Course } from '@/types'

// Memoized course card
const CourseCard = memo(({ course }: { course: Course }) => (
  <Link
    href={AppRoutes.courseDetail(course.id)}
    className="bg-bg-card border border-border-low-contrast rounded-lg overflow-hidden hover:shadow-md transition-all group"
  >
    {course.thumbnailEmoji && (
      <div className="h-40 bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-6xl">
        {course.thumbnailEmoji}
      </div>
    )}
    <div className="p-4">
      <div className="mb-2">
        <Badge variant="primary">{course.level}</Badge>
      </div>
      <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors mb-1 line-clamp-2">
        {course.title}
      </h3>
      <p className="text-sm text-primary font-semibold mb-2">{course.provider}</p>
      <div className="flex justify-between items-center text-xs text-on-surface-variant">
        <span>⭐ {course.rating || 'N/A'}</span>
        <span>{course.free ? '✓ Free' : 'Paid'}</span>
      </div>
      {course.studentCount && (
        <p className="text-xs text-on-surface-variant mt-2">
          {course.studentCount.toLocaleString()} students
        </p>
      )}
    </div>
  </Link>
))
CourseCard.displayName = 'CourseCard'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [cache, setCache] = useState<Record<string, Course[]>>({})

  const fetchCourses = useCallback(async (category: string, level: string) => {
    const cacheKey = `${category}|${level}`
    
    // Check cache first
    if (cache[cacheKey]) {
      setCourses(cache[cacheKey])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const response = await courseAPI.getAll({
        category: category === 'all' || category === 'All Categories' ? undefined : category,
        level: level === 'all' || level === 'All Levels' ? undefined : level,
      })
      const data = (response.data as Course[]) || []
      setCourses(data)
      setCache(prev => ({ ...prev, [cacheKey]: data }))
    } catch (error) {
      console.error('Failed to fetch courses', error)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }, [cache])

  useEffect(() => {
    fetchCourses(categoryFilter, levelFilter)
  }, [categoryFilter, levelFilter, fetchCourses])

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-primary-container rounded-2xl p-6 sm:p-8 text-on-primary-container mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Free Courses</h1>
          <p className="text-on-primary-container opacity-90">
            Learn from industry experts. Free courses for Nigerian tech professionals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary whitespace-nowrap"
          >
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary whitespace-nowrap"
          >
            {COURSE_LEVELS.map((level) => (
              <option key={level} value={level.toLowerCase()}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-bg-card border border-border-low-contrast rounded-lg overflow-hidden animate-pulse">
                  <div className="h-40 bg-surface-container-low"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-surface-container-low rounded w-1/3"></div>
                    <div className="h-4 bg-surface-container-low rounded w-2/3"></div>
                    <div className="h-3 bg-surface-container-low rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p className="col-span-full text-on-surface-variant text-center py-8">
              No courses found. Try adjusting your filters.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
