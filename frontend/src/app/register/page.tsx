'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { authAPI } from '@/services/api'
import { AppRoutes } from '@/routes/app.routes'
import { addNotification } from '@/redux/store/slices/notificationSlice'

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
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(true)
  const [password, setPassword] = useState('')

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
      
      // Create welcome notifications
      dispatch(addNotification({
        id: '1',
        type: 'system',
        message: 'Welcome to i9ja! 🎉 Your account has been created successfully.',
        read: false,
        createdAt: new Date().toISOString(),
        href: AppRoutes.home,
      }))
      
      dispatch(addNotification({
        id: '2',
        type: 'new_course',
        message: 'Check out our latest courses and opportunities available for you!',
        read: false,
        createdAt: new Date().toISOString(),
        href: AppRoutes.courses,
      }))
      
      router.push(`/login?email=${encodeURIComponent(data.email)}`)
    } catch {
      setError('Failed to create account')
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
      <div className="min-h-screen bg-bg-base pt-20 pb-16 px-4 sm:px-6 flex items-center justify-center">
        <div className="bg-bg-card rounded-2xl p-4 sm:p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Create Account</h1>
            <button
              onClick={handleCancel}
              className="text-on-surface-variant hover:text-on-surface text-xl sm:text-2xl flex-shrink-0 ml-2"
              title="Close"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="bg-error/10 border border-error text-error rounded-lg p-3 mb-3 sm:mb-4 text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-on-surface mb-1">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-xs sm:text-sm"
              />
              {errors.email && <p className="text-error text-xs mt-0.5">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="displayName" className="block text-xs sm:text-sm font-medium text-on-surface mb-1">
                Full Name
              </label>
              <input
                {...register('displayName')}
                type="text"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-xs sm:text-sm"
              />
              {errors.displayName && <p className="text-error text-xs mt-0.5">{errors.displayName.message}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-on-surface mb-1">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                placeholder="e.g., Lagos, Nigeria"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-xs sm:text-sm"
              />
              {errors.location && <p className="text-error text-xs mt-0.5">{errors.location.message}</p>}
            </div>

            <div>
              <label htmlFor="bio" className="block text-xs sm:text-sm font-medium text-on-surface mb-1">
                Bio
              </label>
              <textarea
                {...register('bio')}
                placeholder="Tell us about yourself"
                rows={1}
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-xs sm:text-sm resize-none"
              />
              {errors.bio && <p className="text-error text-xs mt-0.5">{errors.bio.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-on-surface mb-1">
                Password
              </label>
              <input
                {...register('password', {
                  onChange: (e) => setPassword(e.target.value)
                })}
                type="password"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-xs sm:text-sm"
              />
              {errors.password && <p className="text-error text-xs mt-0.5">{errors.password.message}</p>}
              
              {password && (
                <div className="mt-2 sm:mt-3 space-y-1">
                  <p className="text-xs font-medium text-on-surface-variant">Requirements:</p>
                  <div className="space-y-0.5">
                    <div className={`flex items-center gap-1.5 text-xs ${password.length >= 8 ? 'text-green-600' : 'text-on-surface-variant'}`}>
                      <span className={`w-1 h-1 rounded-full ${password.length >= 8 ? 'bg-green-600' : 'bg-border-low-contrast'}`} />
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-on-surface-variant'}`}>
                      <span className={`w-1 h-1 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-600' : 'bg-border-low-contrast'}`} />
                      <span>Uppercase</span>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs ${/[0-9]/.test(password) ? 'text-green-600' : 'text-on-surface-variant'}`}>
                      <span className={`w-1 h-1 rounded-full ${/[0-9]/.test(password) ? 'bg-green-600' : 'bg-border-low-contrast'}`} />
                      <span>Number</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-on-surface mb-1">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary text-xs sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-error text-xs mt-0.5">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
              <Button type="submit" disabled={loading} className="flex-1 text-xs sm:text-sm py-2">
                {loading ? 'Creating...' : 'Create Account'}
              </Button>
              <Button type="button" variant="ghost" onClick={handleCancel} className="flex-1 text-xs sm:text-sm py-2">
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
