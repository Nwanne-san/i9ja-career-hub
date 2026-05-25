// ============================================================
// HOME PAGE - All sections consolidated in one file
// Routes: GET /
// ============================================================

'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ============================================================
// SECTION: Ad Zone (Top)
// ============================================================
function AdZone() {
  return (
    <div className="my-3 sm:my-6 w-full h-20 sm:h-24 bg-surface-container-low border border-border-low-contrast rounded-lg sm:rounded-xl flex items-center justify-center relative overflow-hidden">
      <span className="absolute top-1 sm:top-2 left-1 sm:left-2 px-2 py-0.5 bg-on-surface-variant/10 text-[8px] sm:text-[10px] font-bold rounded">AD</span>
      <p className="text-on-surface-variant font-body-sm text-xs sm:text-body-sm italic px-2">Featured Platform Update: New Tech Mentorship Program Starting Soon!</p>
    </div>
  )
}

// ============================================================
// SECTION: Hero Section
// ============================================================
function HeroSection() {
  return (
    <section className="py-6 sm:py-12 px-gutter flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full mb-3 sm:mb-6 shadow-sm">
        <span className="material-symbols-outlined text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          groups
        </span>
        <span className="font-label-pill text-label-pill text-xs sm:text-sm">Trusted by 48,200+ Nigerian Professionals</span>
      </div>
      
      <h1 className="font-headline-lg text-headline-lg max-w-3xl mb-4 sm:mb-6 px-2">
        Your Nigerian hub for jobs, courses &amp; community
      </h1>
      
      <div className="w-full max-w-2xl bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-2xl shadow-md border border-border-low-contrast flex flex-col md:flex-row gap-1.5 sm:gap-2">
        <div className="flex-1 flex items-center px-3 sm:px-4 gap-2 sm:gap-3 bg-surface-container-low rounded-lg sm:rounded-xl">
          <span className="material-symbols-outlined text-outline text-sm">search</span>
          <input
            className="w-full py-2 sm:py-3 bg-transparent border-none focus:ring-0 text-body-lg text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm"
            placeholder="Search jobs, skills..."
            type="text"
          />
        </div>
        <button className="bg-primary text-white font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-primary-container transition-all active:scale-95 text-xs sm:text-sm whitespace-nowrap">
          Find Opportunities
        </button>
      </div>
    </section>
  )
}

// ============================================================
// SECTION: Stats Section
// ============================================================
function StatsSection() {
  const stats = [
    { label: 'Members', value: '48k+' },
    { label: 'Active Jobs', value: '3k+' },
    { label: 'Free Courses', value: '820+' },
    { label: 'Forum Posts', value: '92k+' }
  ]

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-6 sm:py-8 px-gutter border-y border-border-low-contrast">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center border-l border-border-low-contrast first:border-l-0">
          <span className="text-headline-md font-headline-md text-primary text-lg sm:text-headline-md">{stat.value}</span>
          <span className="text-on-surface-variant font-body-sm text-xs sm:text-body-sm">{stat.label}</span>
        </div>
      ))}
    </section>
  )
}

// ============================================================
// SECTION: Courses (Horizontal Scroll)
// ============================================================
interface CourseCardProps {
  image: string
  category: string
  categoryColor: string
  title: string
  description: string
}

function CourseCard({ image, category, categoryColor, title, description }: CourseCardProps) {
  return (
    <div className="min-w-[240px] sm:min-w-[280px] bg-white rounded-lg sm:rounded-xl border border-border-low-contrast hover:shadow-lg transition-all group overflow-hidden">
      <img className="w-full h-24 sm:h-32 object-cover transition-transform group-hover:scale-105" src={image} alt={title} />
      <div className="p-3 sm:p-4">
        <span className={`inline-block px-2 py-1 text-on-tertiary-fixed-variant font-label-pill text-label-pill text-xs sm:text-sm rounded mb-1 sm:mb-2 ${categoryColor}`}>
          {category}
        </span>
        <h3 className="font-label-bold text-body-lg line-clamp-1 text-xs sm:text-body-lg">{title}</h3>
        <p className="text-on-surface-variant font-body-sm mt-1 text-xs sm:text-body-sm">{description}</p>
      </div>
    </div>
  )
}

