export const SITE_NAME = "i9ja.com";
export const SITE_TAGLINE =
  "Nigeria's community platform for jobs, free courses and real discussions. Built by Nigerians, for Nigerians.";

export const CONTACT_EMAIL = "atalorehijiator@gmail.com";
export const CONTACT_WHATSAPP = "https://wa.me/2347061769157?text=Contact%20us%20for%20adverts";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/forums", label: "Forums" },
  { href: "/jobs", label: "Jobs" },
  { href: "/courses", label: "Courses" },
] as const;

export const FOOTER_COMMUNITY_LINKS = [
  { href: "/guidelines", label: "Guidelines" },
  { href: "/report", label: "Report" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/dmca", label: "DMCA" },
] as const;

/** Forum categories with accent colours (brand guidelines §1.6) */
export const FORUM_CATEGORIES = [
  { id: "general", name: "General Discussion", emoji: "💬", accent: "#008751" },
  { id: "jobs", name: "Jobs & Vacancies", emoji: "💼", accent: "#E8A020" },
  { id: "education", name: "Education & Courses", emoji: "🎓", accent: "#3B82F6" },
  { id: "technology", name: "Technology", emoji: "⚡", accent: "#8B5CF6" },
  { id: "business", name: "Business & Freelancing", emoji: "💰", accent: "#EC4899" },
  { id: "marketplace", name: "Marketplace", emoji: "🛒", accent: "#F59E0B" },
  { id: "entertainment", name: "Entertainment", emoji: "🎬", accent: "#EF4444" },
  { id: "politics", name: "Politics", emoji: "🏛️", accent: "#64748B" },
  { id: "lifestyle", name: "Lifestyle", emoji: "✨", accent: "#10B981" },
  { id: "agriculture", name: "Agriculture", emoji: "🌾", accent: "#84CC16" },
] as const;

export const JOB_TYPES = [
  { id: "full-time", label: "Full-time", badgeVariant: "primary" as const },
  { id: "freelance", label: "Freelance", badgeVariant: "accent" as const },
  { id: "internship", label: "Internship", badgeVariant: "info" as const },
  { id: "nysc", label: "NYSC", badgeVariant: "purple" as const },
] as const;

export const COURSE_CATEGORIES = [
  "All Categories",
  "Web Dev",
  "Data Analytics",
  "AI/ML",
  "Cloud",
  "Design",
  "Security",
] as const;

export const COURSE_LEVELS = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const LEGAL_EFFECTIVE_DATE = "May 21, 2026";

export const AUTH_COOKIE_NAME = "i9ja_token";
