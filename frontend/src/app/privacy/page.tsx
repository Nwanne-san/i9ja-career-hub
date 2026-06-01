import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | i9ja",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        This policy describes how i9ja.com collects, uses, and protects your personal information.
      </p>
      <p className="text-ink-dim">Placeholder — privacy policy copy to be supplied.</p>
    </LegalPageLayout>
  );
}
