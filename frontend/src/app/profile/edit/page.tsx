'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'
import Button from '@/modules/shared/component/Button'
import { userAPI } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/redux/store'
import { setCredentials } from '@/redux/store/slices/authSlice'

const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be 500 characters or less'),
  location: z.string().max(100, 'Location must be 100 characters or less'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function EditProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName,
        bio: user.bio || '',
        location: user.location || '',
        website: '',
      })
      setLoading(false)
    } else {
      router.push('/login')
    }
  }, [user, router, reset])

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const response = await userAPI.updateProfile({
        displayName: data.displayName,
        bio: data.bio,
        location: data.location,
        website: data.website,
      })
      dispatch(setCredentials({ accessToken: user?.id || '', user: response.data }))
      setSuccess('Profile updated successfully!')
      setTimeout(() => router.push('/profile'), 1500)
    } catch {
      setError('Failed to update profile')
    } finally {
      setSaving(false)
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

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 md:pb-12 px-4 sm:px-6 max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary-container transition-colors"
        >
          ← Back
        </button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Edit Profile</h1>
          <p className="text-on-surface-variant">Update your profile information</p>
        </div>

        <div className="bg-bg-card border border-border-low-contrast rounded-2xl p-8">
          {error && (
            <div className="bg-error/10 border border-error text-error rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-success-green/10 border border-success-green text-success-green rounded-lg p-4 mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-on-surface mb-2">
                Full Name
              </label>
              <input
                {...register('displayName')}
                type="text"
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.displayName && (
                <p className="text-error text-sm mt-1">{errors.displayName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-on-surface mb-2">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                placeholder="e.g., Lagos, Nigeria"
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.location && (
                <p className="text-error text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-on-surface mb-2">
                Bio
              </label>
              <textarea
                {...register('bio')}
                placeholder="Tell us about yourself"
                rows={4}
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.bio && (
                <p className="text-error text-sm mt-1">{errors.bio.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-on-surface mb-2">
                Website
              </label>
              <input
                {...register('website')}
                type="url"
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-2 border border-border-low-contrast rounded-lg bg-bg-base text-on-surface focus:outline-none focus:border-primary"
              />
              {errors.website && (
                <p className="text-error text-sm mt-1">{errors.website.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
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
