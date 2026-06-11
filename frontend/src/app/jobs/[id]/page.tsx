'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import Badge from '@/modules/shared/component/Badge'
import { jobAPI } from '@/services/api'
import { useParams, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/redux/store'
import { saveJob, unsaveJob } from '@/redux/store/slices/jobSlice'

export default function JobDetailPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { savedJobs } = useSelector((state: RootState) => state.jobs)
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [error, setError] = useState('')
  const isSaved = savedJobs.includes(jobId)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobAPI.getById(jobId)
        setJob(response.data)
      } catch (err: any) {
        setError('Failed to load job')
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [jobId])

  const handleApply = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    setApplying(true)
    try {
      await jobAPI.apply(jobId, { message: 'I am interested in this position' })
      alert('Application submitted successfully!')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to apply')
    } finally {
      setApplying(false)
    }
  }

  const handleSave = async () => {
    if (!user) {
      router.push('/login')
      return
    }
    try {
      if (isSaved) {
        await jobAPI.unsaveJob(jobId)
        dispatch(unsaveJob(jobId))
      } else {
        await jobAPI.saveJob(jobId)
        dispatch(saveJob(jobId))
      }
    } catch (err) {
      console.error('Failed to save job', err)
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

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Job not found</div>
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
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-on-surface mb-2">{job.title}</h1>
              <p className="text-lg text-primary font-semibold">{job.company}</p>
            </div>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-primary text-primary-container border-primary'
                  : 'border-border-low-contrast text-on-surface hover:bg-bg-base'
              }`}
            >
              {isSaved ? '💾 Saved' : '📌 Save'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 py-4 border-y border-border-low-contrast">
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Location</p>
              <p className="font-semibold">{job.location}</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Type</p>
              <Badge variant="primary">{job.type}</Badge>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Salary</p>
              <p className="font-semibold">{job.salary || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Posted</p>
              <p className="font-semibold text-sm">{new Date(job.postedAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-bold text-on-surface mb-4">About this role</h2>
            <p className="text-on-surface-variant leading-relaxed">{job.description}</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleApply} disabled={applying}>
              {applying ? 'Applying...' : '✉️ Apply Now'}
            </Button>
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
