# i9ja Career Hub - Frontend

Nigeria's premium community platform for jobs, free courses, and real discussions. Built by Nigerians, for Nigerians.

## 🚀 Project Overview

i9ja is a Next.js-based web application that connects Nigerian professionals with job opportunities, quality courses, and meaningful community discussions. The platform features:

- **10 Complete Pages**: Home, Forums, Jobs, Courses, Profile, Profile Edit, About, Guidelines, Report, and New Thread Form
- **Responsive Design**: Works seamlessly on mobile (320px), tablet, and desktop (1200px+)
- **Global Navigation**: Fixed navbar with active link detection and mobile-optimized bottom navigation
- **Real-time Routing**: Instant page transitions with smooth scrolling
- **Material Design**: Professional UI with Material Design 3 color system and typography

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.35 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x
- **Runtime**: Node.js
- **Icons**: Material Symbols Outlined
- **Font**: Inter (Google Fonts)

## ✨ Features Implemented

### Pages (All 10 Complete)
1. **Home Page** - Landing page with hero section, stats, and featured content
2. **Forums Hub** - Discussion threads with filtering (Trending, Recent, Top)
3. **New Thread Form** - Create forum discussions with validation
4. **Jobs Listing** - Job cards with search and location filtering
5. **Courses** - Course grid with category filtering
6. **User Profile** - User profile with stats and recent posts
7. **Edit Profile** - Form to update profile information
8. **About Page** - Company mission, values, and statistics
9. **Community Guidelines** - Community rules and enforcement tiers
10. **Report Page** - Form for reporting inappropriate content

### Components
- **Navbar** - Global persistent header with active link highlighting
- **MobileBottomNav** - Mobile-only bottom navigation (5 items + floating action button)
- **Footer** - Global footer with organized navigation links
- **ScrollToTop** - Smooth scroll behavior on page transitions

### Design Features
- ✅ Custom Tailwind color palette matching Material Design 3
- ✅ Responsive padding on all pages (no content overlap with fixed elements)
- ✅ Active link detection in navigation
- ✅ Smooth page transitions
- ✅ Professional badge styling
- ✅ Clear button visibility with proper contrast
- ✅ Form validation on new thread creation
- ✅ Mobile-optimized layout

## 📋 System Requirements

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)
- **OS**: Windows, macOS, or Linux
- **RAM**: 2GB minimum
- **Disk**: 1GB free space

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/i9ja244342/i9ja-career-hub.git
cd i9ja-career-hub
```

### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 3: Install Dependencies
```bash
npm install
```
This will install all required packages including:
- Next.js
- React & React DOM
- Tailwind CSS
- TypeScript
- PostCSS

**Expected time**: 2-5 minutes (depending on internet speed)

### Step 4: Start Development Server
```bash
npm run dev
```

**Output will show:**
```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  ✓ Ready in 15.2s
```

### Step 5: Open in Browser
Open your browser and navigate to: **http://localhost:3000**

You should see the i9ja home page with full navigation working!

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with global components
│   ├── page.tsx           # Home page
│   ├── about/
│   │   └── page.tsx       # About page
│   ├── courses/
│   │   └── page.tsx       # Courses listing
│   ├── forums/
│   │   ├── page.tsx       # Forums hub
│   │   └── new/
│   │       └── page.tsx   # New thread form
│   ├── guidelines/
│   │   └── page.tsx       # Community guidelines
│   ├── jobs/
│   │   └── page.tsx       # Jobs listing
│   ├── profile/
│   │   ├── page.tsx       # User profile
│   │   └── edit/
│   │       └── page.tsx   # Edit profile
│   └── report/
│       └── page.tsx       # Report content
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Global navigation header
│   ├── MobileBottomNav.tsx # Mobile bottom navigation
│   ├── Footer.tsx         # Global footer
│   └── ScrollToTop.tsx    # Smooth scroll on route change
├── styles/
│   └── globals.css        # Global styles & typography
├── public/                # Static assets
├── package.json           # Dependencies & scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS configuration
└── next.config.js         # Next.js configuration
```

## 🎨 Available Scripts

```bash
# Development server (recommended for development)
npm run dev

# Production build (optimize for deployment)
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint

# Run TypeScript type checking
npm run type-check
```

## 🔍 Navigation Overview

### Desktop Navigation
- **Navbar** (fixed top): Home, Forums, Jobs, Courses + Search + Profile + Join button
- **Footer**: Community links, company info, social links

### Mobile Navigation
- **Navbar** (fixed top): Logo, search, menu button
- **Mobile Bottom Nav** (fixed bottom): Home, Forums, Create, Jobs, Profile

## 🎯 Features Breakdown

### Navigation System
- Active link highlighting based on current route
- Smooth page transitions with scroll-to-top
- Persistent navbar and footer across all pages
- Mobile-specific bottom navigation

### Forms & Validation
- **New Thread Form**: Title, category, description, tags with validation
- **Edit Profile Form**: Name, email, role, location, bio
- **Report Form**: Content type, reason, severity, description
- **Job Search**: Real-time search and location filtering

### UI Components
- Professional badge system for salary, job type, match percentage
- Verified checkmarks on user profiles and job listings
- Vote buttons on forum threads
- Bookmark buttons on job cards
- Interactive category filters

## 🚨 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
```bash
# Ensure TypeScript is correct
npm run type-check

# Run linter to find issues
npm run lint

# Clean and rebuild
rm -rf .next
npm run dev
```

## 📱 Responsive Design

The application is optimized for:
- **Mobile**: 320px - 767px (iPhones, Android phones)
- **Tablet**: 768px - 1023px (iPads, tablets)
- **Desktop**: 1024px+ (laptops, desktops)

## 🔐 Environment Variables

Currently no environment variables required for development. The app uses hardcoded sample data.

Future versions may include:
- `.env.local` - Local development variables
- API endpoints
- Authentication tokens

## 📝 Code Standards

- **Naming Convention**: PascalCase for components, camelCase for functions/variables
- **File Organization**: Components in `components/`, pages in `app/`
- **Styling**: Utility-first Tailwind CSS approach
- **Type Safety**: Full TypeScript implementation

## 🤝 Contributing

When working on this project:

1. Create a new branch: `git checkout -b feature/feature-name`
2. Make your changes
3. Test locally: `npm run dev`
4. Type check: `npm run type-check`
5. Lint: `npm run lint`
6. Commit: `git commit -m "Description of changes"`
7. Push: `git push origin feature/feature-name`
8. Create a Pull Request

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Known Issues

- None currently. Report issues through GitHub Issues tab.

## 📞 Support

For questions or issues:
1. Check this README first
2. Review GitHub Issues
3. Create a new GitHub Issue with detailed description

## 📄 License

All rights reserved. Built by i9ja team.

## 👥 Team

- Project Lead: i9ja
- Contributors: (Add your name as you contribute)

---

**Last Updated**: May 25, 2026
**Current Version**: 1.0.0
