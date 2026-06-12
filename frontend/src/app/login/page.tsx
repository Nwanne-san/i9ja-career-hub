'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { authAPI } from '@/services/api'
import { AppRoutes } from '@/routes/app.routes'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(true)
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    const email = searchParams.get('email')
    if (email) {
      setValue('email', email)
    }
  }, [searchParams, setValue])

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError('')
    try {
      await authAPI.login(data.email, data.password)
      router.push('/')
    } catch {
      setError('Login failed. Please try again.')
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
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Welcome Back</h1>
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
              {errors.email && (
                <p className="text-error text-xs mt-0.5">{errors.email.message}</p>
              )}
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
              {errors.password && (
                <p className="text-error text-xs mt-0.5">{errors.password.message}</p>
              )}
              
              {password && (
                <div className="mt-2 sm:mt-3 space-y-1">
                  <p className="text-xs font-medium text-on-surface-variant">Requirements:</p>
                  <div className="space-y-0.5">
                    <div className={`flex items-center gap-1.5 text-xs ${password.length >= 6 ? 'text-green-600' : 'text-on-surface-variant'}`}>
                      <span className={`w-1 h-1 rounded-full ${password.length >= 6 ? 'bg-green-600' : 'bg-border-low-contrast'}`} />
                      <span>6+ characters</span>
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

            <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
              <Button type="submit" disabled={loading} className="flex-1 text-xs sm:text-sm py-2">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button type="button" variant="ghost" onClick={handleCancel} className="flex-1 text-xs sm:text-sm py-2">
                Cancel
              </Button>
            </div>

            <p className="text-center text-xs text-on-surface-variant">
              Don&rsquo;t have an account?{' '}
              <button
                type="button"
                onClick={() => router.push(AppRoutes.register)}
                className="text-primary font-semibold hover:text-primary-container"
              >
                Create one
              </button>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
