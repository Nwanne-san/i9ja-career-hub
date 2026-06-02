// ============================================================
// JOBS PAGE - Job listings and search
// Routes: GET /jobs
// ============================================================

'use client'

import { useState } from 'react'
import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLocation, setFilterLocation] = useState('all')

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Paystack',
      location: 'Remote (Lagos)',
      verified: true,
      salary: '₦1.2M - 1.8M /mo',
      type: 'Full-time',
      match: '92% AI Match',
      description: 'Build responsive web applications with React and TypeScript',
      tags: ['React', 'TypeScript', 'TailwindCSS'],
    },
    {
      id: 2,
      title: 'Product Designer (UI/UX)',
      company: 'Moniepoint',
      location: 'Victoria Island',
      verified: false,
      salary: '₦900k - 1.5M /mo',
      type: 'Contract',
      match: '85% AI Match',
      description: 'Design beautiful and functional user interfaces',
      tags: ['Figma', 'UX Research', 'Prototyping'],
    },
    {
      id: 3,
      title: 'Backend Engineer (Python)',
      company: 'Flutterwave',
      location: 'Remote (Worldwide)',
      verified: true,
      salary: '₦1.5M - 2.2M /mo',
      type: 'Full-time',
      match: '88% AI Match',
      description: 'Build scalable payment infrastructure',
      tags: ['Python', 'PostgreSQL', 'AWS'],
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'Interswitch',
      location: 'Ikoyi, Lagos',
      verified: true,
      salary: '₦900k - 1.3M /mo',
      type: 'Full-time',
      match: '78% AI Match',
      description: 'Analyze and visualize payment data trends',
      tags: ['SQL', 'Python', 'Tableau'],
    },
  ]

  const filteredJobs = jobs.filter(job =>
    (filterLocation === 'all' || job.location.includes(filterLocation)) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        {/* Header */}
        <div className="py-8 sm:py-12">
          <h1 className="text-headline-lg font-headline-lg mb-4">Latest Job Opportunities</h1>
          <p className="text-on-surface-variant text-body-lg max-w-2xl">Find your next opportunity in Nigeria&apos;s fastest-growing tech ecosystem</p>
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-1 md:col-span-2 px-4 py-3 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
          />
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-3 border border-border-low-contrast rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Lagos">Lagos</option>
            <option value="Victoria Island">Victoria Island</option>
          </select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-bg-card p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-border-low-contrast hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-headline-md font-headline-md flex items-center gap-2">
                    {job.title}
                    {job.verified && (
                      <span className="material-symbols-outlined text-success-green text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    )}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">{job.company} • {job.location}</p>
                </div>
                <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">
                  bookmark
                </button>
              </div>

              <p className="text-body-sm text-on-surface-variant mb-4">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-label-pill rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-label-pill rounded-lg font-bold">
                  {job.salary}
                </span>
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-label-pill rounded-lg">
                  {job.type}
                </span>
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-label-pill rounded-lg">
                  {job.match}
                </span>
              </div>

              <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition-all">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-on-surface-variant text-body-lg">No jobs found matching your criteria</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
