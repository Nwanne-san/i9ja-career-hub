// ============================================================
// COURSES PAGE - Free courses and learning materials
// Routes: GET /courses
// ============================================================

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CoursesPage() {
  const [categoryFilter, setCategoryFilter] = useState('all')

  const courses = [
    {
      id: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIEGO62BzHqEJwtKGKm0ZY8ZcMZIbvKPlT4DCGM2nm1mPUaw9dq8SotFm_7w1G7pSoxpVLBL-m6BhXctjonjUlHB_cg6AKgz8m9GqzwatbG2fPY_2LkSZDI3IFh-RI-Is0XtlMpBobCirPHh3rNueP7uV6wm6RY7hGfzhYyAQwfCcPS01REoVOhn6l0IeumxELHjwpo-TbiOeWU1DuSX3uEwpCvpzKaIkRaT5et4IczpsbM9XEeRDoSSWkuvbcnCueh6CrnR9uJnI',
      category: 'Design',
      categoryColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      title: 'UI/UX Fundamentals for Startups',
      description: 'Learn the basics of user interface and experience design',
      instructor: 'Chioma Obi',
      students: '2.4k',
      rating: 4.8,
      duration: '4 weeks',
      price: 'Free',
    },
    {
      id: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATEQn76Ol0QiSSvyst0YoPMh0rRmvP2EZcHQM9EokjBAkHiv2gMwSOkp5x_KkfA5_d72rZdrk9hWrUQ8SvYNljeP2BRcST-4Yb2N-AmepBHfp5touxEsH2Cy4i3U5GfTb0-v3BkxYFPCaJbpA92zp3uZG-vqjUbMhGUHThw2iYGfRhwVdz1gRwW9ddQrejhsYLW8eJDNSo6drpslA5rSmNA1-wAb1t1zAkOq7qp3xIHhwfp1mgyS_PhfUo9PKrn7mkFPciIHAlJbY',
      category: 'Development',
      categoryColor: 'bg-secondary-container text-on-secondary-container',
      title: 'React for Nigerian Fintechs',
      description: 'Build fintech applications with React',
      instructor: 'Tunde James',
      students: '5.2k',
      rating: 4.9,
      duration: '6 weeks',
      price: 'Free for 3 days',
    },
    {
      id: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB50OgTrAqB4RZ3WSdvvLJZQhdVO4IhWueOR6SSWpp3FSv0dJm-w78lL4Y1DSwN5b0CXK12MN_SZaAorGIinFs93mJgwmcfaIwwclnENW2kyrVrHjOGpd7OWQot5LL8VARvW4Ygivqq3PzwBHMzPv_x2o7L8ItGwD5F2DzhiUAa1n2fYKfAK7fdX-fAnootrlLpx5NLnjDYYps9ptxYkIHbZF33Z7OWu83MfJIFw_rvdPOyYFl2S9NZ-YhBkjvq7DnvCyieZ6-qBAk',
      category: 'Business',
      categoryColor: 'bg-primary-fixed text-on-primary-fixed-variant',
      title: 'Product Management 101',
      description: 'Master the fundamentals of product management',
      instructor: 'Bola Adeyemi',
      students: '3.1k',
      rating: 4.7,
      duration: '5 weeks',
      price: 'Free',
    },
  ]

  const categories = ['all', 'Design', 'Development', 'Business']
  const filteredCourses = categoryFilter === 'all' 
    ? courses 
    : courses.filter(c => c.category === categoryFilter)

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        {/* Header */}
        <div className="py-8 sm:py-12 mb-8">
          <h1 className="text-headline-lg font-headline-lg mb-4">Free Courses & Learning</h1>
          <p className="text-on-surface-variant text-body-lg max-w-2xl">Upskill with industry experts and grow your career in tech</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl border border-border-low-contrast hover:shadow-lg transition-all overflow-hidden group">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform" />
              
              <div className="p-4">
                <span className={`inline-block px-3 py-1 text-label-pill rounded-full text-xs font-bold mb-3 ${course.categoryColor}`}>
                  {course.category}
                </span>
                
                <h3 className="text-headline-md font-headline-md mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-body-sm text-on-surface-variant mb-4">{course.description}</p>

                <div className="flex items-center justify-between mb-4 text-body-sm text-on-surface-variant">
                  <span>{course.students} students</span>
                  <span>⭐ {course.rating}</span>
                </div>

                <div className="flex items-center justify-between mb-4 text-body-sm">
                  <span className="text-on-surface-variant">{course.duration}</span>
                  <span className="font-bold text-primary">{course.price}</span>
                </div>

                <div className="text-body-sm text-on-surface-variant mb-4">By {course.instructor}</div>

                <button className="w-full bg-primary text-on-primary py-2 rounded-lg font-bold hover:bg-primary-container transition-all">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
