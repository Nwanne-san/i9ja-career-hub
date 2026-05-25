// ============================================================
// NEW THREAD FORM PAGE - Create new forum discussions
// Routes: GET /forums/new or POST /forums/new
// ============================================================

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NewThreadPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'tech-ecosystem',
    description: '',
    tags: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = [
    { value: 'tech-ecosystem', label: 'Tech Ecosystem' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'career-advice', label: 'Career Advice' },
    { value: 'money-talk', label: 'Money Talk' },
    { value: 'real-estate', label: 'Real Estate & Rent' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New thread submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        title: '',
        category: 'tech-ecosystem',
        description: '',
        tags: '',
      })
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-headline-lg font-headline-lg mb-2">Start a New Discussion</h1>
          <p className="text-on-surface-variant text-body-lg mb-8">
            Share your thoughts, ask questions, and engage with the community
          </p>

          {submitted ? (
            <div className="bg-success-green bg-opacity-10 border border-success-green rounded-xl p-6 text-on-surface text-center">
              <p className="text-headline-md font-headline-md mb-2">Thread created successfully!</p>
              <p className="text-body-lg">Your discussion is now live and visible to the community.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-low-contrast p-6 sm:p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Discussion Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  required
                  maxLength={200}
                  className="w-full px-4 py-3 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-body-sm text-on-surface-variant mt-1">{formData.title.length}/200</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about your discussion. Be clear and concise."
                  required
                  maxLength={5000}
                  rows={6}
                  className="w-full px-4 py-3 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                <p className="text-body-sm text-on-surface-variant mt-1">{formData.description.length}/5000</p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="#react #hiring #tips"
                  className="w-full px-4 py-3 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-body-sm text-on-surface-variant mt-1">Add up to 5 tags to help others find your discussion</p>
              </div>

              {/* Guidelines */}
              <div className="bg-surface-container-low p-4 rounded-lg">
                <h3 className="text-label-bold text-on-surface mb-2">Before posting:</h3>
                <ul className="text-body-sm text-on-surface-variant space-y-1">
                  <li>✓ Check if your question has been asked before</li>
                  <li>✓ Be respectful and constructive</li>
                  <li>✓ Avoid spam and self-promotion</li>
                  <li>✓ Follow our community guidelines</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95 flex-1 sm:flex-none"
                >
                  Post Discussion
                </button>
                <button
                  type="button"
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary-fixed transition-all flex-1 sm:flex-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
