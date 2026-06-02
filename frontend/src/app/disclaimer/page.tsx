import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer | i9ja",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer">
      <p>
        i9ja.com aggregates community content and third-party opportunities. We do not guarantee
        the accuracy of every listing or post.
      </p>
      <p className="text-ink-dim">Placeholder — disclaimer copy to be supplied.</p>
    </LegalPageLayout>
  );
}
