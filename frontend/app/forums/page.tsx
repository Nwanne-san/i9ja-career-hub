// ============================================================
// FORUMS PAGE - All forum-related sections consolidated
// Routes: GET /forums
// ============================================================

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ============================================================
// SECTION: Forums Header
// ============================================================
function ForumsHeader() {
  return (
    <div className="bg-primary-container rounded-xl sm:rounded-3xl p-4 sm:p-8 text-on-primary-container relative overflow-hidden shadow-lg mx-gutter">
      <div className="relative z-10">
        <h1 className="font-headline-lg text-on-primary-container mb-2 text-sm sm:text-headline-lg">Forums — Discuss anything with the Nigerian community</h1>
        <p className="text-on-primary-container font-body-lg mb-4 sm:mb-6 opacity-90 max-w-xl text-xs sm:text-body-lg">
          Share insights, ask questions, and grow with the largest tech and professional network in Nigeria.
        </p>
        <button className="bg-white text-primary px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold flex items-center gap-2 hover:bg-surface-container-lowest transition-all shadow-md active:scale-95 text-xs sm:text-sm">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Start New Thread
        </button>
      </div>
      {/* Decorative Elements */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute right-12 top-8 w-24 h-24 bg-secondary-container/20 rounded-full blur-2xl"></div>
    </div>
  )
}

// ============================================================
// SECTION: Thread Card
// ============================================================
interface ThreadCardProps {
  votes: number
  category: string
  categoryColor: string
  postedTime: string
  author: string
  verified: boolean
  avatar: string
  title: string
  tags: string[]
  comments: number
  image?: string | null
  views: string
}

function ThreadCard({
  votes,
  category,
  categoryColor,
  postedTime,
  author,
  verified,
  avatar,
  title,
  tags,
  comments,
  image,
  views,
}: ThreadCardProps) {
  return (
    <article className="bg-white border border-border-low-contrast rounded-lg sm:rounded-2xl p-3 sm:p-6 hover:shadow-md transition-all group">
      <div className="flex gap-2 sm:gap-6 items-start">
        {/* Vote Button */}
        <div className="flex flex-col items-center gap-1 min-w-[36px] sm:min-w-[48px] bg-surface-container-low rounded-lg sm:rounded-xl py-2 sm:py-3 border border-border-low-contrast shrink-0">
          <button className="material-symbols-outlined text-outline hover:text-primary transition-colors text-xs sm:text-base">expand_less</button>
          <span className="font-bold text-primary text-xs sm:text-body-sm">{votes}</span>
          <button className="material-symbols-outlined text-outline hover:text-error transition-colors text-xs sm:text-base">expand_more</button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Metadata */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2 flex-wrap">
            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-label-pill font-label-bold uppercase tracking-wider text-xs sm:text-sm ${categoryColor}`}>
              {category}
            </span>
            <span className="text-xs sm:text-body-sm text-on-surface-variant whitespace-nowrap">• Posted {postedTime} by</span>
            <div className="flex items-center gap-1 min-w-0">
              <img
                alt={author}
                className="w-4 sm:w-5 h-4 sm:h-5 rounded-full shrink-0"
                src={avatar}
              />
              <span className="text-xs sm:text-body-sm font-bold text-primary truncate">{author}</span>
              {verified && (
                <span
                  className="material-symbols-outlined text-xs sm:text-[14px] text-success-green shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-body-lg sm:text-headline-md text-on-surface mb-2 sm:mb-3 group-hover:text-primary transition-colors cursor-pointer text-xs sm:text-base">
            {title}
          </h3>

          {/* Image if present */}
          {image && (
            <div className="relative w-full h-32 sm:h-48 mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden border border-border-low-contrast">
              <img
                alt={title}
                className="w-full h-full object-cover"
                src={image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-label-pill font-label-pill bg-surface-container-low text-on-surface-variant px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-border-low-contrast text-xs sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-1 text-on-surface-variant hover:text-primary cursor-pointer transition-colors shrink-0">
              <span className="material-symbols-outlined text-sm sm:text-[20px]">chat_bubble_outline</span>
              <span className="text-xs sm:text-body-sm font-medium whitespace-nowrap">{comments}</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant hover:text-primary cursor-pointer transition-colors shrink-0">
              <span className="material-symbols-outlined text-sm sm:text-[20px]">share</span>
              <span className="text-xs sm:text-body-sm font-medium whitespace-nowrap">Share</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant hover:text-primary cursor-pointer transition-colors sm:ml-auto shrink-0">
              <span className="material-symbols-outlined text-sm sm:text-[20px]">visibility</span>
              <span className="text-xs sm:text-body-sm whitespace-nowrap">{views}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

// ============================================================
// MAIN FORUMS PAGE COMPONENT
// ============================================================
export default function ForumsPage() {
  const [filterActive] = useState('trending')

  const threads = [
    {
      votes: 452,
      category: 'Tech Ecosystem',
      categoryColor: 'bg-primary-fixed text-on-primary-fixed-variant',
      postedTime: '2h ago',
      author: 'Tunde Adebayo',
      verified: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtoLtq7YBRiQl9lmRt-JPEsYLPKDJSU1JbhZPWZ4cmz4YHzUXypINzWcV9_w3_FLhgF-OZV75N0bNc_tX0Azgo_1y1u_rNBnxtxrDnLc0aYtiunXljowvkvL6Za3lSrnS4VQ294SOzytKS-RV0ExDJ19dTgxHZXZ-kiF3R9HD4s14rbd3N3awMVuQwmhFzf_zTDLHdUvV8NNcg-QX6PE304PjXiemlw6SIowdMkMKjl5MAFzbSfJIeQPCsln6SyELdT24daZr2_YI',
      title: 'The rise of Fintech hubs in Lagos: What\'s next for 2025?',
      tags: ['#LagosTech', '#Fintech', '#Investment'],
      comments: 128,
      image: null,
      views: '4.2k',
    },
    {
      votes: 892,
      category: 'Entrepreneurship',
      categoryColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      postedTime: '5h ago',
      author: 'Amina Bello',
      verified: false,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuVayVqiHBjiw4cP0qJO5YY5C5RjVX6htr0h3RRQPLqp1jdj0MNN-rgO2Aix1Ht0jUSHRVtrOUyPlBQZZqj0KG22wPOXjBnP-08Fn9l5fwgNtSdyhN_q55S7zafeng0etMUvcugFBKRLCE_l4_0SQFP3KDi8Y9TfRiDt6q1skPl7u_3Z789yhZCSidT-OpoeIqNjgEqpkobN1VxUfKyzVuHwavIW0Vt_y1xj2EVxdU17nSo0Mho89FrbN5TqCRqERjRDaEbl5zKZQ',
      title: 'How we scaled our farm produce logistics to 3 states. AMA!',
      tags: ['#AgriTech', '#Scaling'],
      comments: 84,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb9a_8qUMOPV8kvn7Y9EkEzVJe6Al587Hpbob35MT1B-BiN_2am0W6CIIw8Btc7hrTWj9yygjsiMyPH5r5pUNn0tBgB-kYml74clJE18o0zMzKid9G6_wojLZMhvnKrIz__qbaD6MpgByg5L3aABg4B521QFJlMdbPq2V42eN_JhHCdpNSm34u2IqKWXy8rqZ-QHfMBQX_mgd9R9zh4Um3zyTdH9O4mHJdMKvBJiaJLIYQW3OcRYu1ZM_BNRNy3_7qw8IB5Himpns',
      views: '2.8k',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 px-gutter max-w-container-max mx-auto min-h-screen space-y-6 sm:space-y-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <ForumsHeader />

            {/* Filters */}
            <div className="flex items-center justify-between bg-white border border-border-low-contrast rounded-lg sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 shadow-sm overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 sm:gap-6">
                <button className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-1 sm:gap-2 text-xs sm:text-body-lg whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm sm:text-[18px]">trending_up</span>
                  <span className="hidden sm:inline">Trending</span>
                </button>
                <button className="text-on-surface-variant font-medium hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-body-lg whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm sm:text-[18px]">schedule</span>
                  <span className="hidden sm:inline">Recent</span>
                </button>
                <button className="text-on-surface-variant font-medium hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-body-lg whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm sm:text-[18px]">workspace_premium</span>
                  <span className="hidden sm:inline">Top</span>
                </button>
              </div>
              <button className="text-outline hover:text-primary transition-colors shrink-0">
                <span className="material-symbols-outlined text-sm">filter_list</span>
              </button>
            </div>

            {/* Thread List */}
            <div className="space-y-2 sm:space-y-4">
              {threads.map((thread, index) => (
                <ThreadCard key={index} {...thread} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
