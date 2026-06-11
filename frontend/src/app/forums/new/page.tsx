'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { threadAPI } from '@/services/api'
import { FORUM_CATEGORIES } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

const threadSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  body: z.string().min(20, 'Content must be at least 20 characters'),
  categoryId: z.string().min(1, 'Select a category'),
  tags: z.string(),
})

type ThreadFormData = z.infer<typeof threadSchema>

export default function NewThreadPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThreadFormData>({
    resolver: zodResolver(threadSchema),
  })

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-on-surface-variant mb-4">You must be signed in to create a thread</p>
            <Button href="/login">Sign In</Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const onSubmit = async (data: ThreadFormData) => {
    setLoading(true)
    setError('')
    try {
      await threadAPI.create({
        title: data.title,
        body: data.body,
        categoryId: data.categoryId,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
      })
      router.push('/forums')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create thread')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary-container transition-colors"
        >
          ← Back
        </button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Start a New Thread</h1>
          <p className="text-on-surface-variant">Share your thoughts with the community</p>
        </div>

        <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-8">
          {error && (
            <div className="bg-error/10 border border-error text-error rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-on-surface mb-2">
                Category
              </label>
              <select
                {...register('categoryId')}
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="">Select a category</option>
                {FORUM_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-error text-sm mt-1">{errors.categoryId.message}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-on-surface mb-2">
                Title
              </label>
              <input
                {...register('title')}
                type="text"
                placeholder="What's your question or topic?"
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-on-surface mb-2">
                Content
              </label>
              <textarea
                {...register('body')}
                placeholder="Describe your thread in detail..."
                rows={8}
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.body && <p className="text-error text-sm mt-1">{errors.body.message}</p>}
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-on-surface mb-2">
                Tags (comma-separated)
              </label>
              <input
                {...register('tags')}
                type="text"
                placeholder="e.g., react, typescript, debugging"
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Thread'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
