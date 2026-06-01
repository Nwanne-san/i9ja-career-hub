// ============================================================
// EDIT PROFILE PAGE - User profile editing
// Routes: GET /profile/edit or POST /profile/edit
// ============================================================

'use client'

import { useState } from 'react'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Tunde Adebayo',
    email: 'tunde@example.com',
    role: 'Senior Frontend Developer',
    location: 'Lagos, Nigeria',
    bio: 'Building scalable web applications with React and TypeScript.',
    company: 'Tech Company Ltd',
    website: 'https://tunde.dev',
    twitter: '@tundeadebayo',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
    alert('Profile updated successfully!')
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-headline-lg font-headline-lg mb-8">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="bg-bg-card rounded-xl border border-border-low-contrast p-6 sm:p-8">
            {/* Profile Picture */}
            <div className="mb-8">
              <label className="block text-label-bold text-on-surface mb-3">Profile Picture</label>
              <div className="flex items-center gap-4">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtoLtq7YBRiQl9lmRt-JPEsYLPKDJSU1JbhZPWZ4cmz4YHzUXypINzWcV9_w3_FLhgF-OZV75N0bNc_tX0Azgo_1y1u_rNBnxtxrDnLc0aYtiunXljowvkvL6Za3lSrnS4VQ294SOzytKS-RV0ExDJ19dTgxHZXZ-kiF3R9HD4s14rbd3N3awMVuQwmhFzf_zTDLHdUvV8NNcg-QX6PE304PjXiemlw6SIowdMkMKjl5MAFzbSfJIeQPCsln6SyELdT24daZr2_YI"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <button type="button" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold">
                  Upload New Photo
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Role/Title</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Twitter Handle</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-label-bold text-on-surface mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 mt-8">
              <button type="submit" className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all">
                Save Changes
              </button>
              <button type="button" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary-fixed transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
