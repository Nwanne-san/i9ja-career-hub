import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";
import { PRIVACY_CONTENT } from "./privacy.content";

export const metadata: Metadata = {
  title: "Privacy Policy | i9ja",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title={PRIVACY_CONTENT.title}>
      <p className="mb-6 text-sm text-ink-dim">
        Effective {PRIVACY_CONTENT.effectiveDate}
      </p>
      {PRIVACY_CONTENT.sections.map((section) => (
        <section key={section.heading} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-on-surface">
            {section.heading}
          </h2>
          <p className="text-on-surface-variant">{section.body}</p>
        </section>
      ))}
    </LegalPageLayout>
  );
}
