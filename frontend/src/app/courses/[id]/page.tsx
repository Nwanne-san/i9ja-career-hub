'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { courseAPI } from '@/services/api'
import { useParams, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/redux/store'
import type { Course } from '@/types'
import { enrollCourse } from '@/redux/store/slices/courseSlice'

export default function CourseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { enrolledCourses } = useSelector((state: RootState) => state.courses)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [error, setError] = useState('')
  const isEnrolled = enrolledCourses.includes(courseId)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseAPI.getById(courseId)
        setCourse(response.data as Course)
      } catch {
        setError('Failed to load course')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [courseId])

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    setEnrolling(true)
    try {
      await courseAPI.enroll(courseId)
      dispatch(enrollCourse(courseId))
      alert('Successfully enrolled in course!')
    } catch {
      setError('Failed to enroll')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
        <Footer />
      </>
    )
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Course not found</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary-container transition-colors"
        >
          ← Back
        </button>
        {error && (
          <div className="bg-error/10 border border-error text-error rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-8 mb-8">
          {course.thumbnailEmoji && (
            <div className="text-6xl mb-4">{course.thumbnailEmoji}</div>
          )}
          
          <h1 className="text-3xl font-bold text-on-surface mb-2">{course.title}</h1>
          <p className="text-lg text-primary font-semibold mb-6">{course.provider}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 py-4 border-y border-border-low-contrast">
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Level</p>
              <p className="font-semibold capitalize">{course.level}</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Students</p>
              <p className="font-semibold">{course.studentCount?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Rating</p>
              <p className="font-semibold">⭐ {course.rating || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Price</p>
              <p className="font-semibold">{course.free ? 'Free' : 'Paid'}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-on-surface mb-4">About this course</h2>
            <p className="text-on-surface-variant leading-relaxed">
              Learn {course.title} from {course.provider}. This {course.level} level course is designed
              to teach you everything you need to know about {course.category}.
            </p>
          </div>

          <div className="flex gap-4">
            {isEnrolled ? (
              <div className="text-success-green font-semibold">✓ Already enrolled</div>
            ) : (
              <Button onClick={handleEnroll} disabled={enrolling}>
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </Button>
            )}
            <Button variant="ghost" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
