import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";
import { DISCLAIMER_CONTENT } from "./disclaimer.content";

export const metadata: Metadata = {
  title: "Disclaimer | i9ja",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title={DISCLAIMER_CONTENT.title}>
      <p className="mb-6 text-sm text-ink-dim">
        Effective {DISCLAIMER_CONTENT.effectiveDate}
      </p>
      {DISCLAIMER_CONTENT.sections.map((section) => (
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
