// ============================================================
// COMMUNITY GUIDELINES PAGE
// Routes: GET /guidelines
// ============================================================

'use client'

import Navbar from '@/modules/shared/component/Navbar'
import Footer from '@/modules/shared/component/Footer'

export default function GuidelinesPage() {
  const guidelines = [
    {
      title: 'Be Respectful',
      description: 'Treat all community members with respect and dignity. No harassment, discrimination, or hate speech.'
    },
    {
      title: 'Keep It Relevant',
      description: 'Stay on topic and contribute meaningfully to discussions. Avoid spam and self-promotion.'
    },
    {
      title: 'Be Honest',
      description: 'Share accurate information. Correct yourself if you make a mistake and cite your sources.'
    },
    {
      title: 'No Hate Speech',
      description: 'We have zero tolerance for content that targets individuals or groups based on protected characteristics.'
    },
    {
      title: 'Respect Privacy',
      description: 'Do not share personal information about others without consent. Protect your own information.'
    },
    {
      title: 'Follow Platform Rules',
      description: 'Adhere to all applicable laws and our terms of service.'
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="py-12 text-center mb-12">
            <h1 className="text-headline-lg font-headline-lg mb-4">Community Guidelines</h1>
            <p className="text-on-surface-variant text-body-lg">Help us maintain a safe and respectful community for everyone</p>
          </div>

          {/* Guidelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {guidelines.map((guideline, i) => (
              <div key={i} className="bg-bg-card p-6 rounded-xl border border-border-low-contrast">
                <h3 className="text-headline-md font-headline-md text-primary mb-3">{guideline.title}</h3>
                <p className="text-body-lg text-on-surface-variant">{guideline.description}</p>
              </div>
            ))}
          </div>

          {/* Enforcement */}
          <section className="bg-primary-container text-on-primary-container p-8 rounded-xl mb-8">
            <h2 className="text-headline-md font-headline-md mb-4">Enforcement</h2>
            <p className="text-body-lg mb-4">
              We take violations of our community guidelines seriously. Depending on the severity, violations may result in:
            </p>
            <ul className="space-y-2">
              <li className="text-body-lg">• Warnings and notifications</li>
              <li className="text-body-lg">• Content removal</li>
              <li className="text-body-lg">• Temporary suspension</li>
              <li className="text-body-lg">• Permanent ban from the community</li>
            </ul>
          </section>

          {/* Report */}
          <section className="bg-bg-card p-8 rounded-xl border border-border-low-contrast">
            <h2 className="text-headline-md font-headline-md mb-4">Report Violations</h2>
            <p className="text-body-lg text-on-surface-variant mb-6">
              If you see content that violates our guidelines, please report it immediately.
            </p>
            <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all">
              Report Content
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
