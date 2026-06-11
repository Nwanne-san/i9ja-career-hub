'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { authAPI } from '@/services/api'
import { AppRoutes } from '@/routes/app.routes'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
  location: z.string().max(100, 'Location must be 100 characters or less').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setError('')
    try {
      await authAPI.register({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        bio: data.bio,
        location: data.location,
        website: data.website,
      })
      router.push(`/login?email=${encodeURIComponent(data.email)}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setTimeout(() => router.push('/'), 300)
  }

  if (!showModal) {
    return (
      <>
        <Navbar />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 pt-20">
        <div className="bg-bg-card rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-on-surface">Create Account</h1>
            <button
              onClick={handleCancel}
              className="text-on-surface-variant hover:text-on-surface text-2xl"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="bg-error/10 border border-error text-error rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-1">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-on-surface mb-1">
                Full Name
              </label>
              <input
                {...register('displayName')}
                type="text"
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.displayName && <p className="text-error text-xs mt-1">{errors.displayName.message}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-on-surface mb-1">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                placeholder="e.g., Lagos, Nigeria"
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.location && <p className="text-error text-xs mt-1">{errors.location.message}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-on-surface mb-1">
                Bio
              </label>
              <textarea
                {...register('bio')}
                placeholder="Tell us about yourself"
                rows={2}
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.bio && <p className="text-error text-xs mt-1">{errors.bio.message}</p>}
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-on-surface mb-1">
                Website
              </label>
              <input
                {...register('website')}
                type="url"
                placeholder="https://yourwebsite.com"
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.website && <p className="text-error text-xs mt-1">{errors.website.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-on-surface mb-1">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-on-surface mb-1">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="w-full px-3 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-error text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1 text-sm py-2">
                {loading ? 'Creating...' : 'Create Account'}
              </Button>
              <Button type="button" variant="ghost" onClick={handleCancel} className="flex-1 text-sm py-2">
                Cancel
              </Button>
            </div>

            <p className="text-center text-xs text-on-surface-variant">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push(AppRoutes.login)}
                className="text-primary font-semibold hover:text-primary-container"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
