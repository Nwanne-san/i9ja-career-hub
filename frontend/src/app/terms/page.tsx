import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";
import { TERMS_CONTENT } from "./terms.content";

export const metadata: Metadata = {
  title: "Terms & Conditions | i9ja",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title={TERMS_CONTENT.title}>
      <p className="mb-6 text-sm text-ink-dim">
        Effective {TERMS_CONTENT.effectiveDate}
      </p>
      {TERMS_CONTENT.sections.map((section) => (
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
