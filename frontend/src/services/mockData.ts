// ============================================================
// MOCK DATA FOR DEVELOPMENT
// Use this when backend is not available
// ============================================================

export const mockThreads = [
  {
    id: '1',
    title: 'Best practices for React hooks in 2024',
    body: 'I recently started using React hooks and I want to understand the best practices. What are some common pitfalls to avoid?',
    categoryId: 'programming',
    author: { id: '1', displayName: 'Chioma David', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma' },
    likeCount: 45,
    replyCount: 12,
    viewCount: 234,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['react', 'hooks', 'javascript'],
  },
  {
    id: '2',
    title: 'How to land your first tech job in Lagos',
    body: 'Just got my first tech job after 6 months of learning. Here\'s what I did...',
    categoryId: 'career',
    author: { id: '2', displayName: 'Ade Okafor', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ade' },
    likeCount: 89,
    replyCount: 34,
    viewCount: 567,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['career', 'jobs', 'tips'],
  },
  {
    id: '3',
    title: 'Best alternatives to Figma for UI design',
    body: 'Looking for open-source alternatives to Figma. What tools do you recommend?',
    categoryId: 'design',
    author: { id: '3', displayName: 'Zainab Hassan', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab' },
    likeCount: 34,
    replyCount: 18,
    viewCount: 189,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['design', 'tools', 'figma'],
  },
]

export const mockReplies = [
  {
    id: '1',
    threadId: '1',
    body: 'Great question! The most important thing is to avoid creating new functions inside render. Always use useCallback for functions that are passed as dependencies.',
    author: { id: '4', displayName: 'Tunde Adeyemi', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde' },
    likeCount: 12,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    threadId: '1',
    body: 'Also, make sure your dependency arrays are correct. I made this mistake and spent hours debugging!',
    author: { id: '5', displayName: 'Amina Ibrahim', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina' },
    likeCount: 8,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Paystack',
    location: 'Lagos, Nigeria',
    type: 'full-time',
    salary: '₦2.5M - 3.5M /mo',
    description: 'We\'re looking for an experienced React developer to join our engineering team.',
    verified: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Flutterwave',
    location: 'Remote (Lagos timezone)',
    type: 'full-time',
    salary: '₦1.8M - 2.5M /mo',
    description: 'Join our design team and help shape the future of fintech in Africa.',
    verified: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Interswitch',
    location: 'Ikoyi, Lagos',
    type: 'contract',
    salary: '₦2M - 2.8M /mo',
    description: 'Help us manage and scale our cloud infrastructure.',
    verified: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockCourses = [
  {
    id: '1',
    title: 'Complete Web Development with React',
    provider: 'Udemy',
    level: 'Beginner',
    category: 'Development',
    rating: 4.8,
    free: false,
    studentCount: 125000,
    thumbnailEmoji: '⚛️',
    description: 'Learn React from scratch and build real-world applications',
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    provider: 'Coursera',
    level: 'Beginner',
    category: 'Design',
    rating: 4.7,
    free: false,
    studentCount: 89000,
    thumbnailEmoji: '🎨',
    description: 'Master the principles of user-centered design',
  },
  {
    id: '3',
    title: 'JavaScript Algorithms & Data Structures',
    provider: 'FreeCodeCamp',
    level: 'Intermediate',
    category: 'Development',
    rating: 4.9,
    free: true,
    studentCount: 450000,
    thumbnailEmoji: '📚',
    description: 'Essential algorithms and data structures for interviews',
  },
  {
    id: '4',
    title: 'Cloud Computing with AWS',
    provider: 'Linux Academy',
    level: 'Advanced',
    category: 'Infrastructure',
    rating: 4.6,
    free: false,
    studentCount: 67000,
    thumbnailEmoji: '☁️',
    description: 'Master AWS and deploy scalable applications',
  },
]

export const mockUsers = [
  {
    id: '1',
    displayName: 'Chioma David',
    username: 'chioma_dev',
    email: 'chioma@example.com',
    location: 'Lagos, Nigeria',
    bio: 'Frontend developer passionate about building beautiful UIs',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
    verified: true,
    threadCount: 12,
    followers: 234,
    following: 89,
  },
]

export const mockSearchResults = {
  threads: mockThreads,
  jobs: mockJobs,
  courses: mockCourses,
  users: mockUsers,
}
