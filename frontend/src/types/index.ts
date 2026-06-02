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

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salary?: string;
  type: "full-time" | "freelance" | "internship" | "nysc";
  verified: boolean;
  category: string;
  postedAt: string;
  applyUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  rating?: number;
  studentCount?: number;
  url: string;
  free: boolean;
  thumbnailEmoji?: string;
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
