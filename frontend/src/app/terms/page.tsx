import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | i9ja",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p>
        Full terms and conditions content will be published here. By using i9ja.com you agree to
        follow our community guidelines and applicable Nigerian law.
      </p>
      <p className="text-ink-dim">Placeholder — legal copy to be supplied.</p>
    </LegalPageLayout>
  );
}
