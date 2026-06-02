import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "DMCA Policy | i9ja",
};

export default function DmcaPage() {
  return (
    <LegalPageLayout title="DMCA Policy">
      <p>
        If you believe content on i9ja.com infringes your copyright, contact us with the details
        required for a valid DMCA notice.
      </p>
      <p className="text-ink-dim">Placeholder — DMCA policy copy to be supplied.</p>
    </LegalPageLayout>
  );
}
