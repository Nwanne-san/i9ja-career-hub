'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/modules/shared/component/Button'
import { setCredentials } from '@/redux/store/slices/authSlice'
import { apiClient } from '@/services/api'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import {
  createMockAuthSession,
  getSafeReturnUrl,
  isAuthResponse,
  setAuthCookie,
  shouldUseMockAuth,
} from '@/utils/authSession'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

function commitAuthSession(
  dispatch: ReturnType<typeof useDispatch>,
  session: { accessToken: string; user: ReturnType<typeof createMockAuthSession>['user'] }
) {
  dispatch(setCredentials(session))
  setAuthCookie(session.accessToken)
}

export default function AuthPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login'
  const returnUrl = getSafeReturnUrl(searchParams.get('returnUrl'))

  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialTab)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    setAuthMode(searchParams.get('tab') === 'register' ? 'register' : 'login')
  }, [searchParams])

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      if (isAuthResponse(response.data)) {
        commitAuthSession(dispatch, response.data)
        router.push(returnUrl)
        return
      }

      throw new Error('Invalid login response')
    } catch (err) {
      if (shouldUseMockAuth(err)) {
        const mockSession = createMockAuthSession(data.email)
        commitAuthSession(dispatch, mockSession)
        router.push(returnUrl)
        return
      }
      setError('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.post('/auth/register', {
        displayName: data.displayName,
        email: data.email,
        password: data.password,
      })

      if (isAuthResponse(response.data)) {
        commitAuthSession(dispatch, response.data)
        router.push(returnUrl)
        return
      }

      throw new Error('Invalid register response')
    } catch (err) {
      if (shouldUseMockAuth(err)) {
        const mockSession = createMockAuthSession(data.email, data.displayName)
        commitAuthSession(dispatch, mockSession)
        router.push(returnUrl)
        return
      }
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-bg-card border border-border-low-contrast rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-on-surface mb-2 text-center">
            {authMode === 'login' ? 'Welcome Back' : 'Join i9ja'}
          </h1>
          <p className="text-on-surface-variant text-center mb-8 text-sm">
            {authMode === 'login'
              ? 'Login to access the Nigerian community platform'
              : 'Create an account to get started'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          {authMode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Email
                </label>
                <input
                  {...loginForm.register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-error text-xs mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Password
                </label>
                <input
                  {...loginForm.register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-error text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Link href="/auth/forgot-password" className="text-primary text-sm hover:underline">
                Forgot password?
              </Link>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full justify-center py-2"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Full Name
                </label>
                <input
                  {...registerForm.register('displayName')}
                  type="text"
                  placeholder="Tunde Adebayo"
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {registerForm.formState.errors.displayName && (
                  <p className="text-error text-xs mt-1">{registerForm.formState.errors.displayName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Email
                </label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-error text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Password
                </label>
                <input
                  {...registerForm.register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-error text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Confirm Password
                </label>
                <input
                  {...registerForm.register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-error text-xs mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full justify-center py-2"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-on-surface-variant text-sm">
              {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login')
                  setError(null)
                  loginForm.reset()
                  registerForm.reset()
                }}
                className="text-primary font-semibold hover:underline"
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
