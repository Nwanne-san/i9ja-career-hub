"use client";

import { useParams } from "next/navigation";
import { ThreadDetailPage } from "@/modules/forums/pages/ThreadDetailPage";

export default function Page() {
  const params = useParams();
  return <ThreadDetailPage threadId={params.id as string} />;
}
