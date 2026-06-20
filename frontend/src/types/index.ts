export type BadgeVariant =
  | "primary"
  | "accent"
  | "success"
  | "info"
  | "purple"
  | "ghost";

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
  verified?: boolean;
  reputation?: number;
  threadCount?: number;
  replyCount?: number;
  savedJobsCount?: number;
  joinedAt?: string;
  website?: string;
}

export interface Thread {
  id: string;
  title: string;
  body?: string;
  author: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  categoryId: string;
  tags: string[];
  replyCount: number;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  featured?: boolean;
}

export interface Reply {
  id: string;
  body: string;
  author: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote?: boolean;
  salary?: string;
  type: "full-time" | "freelance" | "internship" | "nysc" | "contract";
  verified: boolean;
  category?: string;
  postedAt: string;
  applyUrl?: string;
  description?: string;
  logoUrl?: string;
  logoBg?: "primary-fixed" | "surface-container";
  matchPercent?: number;
  tags?: string[];
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  title: string;
  provider: string;
  level: CourseLevel;
  category: string;
  rating?: number;
  studentCount?: number;
  url?: string;
  free: boolean;
  thumbnailEmoji?: string;
  imageUrl?: string;
  imageBg?: string;
  duration?: string;
  verified?: boolean;
  providerInitials?: string;
  providerAvatarBg?: string;
}

export type NotificationType =
  | "reply"
  | "mention"
  | "job_match"
  | "new_course"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  href?: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  emoji: string;
  accent: string;
}

export interface SearchResults {
  threads: Thread[];
  jobs: Job[];
  courses: Course[];
  users: User[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: { pos: number; delta: number; count: number };
}

export interface JobsQueryParams {
  search?: string;
  location?: string;
  workMode?: string;
  verifiedOnly?: boolean;
  type?: string;
  page?: number;
}

export interface CoursesQueryParams {
  category?: string;
  level?: string;
  search?: string;
  page?: number;
}

export interface ThreadsQueryParams {
  category?: string;
  search?: string;
  page?: number;
}

export interface ReportFormData {
  reason: string;
  details: string;
  url?: string;
}