function CoursesSection() {
  const courses = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIEGO62BzHqEJwtKGKm0ZY8ZcMZIbvKPlT4DCGM2nm1mPUaw9dq8SotFm_7w1G7pSoxpVLBL-m6BhXctjonjUlHB_cg6AKgz8m9GqzwatbG2fPY_2LkSZDI3IFh-RI-Is0XtlMpBobCirPHh3rNueP7uV6wm6RY7hGfzhYyAQwfCcPS01REoVOhn6l0IeumxELHjwpo-TbiOeWU1DuSX3uEwpCvpzKaIkRaT5et4IczpsbM9XEeRDoSSWkuvbcnCueh6CrnR9uJnI',
      category: 'Design',
      categoryColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      title: 'UI/UX Fundamentals for Startups',
      description: 'Free for 3 more days',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATEQn76Ol0QiSSvyst0YoPMh0rRmvP2EZcHQM9EokjBAkHiv2gMwSOkp5x_KkfA5_d72rZdrk9hWrUQ8SvYNljeP2BRcST-4Yb2N-AmepBHfp5touxEsH2Cy4i3U5GfTb0-v3BkxYFPCaJbpA92zp3uZG-vqjUbMhGUHThw2iYGfRhwVdz1gRwW9ddQrejhsYLW8eJDNSo6drpslA5rSmNA1-wAb1t1zAkOq7qp3xIHhwfp1mgyS_PhfUo9PKrn7mkFPciIHAlJbY',
      category: 'Development',
      categoryColor: 'bg-secondary-container text-on-secondary-container',
      title: 'React for Nigerian Fintechs',
      description: 'Instructor: Tunde James',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB50OgTrAqB4RZ3WSdvvLJZQhdVO4IhWueOR6SSWpp3FSv0dJm-w78lL4Y1DSwN5b0CXK12MN_SZaAorGIinFs93mJgwmcfaIwwclnENW2kyrVrHjOGpd7OWQot5LL8VARvW4Ygivqq3PzwBHMzPv_x2o7L8ItGwD5F2DzhiUAa1n2fYKfAK7fdX-fAnootrlLpx5NLnjDYYps9ptxYkIHbZF33Z7OWu83MfJIFw_rvdPOyYFl2S9NZ-YhBkjvq7DnvCyieZ6-qBAk',
      category: 'Business',
      categoryColor: 'bg-primary-fixed text-on-primary-fixed-variant',
      title: 'Product Management 101',
      description: '2.4k Students Enrolled',
    },
  ]

  return (
    <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-4 px-gutter">
      <div className="flex justify-between items-center">
        <h2 className="text-headline-md font-headline-md text-sm sm:text-headline-md">Free Courses This Week</h2>
        <a className="text-primary font-bold text-xs sm:text-body-sm flex items-center gap-1 hover:underline" href="#">
          View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
      <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 sm:pb-4 hide-scrollbar">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  )
}

