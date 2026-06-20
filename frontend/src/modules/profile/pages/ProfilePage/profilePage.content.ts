export const PROFILE_PAGE_COPY = {
  signInPrompt: "Please sign in to view your profile",
  signInCta: "Sign In",
  editProfile: "Edit Profile",
  changePhoto: "Change profile photo",
  tabs: {
    threads: "My Threads",
    saved: "Saved",
    activity: "Activity",
  },
  stats: {
    reputation: "Reputation",
    threads: "Threads",
    replies: "Replies",
    savedJobs: "Saved Jobs",
  },
  empty: {
    threads: {
      title: "No threads yet",
      description: "Start a discussion and share what you know with the community.",
      cta: "Create a thread",
    },
    saved: {
      title: "No saved jobs",
      description: "Save jobs from the listings page to review them here later.",
      cta: "Browse jobs",
    },
    activity: {
      title: "Activity feed coming soon",
      description: "Replies, mentions, and updates will show up here.",
    },
  },
  loadMoreThreads: "Load More Threads",
  share: "Share",
} as const;

export const PROFILE_THREADS_PAGE_SIZE = 5;

export type ProfileTabId = "threads" | "saved" | "activity";
