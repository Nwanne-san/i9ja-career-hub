import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/utils/constants";
import { mockThreads, mockJobs, mockCourses, mockReplies, mockSearchResults } from "@/utils/mockData";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.i9ja.com";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,  // Reduced from 10s to 5s for faster fallback to mock data
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove(AUTH_COOKIE_NAME);
    }
    // Return mock data on connection errors instead of rejecting
    return Promise.resolve({ data: { success: false, fromMock: true } });
  }
);

// Helper function to add delay to mock responses for realistic UX
const delayPromise = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to handle API errors with mock fallback
async function apiWithFallback(apiCall: Promise<any>, mockData: any) {
  try {
    const response = await apiCall;
    if (response.data?.success === false && response.data?.fromMock) {
      await delayPromise(300);
      return { data: mockData };
    }
    return response;
  } catch (error) {
    await delayPromise(300);
    return { data: mockData };
  }
}

// ========== AUTH API ==========
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post("/auth/login", { email, password }),
  register: (data: { email: string; password: string; displayName: string }) =>
    apiClient.post("/auth/register", data),
  verify: (email: string, code: string) =>
    apiClient.post("/auth/verify-email", { email, code }),
  resetPassword: (email: string) =>
    apiClient.post("/auth/reset-password", { email }),
  updatePassword: (token: string, newPassword: string) =>
    apiClient.post("/auth/update-password", { token, newPassword }),
  getCurrentUser: () => apiClient.get("/auth/me"),
};

// ========== THREADS/FORUMS API ==========
export const threadAPI = {
  getAll: (params?: any) => apiWithFallback(
    apiClient.get("/threads", { params }),
    mockThreads
  ),
  getById: (id: string) => apiWithFallback(
    apiClient.get(`/threads/${id}`),
    mockThreads.find(t => t.id === id) || mockThreads[0]
  ),
  create: (data: any) => apiClient.post("/threads", data),
  update: (id: string, data: any) => apiClient.put(`/threads/${id}`, data),
  delete: (id: string) => apiClient.delete(`/threads/${id}`),
  getByCategory: (categoryId: string, params?: any) =>
    apiWithFallback(
      apiClient.get(`/threads/category/${categoryId}`, { params }),
      mockThreads
    ),
  search: (query: string, params?: any) =>
    apiWithFallback(
      apiClient.get("/threads/search", { params: { q: query, ...params } }),
      mockThreads
    ),
  upvote: (threadId: string) => apiClient.post(`/threads/${threadId}/upvote`),
  downvote: (threadId: string) => apiClient.post(`/threads/${threadId}/downvote`),
};

// ========== REPLIES/COMMENTS API ==========
export const replyAPI = {
  getByThread: (threadId: string, params?: any) =>
    apiWithFallback(
      apiClient.get(`/threads/${threadId}/replies`, { params }),
      mockReplies[threadId as keyof typeof mockReplies] || []
    ),
  create: (threadId: string, data: any) =>
    apiClient.post(`/threads/${threadId}/replies`, data),
  update: (threadId: string, replyId: string, data: any) =>
    apiClient.put(`/threads/${threadId}/replies/${replyId}`, data),
  delete: (threadId: string, replyId: string) =>
    apiClient.delete(`/threads/${threadId}/replies/${replyId}`),
};

// ========== JOBS API ==========
export const jobAPI = {
  getAll: (params?: any) => apiWithFallback(
    apiClient.get("/jobs", { params }),
    mockJobs
  ),
  getById: (id: string) => apiWithFallback(
    apiClient.get(`/jobs/${id}`),
    mockJobs.find(j => j.id === id) || mockJobs[0]
  ),
  create: (data: any) => apiClient.post("/jobs", data),
  update: (id: string, data: any) => apiClient.put(`/jobs/${id}`, data),
  delete: (id: string) => apiClient.delete(`/jobs/${id}`),
  search: (query: string, params?: any) =>
    apiWithFallback(
      apiClient.get("/jobs/search", { params: { q: query, ...params } }),
      mockJobs
    ),
  apply: (jobId: string, data: any) =>
    apiClient.post(`/jobs/${jobId}/apply`, data),
  getSaved: () => apiWithFallback(
    apiClient.get("/jobs/saved"),
    []
  ),
  saveJob: (jobId: string) => apiClient.post(`/jobs/${jobId}/save`),
  unsaveJob: (jobId: string) => apiClient.delete(`/jobs/${jobId}/save`),
};

// ========== COURSES API ==========
export const courseAPI = {
  getAll: (params?: any) => apiWithFallback(
    apiClient.get("/courses", { params }),
    mockCourses
  ),
  getById: (id: string) => apiWithFallback(
    apiClient.get(`/courses/${id}`),
    mockCourses.find(c => c.id === id) || mockCourses[0]
  ),
  search: (query: string, params?: any) =>
    apiWithFallback(
      apiClient.get("/courses/search", { params: { q: query, ...params } }),
      mockCourses
    ),
  enroll: (courseId: string) => apiClient.post(`/courses/${courseId}/enroll`),
  getEnrolled: () => apiWithFallback(
    apiClient.get("/courses/enrolled"),
    []
  ),
  getProgress: (courseId: string) => apiWithFallback(
    apiClient.get(`/courses/${courseId}/progress`),
    { completed: 0, total: 10 }
  ),
  submitReview: (courseId: string, data: any) =>
    apiClient.post(`/courses/${courseId}/reviews`, data),
};

// ========== USERS API ==========
export const userAPI = {
  getProfile: (username?: string) =>
    username
      ? apiClient.get(`/users/${username}`)
      : apiClient.get("/users/profile"),
  updateProfile: (data: any) => apiClient.put("/users/profile", data),
  search: (query: string) => apiClient.get("/users/search", { params: { q: query } }),
  follow: (userId: string) => apiClient.post(`/users/${userId}/follow`),
  unfollow: (userId: string) => apiClient.delete(`/users/${userId}/follow`),
  getFollowers: (username?: string) =>
    apiClient.get(`/users/${username || "me"}/followers`),
  getFollowing: (username?: string) =>
    apiClient.get(`/users/${username || "me"}/following`),
};

// ========== NOTIFICATIONS API ==========
export const notificationAPI = {
  getAll: (params?: any) => apiClient.get("/notifications", { params }),
  markAsRead: (notificationId: string) =>
    apiClient.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => apiClient.put("/notifications/read-all"),
  delete: (notificationId: string) => apiClient.delete(`/notifications/${notificationId}`),
  getPreferences: () => apiClient.get("/notifications/preferences"),
  updatePreferences: (data: any) =>
    apiClient.put("/notifications/preferences", data),
};

// ========== SEARCH API ==========
export const searchAPI = {
  global: (query: string, params?: any) =>
    apiWithFallback(
      apiClient.get("/search", { params: { q: query, ...params } }),
      mockSearchResults
    ),
  threads: (query: string, params?: any) =>
    threadAPI.search(query, params),
  jobs: (query: string, params?: any) =>
    jobAPI.search(query, params),
  courses: (query: string, params?: any) =>
    courseAPI.search(query, params),
  users: (query: string) => userAPI.search(query),
};
