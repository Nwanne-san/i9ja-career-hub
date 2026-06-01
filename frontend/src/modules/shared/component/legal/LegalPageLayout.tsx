import Navbar from "@/modules/shared/component/Navbar";
import Footer from "@/modules/shared/component/Footer";
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  LEGAL_EFFECTIVE_DATE,
} from "@/utils/constants";

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-page px-4 pb-16 pt-20 sm:px-6 md:pb-0 md:pt-24">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted">Effective date: {LEGAL_EFFECTIVE_DATE}</p>
          <div className="prose prose-invert mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
            {children}
          </div>
          <div className="mt-12 rounded-xl border border-border-line bg-bg-card/80 p-6">
            <p className="text-sm font-medium text-ink">Contact</p>
            <p className="mt-2 text-sm text-ink-muted">
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-green-light hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              WhatsApp:{" "}
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green-light hover:underline"
              >
                Contact for enquiries
              </a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
