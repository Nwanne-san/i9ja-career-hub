"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SiteShell from "@/modules/shared/component/SiteShell";
import Button from "@/modules/shared/component/Button";
import Badge from "@/modules/shared/component/Badge";
import { DataRenderer } from "@/modules/shared/component/DataRenderer";
import { useThreadQuery } from "@/services/queryService";
import { useFormValidator } from "@/utils/hooks/useFormValidator";
import { z } from "zod";
import type { RootState } from "@/redux/store";
import type { Reply, Thread } from "@/types";
import { AppRoutes } from "@/routes/app.routes";
import { mockReplies } from "@/utils/mockData";

const replySchema = z.object({
  body: z.string().min(10, "Reply must be at least 10 characters"),
});

function ThreadDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-3/4 rounded bg-surface-container-low" />
      <div className="h-24 rounded bg-surface-container-low" />
    </div>
  );
}

export function ThreadDetailPage({ threadId }: { threadId: string }) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: thread, isLoading, isError, refetch } = useThreadQuery(threadId);
  const baseReplies = mockReplies[threadId as keyof typeof mockReplies] ?? [];
  const [localReplies, setLocalReplies] = useState<Reply[]>([]);
  const replies = [...baseReplies, ...localReplies];

  const { register, handleSubmit, reset, formState: { errors } } = useFormValidator({
    validationSchema: replySchema,
  });

  const onSubmitReply = handleSubmit((data) => {
    if (!user) {
      router.push(AppRoutes.auth);
      return;
    }

    setLocalReplies((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        body: data.body,
        author: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
        },
        createdAt: new Date().toISOString(),
      },
    ]);
    reset();
  });

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-gutter pb-section-padding pt-24">
        <DataRenderer<Thread>
          isLoading={isLoading}
          isError={isError || !thread}
          data={thread}
          onRetry={() => refetch()}
          renderLoading={<ThreadDetailSkeleton />}
          errorTitle="Thread not found"
        >
          {({ data }) =>
            data ? (
              <>
                <article className="mb-8 rounded-2xl border border-border-low-contrast bg-bg-card p-6">
                  <Badge variant="primary" className="mb-3">
                    {data.categoryId}
                  </Badge>
                  <h1 className="mb-4 text-2xl font-bold text-on-surface">
                    {data.title}
                  </h1>
                  <p className="mb-4 whitespace-pre-wrap text-on-surface-variant">
                    {data.body}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    by {data.author.displayName} ·{" "}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </article>

                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-bold">
                    Replies ({replies.length})
                  </h2>
                  <div className="space-y-4">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="rounded-lg border border-border-low-contrast bg-bg-card p-4"
                      >
                        <p className="text-on-surface-variant">{reply.body}</p>
                        <p className="mt-2 text-xs text-on-surface-variant">
                          {reply.author.displayName}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <form
                  onSubmit={onSubmitReply}
                  className="rounded-2xl border border-border-low-contrast bg-bg-card p-6"
                >
                  <h3 className="mb-3 font-semibold">Add a reply</h3>
                  <textarea
                    {...register("body")}
                    rows={4}
                    className="mb-2 w-full rounded-lg border border-border-low-contrast bg-bg-base p-3 text-on-surface"
                    placeholder="Share your thoughts..."
                  />
                  {errors.body?.message && (
                    <p className="mb-2 text-xs text-error">
                      {String(errors.body.message)}
                    </p>
                  )}
                  <Button type="submit">Post reply</Button>
                </form>
              </>
            ) : null
          }
        </DataRenderer>
      </main>
    </SiteShell>
  );
}
