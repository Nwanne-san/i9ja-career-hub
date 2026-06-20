"use client";

import { useParams } from "next/navigation";
import { PublicProfilePage } from "@/modules/profile/pages/PublicProfilePage/publicProfilePage";

export default function Page() {
  const params = useParams();
  return <PublicProfilePage username={params.username as string} />;
}
