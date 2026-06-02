// ============================================================
// REPORT CONTENT PAGE - Report inappropriate content
// Routes: GET /report or POST /report
// ============================================================

'use client'

import { useState } from 'react'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'

export default function ReportPage() {
  const [formData, setFormData] = useState({
    contentType: 'post',
    contentId: '',
    reportReason: 'spam',
    severity: 'medium',
    description: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Report submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        contentType: 'post',
        contentId: '',
        reportReason: 'spam',
        severity: 'medium',
        description: '',
      })
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-headline-lg font-headline-lg mb-2">Report Content</h1>
          <p className="text-on-surface-variant text-body-lg mb-8">
            Help us maintain a safe community by reporting inappropriate content
          </p>

          {submitted ? (
            <div className="bg-success-green bg-opacity-10 border border-success-green rounded-xl p-6 text-on-surface text-center">
              <p className="text-headline-md font-headline-md mb-2">Thank you for reporting!</p>
              <p className="text-body-lg">Our team will review your report within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-bg-card rounded-xl border border-border-low-contrast p-6 sm:p-8 space-y-6">
              {/* Content Type */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">What type of content?</label>
                <select
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary bg-bg-card"
                >
                  <option value="post">Forum Post</option>
                  <option value="comment">Comment</option>
                  <option value="job">Job Listing</option>
                  <option value="course">Course</option>
                  <option value="profile">User Profile</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Content ID */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Content ID or Link</label>
                <input
                  type="text"
                  name="contentId"
                  value={formData.contentId}
                  onChange={handleChange}
                  placeholder="Enter the post ID, URL, or reference"
                  required
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Report Reason */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">What&apos;s the issue?</label>
                <select
                  name="reportReason"
                  value={formData.reportReason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary bg-bg-card"
                >
                  <option value="spam">Spam or Phishing</option>
                  <option value="harassment">Harassment or Bullying</option>
                  <option value="hate">Hate Speech</option>
                  <option value="misinformation">Misinformation</option>
                  <option value="inappropriate">Inappropriate Content</option>
                  <option value="fraud">Fraud or Scam</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">How severe?</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary bg-bg-card"
                >
                  <option value="low">Low - Minor issue</option>
                  <option value="medium">Medium - Needs attention</option>
                  <option value="high">High - Serious violation</option>
                  <option value="critical">Critical - Urgent action needed</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-label-bold text-on-surface mb-2">Additional Details</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide any additional context about the report"
                  rows={4}
                  className="w-full px-4 py-2 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Privacy Notice */}
              <div className="bg-surface-container-low p-4 rounded-lg">
                <p className="text-body-sm text-on-surface-variant">
                  Your report will be kept confidential. We&apos;ll review it as soon as possible and take appropriate action. You may receive updates about your report via email.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all flex-1 sm:flex-none"
                >
                  Submit Report
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
