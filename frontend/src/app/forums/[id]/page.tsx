'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import Badge from '@/modules/shared/component/Badge'
import { threadAPI, replyAPI } from '@/services/api'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

const replySchema = z.object({
  body: z.string().min(10, 'Reply must be at least 10 characters'),
})

type ReplyFormData = z.infer<typeof replySchema>

export default function ThreadDetailPage() {
  const router = useRouter()
  const params = useParams()
  const threadId = params.id as string
  const { user } = useSelector((state: RootState) => state.auth)
  const [thread, setThread] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [replying, setReplying] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [threadRes, repliesRes] = await Promise.all([
          threadAPI.getById(threadId),
          replyAPI.getByThread(threadId),
        ])
        setThread(threadRes.data)
        setReplies(repliesRes.data)
      } catch (err: any) {
        setError('Failed to load thread')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [threadId])

  const onSubmitReply = async (data: ReplyFormData) => {
    if (!user) {
      router.push('/login')
      return
    }
    setReplying(true)
    try {
      const response = await replyAPI.create(threadId, {
        body: data.body,
      })
      setReplies([...replies, response.data])
      reset()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post reply')
    } finally {
      setReplying(false)
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

  if (!thread) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Thread not found</div>
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
        {/* Thread */}
        <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-6 mb-8">
          <div className="mb-4 flex gap-2">
            <Badge variant="primary">{thread.categoryId}</Badge>
            <span className="text-on-surface-variant text-sm">
              Posted by <span className="font-semibold text-primary">{thread.author?.displayName}</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface mb-4">{thread.title}</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-6">{thread.body}</p>
          <div className="flex gap-4 text-on-surface-variant">
            <span>👁️ {thread.viewCount || 0} views</span>
            <span>💬 {thread.replyCount || 0} replies</span>
            <span>👍 {thread.likeCount || 0} likes</span>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-on-surface">Replies ({replies.length})</h2>
          {replies.map((reply) => (
            <div key={reply.id} className="bg-bg-card border border-border-low-contrast rounded-lg p-4">
              <div className="flex gap-3 mb-3">
                <img
                  src={reply.author?.avatarUrl}
                  alt={reply.author?.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold text-primary">{reply.author?.displayName}</p>
                  <p className="text-xs text-on-surface-variant">
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-on-surface">{reply.body}</p>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-6">
          <h2 className="text-xl font-bold text-on-surface mb-4">Post a Reply</h2>
          {!user ? (
            <p className="text-on-surface-variant mb-4">
              <a href="/login" className="text-primary font-semibold">
                Sign in
              </a>{' '}
              to post a reply
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmitReply)} className="space-y-4">
              <textarea
                {...register('body')}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.body && <p className="text-error text-sm">{errors.body.message}</p>}
              <Button type="submit" disabled={replying}>
                {replying ? 'Posting...' : 'Post Reply'}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
