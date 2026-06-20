"use client";

import { useParams } from "next/navigation";
import { JobDetailPage } from "@/modules/jobs/pages/JobDetailPage";

export default function Page() {
  const params = useParams();
  return <JobDetailPage jobId={params.id as string} />;
}
