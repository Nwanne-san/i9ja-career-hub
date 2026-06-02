// ============================================================
// USER PROFILE PAGE - User profile and activity
// Routes: GET /profile/[username] or GET /profile (current user)
// ============================================================

'use client'

import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'

export default function ProfilePage() {
  const user = {
    name: 'Tunde Adebayo',
    role: 'Senior Frontend Developer',
    location: 'Lagos, Nigeria',
    bio: 'Building scalable web applications with React and TypeScript. Passionate about open source and mentoring junior developers.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtoLtq7YBRiQl9lmRt-JPEsYLPKDJSU1JbhZPWZ4cmz4YHzUXypINzWcV9_w3_FLhgF-OZV75N0bNc_tX0Azgo_1y1u_rNBnxtxrDnLc0aYtiunXljowvkvL6Za3lSrnS4VQ294SOzytKS-RV0ExDJ19dTgxHZXZ-kiF3R9HD4s14rbd3N3awMVuQwmhFzf_zTDLHdUvV8NNcg-QX6PE304PjXiemlw6SIowdMkMKjl5MAFzbSfJIeQPCsln6SyELdT24daZr2_YI',
    verified: true,
    joined: 'January 2023',
    stats: {
      posts: 145,
      followers: 2304,
      following: 890,
    }
  }

  const posts = [
    {
      id: 1,
      title: 'The rise of Fintech hubs in Lagos: What\'s next for 2025?',
      category: 'Tech Ecosystem',
      date: '2 hours ago',
      views: 4200,
      comments: 128,
      likes: 452,
    },
    {
      id: 2,
      title: 'Best practices for React performance optimization',
      category: 'Development',
      date: '1 week ago',
      views: 2800,
      comments: 89,
      likes: 234,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        {/* Profile Header */}
        <div className="bg-bg-card rounded-xl border border-border-low-contrast p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-headline-lg font-headline-lg">{user.name}</h1>
                {user.verified && (
                  <span className="material-symbols-outlined text-success-green" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                )}
              </div>
              
              <p className="text-primary font-bold mb-1">{user.role}</p>
              <p className="text-on-surface-variant text-body-sm mb-3">{user.location} • Joined {user.joined}</p>
              <p className="text-body-lg mb-6">{user.bio}</p>

              <div className="flex gap-4 mb-6">
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold">
                  Message
                </button>
                <button className="border-2 border-primary-600 text-primary-600 px-6 py-2 rounded-lg font-bold">
                  Follow
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-bold text-headline-md text-primary">{user.stats.posts}</p>
                  <p className="text-on-surface-variant text-body-sm">Posts</p>
                </div>
                <div>
                  <p className="font-bold text-headline-md text-primary">{user.stats.followers}</p>
                  <p className="text-on-surface-variant text-body-sm">Followers</p>
                </div>
                <div>
                  <p className="font-bold text-headline-md text-primary">{user.stats.following}</p>
                  <p className="text-on-surface-variant text-body-sm">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="mb-8">
          <h2 className="text-headline-md font-headline-md mb-6">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-bg-card p-6 rounded-xl border border-border-low-contrast hover:shadow-md transition-all">
                <h3 className="text-headline-md font-headline-md mb-2">{post.title}</h3>
                <p className="text-on-surface-variant text-body-sm mb-4">{post.category} • {post.date}</p>
                
                <div className="flex gap-6 text-on-surface-variant text-body-sm">
                  <span>{post.views} views</span>
                  <span>{post.comments} comments</span>
                  <span>{post.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
