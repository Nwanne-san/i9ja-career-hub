import type { Metadata } from "next";
import LegalPageLayout from "@/modules/shared/component/legal/LegalPageLayout";
import { DMCA_CONTENT } from "./dmca.content";

export const metadata: Metadata = {
  title: "DMCA | i9ja",
};

export default function DmcaPage() {
  return (
    <LegalPageLayout title={DMCA_CONTENT.title}>
      <p className="mb-6 text-sm text-ink-dim">
        Effective {DMCA_CONTENT.effectiveDate}
      </p>
      {DMCA_CONTENT.sections.map((section) => (
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