// ============================================================
// SECTION: Forum Categories
// ============================================================
function ForumCategoriesSection() {
  const categories = [
    { emoji: '💼', label: 'Career Advice' },
    { emoji: '💻', label: 'Tech Stack' },
    { emoji: '💰', label: 'Money Talk' },
    { emoji: '🏠', label: 'Rent & Real Estate' },
  ]

  return (
    <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4 px-gutter">
      <h2 className="text-headline-md font-headline-md text-sm sm:text-headline-md">Forum Categories</h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {categories.map((cat, index) => (
          <a
            key={index}
            className="p-3 sm:p-4 bg-white border border-border-low-contrast rounded-lg sm:rounded-2xl flex flex-col gap-2 hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="text-xl sm:text-2xl">{cat.emoji}</span>
            <span className="font-label-bold text-on-surface text-xs sm:text-body-lg group-hover:text-primary transition-colors">
              {cat.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// SECTION: Featured Section (Courses + Categories)
// ============================================================
function FeaturedSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-8 sm:mt-12">
      <CoursesSection />
      <ForumCategoriesSection />
    </div>
  )
}

// ============================================================
// SECTION: Jobs Listing
// ============================================================
function JobsSection() {
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'Paystack',
      location: 'Remote (Lagos)',
      verified: true,
      tags: ['Full-time', '₦1.2M - 1.8M /mo', '92% AI Match'],
    },
    {
      title: 'Product Designer (UI/UX)',
      company: 'Moniepoint',
      location: 'Victoria Island',
      verified: false,
      tags: ['On-site', 'Contract', '85% AI Match'],
    },
  ]

  return (
    <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 px-gutter">
      <div className="flex justify-between items-center">
        <h2 className="text-headline-md font-headline-md text-sm sm:text-headline-md">Latest Opportunities</h2>
        <a className="text-primary font-bold text-xs sm:text-body-sm flex items-center gap-1" href="#">
          All Jobs <span className="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        {jobs.map((job, index) => (
          <div key={index} className="bg-white p-3 sm:p-5 rounded-lg sm:rounded-2xl border border-border-low-contrast flex gap-3 sm:gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-surface-container rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-sm sm:text-base">corporate_fare</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-label-bold text-body-lg flex items-center gap-1 text-xs sm:text-body-lg line-clamp-1">
                    {job.title}
                    {job.verified && (
                      <span className="material-symbols-outlined text-success-green text-sm sm:text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    )}
                  </h3>
                  <p className="text-on-surface-variant font-body-sm text-xs sm:text-body-sm line-clamp-1">
                    {job.company} • {job.location}
                  </p>
                </div>
                <button className="material-symbols-outlined text-outline hover:text-primary shrink-0 text-sm">
                  bookmark
                </button>
              </div>
              <div className="mt-2 sm:mt-3 flex gap-1.5 sm:gap-2 flex-wrap">
                {job.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-label-pill ${
                      tag.includes('Match')
                        ? 'bg-secondary-container/20 text-on-secondary-container'
                        : 'bg-surface-container-low border border-border-low-contrast text-on-surface-variant'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// SECTION: Trending Discussions
// ============================================================
function TrendingSection() {
  const discussions = [
    {
      title: 'Is Japa really the only option for Tech in 2024?',
      preview: 'I\'ve been seeing a lot of mixed reviews lately. Some say remote local pay is catching up while...',
      comments: 142,
      likes: 89,
      time: '2h ago',
    },
    {
      title: 'Building an MVP with no budget in Nigeria',
      preview: 'Sharing my journey of launching a logistics app using only open-source tools and free hosting...',
      comments: 67,
      likes: 152,
      time: '5h ago',
    },
  ]

  return (
    <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 px-gutter">
      <h2 className="text-headline-md font-headline-md text-sm sm:text-headline-md">Trending Discussions</h2>
      <div className="flex flex-col gap-2 sm:gap-4">
        {discussions.map((discussion, index) => (
          <div
            key={index}
            className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-2xl border border-border-low-contrast hover:bg-surface-container-lowest transition-colors cursor-pointer"
          >
            <h3 className="font-label-bold text-body-lg text-xs sm:text-body-lg mb-1">{discussion.title}</h3>
            <p className="text-on-surface-variant font-body-sm line-clamp-2 text-xs sm:text-body-sm">{discussion.preview}</p>
            <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-4 text-outline font-body-sm text-xs sm:text-body-sm flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">chat_bubble</span> {discussion.comments}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">favorite</span> {discussion.likes}
              </span>
              <span className="text-xs">{discussion.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Ad */}
      <div className="w-full aspect-video bg-primary-container/10 border border-primary/10 rounded-lg sm:rounded-2xl flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        <span className="text-primary font-label-bold mb-2 text-xs sm:text-body-sm">i9ja Pro</span>
        <p className="text-on-primary-fixed-variant text-xs sm:text-body-sm mb-3 sm:mb-4">
          Get priority job alerts and exclusive mentor sessions.
        </p>
        <button className="bg-primary text-white px-3 sm:px-4 py-2 rounded-lg font-label-bold text-xs sm:text-body-sm">
          Learn More
        </button>
      </div>
    </div>
  )
}

// ============================================================
// SECTION: Ad Zone (Bottom)
// ============================================================
function AdZoneBottom() {
  return (
    <div className="mt-12 sm:mt-16 w-full h-24 sm:h-32 bg-surface-container-high border border-border-low-contrast rounded-lg sm:rounded-2xl flex items-center justify-center relative overflow-hidden">
      <span className="absolute top-1 sm:top-2 left-1 sm:left-2 px-2 py-0.5 bg-on-surface-variant/10 text-[8px] sm:text-[10px] font-bold rounded">AD</span>
      <div className="flex items-center gap-3 sm:gap-6 px-3 sm:px-6">
        <div className="hidden sm:block w-14 sm:w-16 h-14 sm:h-16 bg-white rounded-lg border border-border-low-contrast p-2 shrink-0">
          <img
            className="w-full h-full object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoNOAI100HnPV-5e_zSiqE3CrU3YHbC5HZOpbVddA9nwZfCGzkwQbhgkiS0P5bzctHLzIvp1xMq5PvrFfgsrxSFqGx1lPGwfBlm5BwqDC6YWeNDvgp4OcA5myCUy33qwVwXj9h1SUT33gWUOli62N63nmjrD3ycUtUQ3FNCvsbRIwAG4R59ffFwZ0jAzRytUBh_LfCEONBNx5bJTQzhoBswJadTmD4Y7P3609xZZd4kUtVviPdRvkgcYo6xDonMylzQ8TL1NFoccI"
            alt="App"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-primary font-label-bold text-xs sm:text-body-lg">Simplify Your Business Finances</p>
          <p className="text-on-surface-variant font-body-sm text-xs sm:text-body-sm">Open a corporate account in 5 minutes. No hidden fees.</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MAIN HOME PAGE COMPONENT
// ============================================================
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        <AdZone />
        <HeroSection />
        <StatsSection />
        <FeaturedSection />
        
        {/* Jobs & Trending Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 mt-12 sm:mt-16">
          <JobsSection />
          <TrendingSection />
        </div>

        <AdZoneBottom />
      </main>
      <Footer />
    </>
  )
}
