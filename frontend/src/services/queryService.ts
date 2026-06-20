"use client";

import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import client from "@/utils/client";
import { delayPromise } from "@/utils/helper";
import { jobServices } from "@/services/job.service";
import { courseServices } from "@/services/course.service";
import { threadServices } from "@/services/thread.service";
import { notificationServices } from "@/services/notification.service";
import { searchServices } from "@/services/search.service";
import { useMutationService } from "@/utils/hooks/useMutationService";
import {
  mockJobs,
  mockCourses,
  mockThreads,
  mockNotifications,
  mockSearchResults,
} from "@/utils/mockData";
import type {
  Course,
  Job,
  Thread,
  Notification,
  SearchResults,
  JobsQueryParams,
  CoursesQueryParams,
  ThreadsQueryParams,
} from "@/types";
import { ApiMethods } from "@/utils/client";

export type { JobsQueryParams, CoursesQueryParams, ThreadsQueryParams };

export const queryKeys = {
  jobs: (params?: JobsQueryParams) => ["jobs", params] as const,
  job: (id: string) => ["jobs", id] as const,
  courses: (params?: CoursesQueryParams) => ["courses", params] as const,
  course: (id: string) => ["courses", id] as const,
  threads: (params?: ThreadsQueryParams) => ["threads", params] as const,
  thread: (id: string) => ["threads", id] as const,
  savedJobs: () => ["jobs", "saved"] as const,
  enrolledCourses: () => ["courses", "enrolled"] as const,
  notifications: () => ["notifications"] as const,
  search: (q: string) => ["search", q] as const,
};

async function fetchWithMock<T>(
  fetcher: () => Promise<T>,
  mockData: T
): Promise<T> {
  try {
    return await fetcher();
  } catch {
    await delayPromise(300);
    return mockData;
  }
}

function unwrapList<T>(response: T[] | { data: T[] }): T[] {
  if (Array.isArray(response)) return response;
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: T[] }).data ?? [];
  }
  return [];
}

export function useJobsQuery(
  params?: JobsQueryParams,
  options?: Omit<UseQueryOptions<Job[], Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.jobs(params),
    queryFn: () =>
      fetchWithMock(
        () =>
          client
            .request<JobsQueryParams, Job[] | { data: Job[] }>({
              ...jobServices.getAll,
              data: params ?? {},
            })
            .then(unwrapList),
        mockJobs
      ),
    staleTime: 60_000,
    ...options,
  });
}

export function useJobQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.job(id),
    queryFn: () =>
      fetchWithMock(
        () =>
          client.request<object, Job>({
            ...jobServices.getById(id),
          }),
        mockJobs.find((j) => j.id === id) ?? mockJobs[0]
      ),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}

export function useCoursesQuery(
  params?: CoursesQueryParams,
  options?: Omit<UseQueryOptions<Course[], Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.courses(params),
    queryFn: () =>
      fetchWithMock(
        () =>
          client
            .request<CoursesQueryParams, Course[] | { data: Course[] }>({
              ...courseServices.getAll,
              data: params ?? {},
            })
            .then(unwrapList),
        mockCourses
      ),
    staleTime: 60_000,
    ...options,
  });
}

export function useCourseQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.course(id),
    queryFn: () =>
      fetchWithMock(
        () =>
          client.request<object, Course>({
            ...courseServices.getById(id),
          }),
        mockCourses.find((c) => c.id === id) ?? mockCourses[0]
      ),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}

export function useThreadsQuery(params?: ThreadsQueryParams) {
  return useQuery({
    queryKey: queryKeys.threads(params),
    queryFn: () =>
      fetchWithMock(
        () =>
          client
            .request<ThreadsQueryParams, Thread[] | { data: Thread[] }>({
              ...threadServices.getAll,
              data: params ?? {},
            })
            .then(unwrapList),
        mockThreads
      ),
    staleTime: 60_000,
  });
}

export function useThreadQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.thread(id),
    queryFn: () =>
      fetchWithMock(
        () =>
          client.request<object, Thread>({
            ...threadServices.getById(id),
          }),
        mockThreads.find((t) => t.id === id) ?? mockThreads[0]
      ),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}

export function useNotificationsQuery() {
  return useQuery({
    queryKey: queryKeys.notifications(),
    queryFn: () =>
      fetchWithMock(
        () =>
          client
            .request<object, Notification[] | { data: Notification[] }>({
              ...notificationServices.getAll,
            })
            .then(unwrapList),
        mockNotifications
      ),
    staleTime: 60_000,
  });
}

export function useSearchQuery(query: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.search(query),
    queryFn: () =>
      fetchWithMock(
        () =>
          client.request<{ q: string }, SearchResults>({
            ...searchServices.global,
            data: { q: query },
          }),
        mockSearchResults
      ),
    enabled: enabled && Boolean(query.trim()),
    staleTime: 60_000,
  });
}

export function useSaveJobMutation() {
  const queryClient = useQueryClient();
  return useMutationService<string, unknown>({
    service: (jobId) => jobServices.saveJob(jobId),
    options: {
      invalidateKeys: ["jobs"],
      successMessage: "Job saved",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.savedJobs() });
      },
    },
  });
}

export function useUnsaveJobMutation() {
  const queryClient = useQueryClient();
  return useMutationService<string, unknown>({
    service: (jobId) => jobServices.unsaveJob(jobId),
    options: {
      invalidateKeys: ["jobs"],
      successMessage: "Job removed from saved",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.savedJobs() });
      },
    },
  });
}

export function useEnrollCourseMutation() {
  return useMutationService<string, unknown>({
    service: (courseId) => courseServices.enroll(courseId),
    options: {
      invalidateKeys: ["courses"],
      successMessage: "Enrolled successfully",
    },
  });
}

export function useApplyJobMutation() {
  return useMutationService<
    { jobId: string; data?: Record<string, unknown> },
    unknown
  >({
    service: (vars) => ({
      ...jobServices.apply(vars.jobId),
      method: ApiMethods.POST,
      data: vars.data ?? {},
    }),
    options: {
      successMessage: "Application submitted",
    },
  });
}
