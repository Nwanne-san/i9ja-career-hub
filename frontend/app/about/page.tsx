// ============================================================
// ABOUT PAGE - Information about i9ja
// Routes: GET /about
// ============================================================

'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-16 md:pb-0 max-w-container-max mx-auto px-gutter mb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="py-12 text-center mb-12">
            <h1 className="text-headline-lg font-headline-lg mb-4">About i9ja</h1>
            <p className="text-on-surface-variant text-body-lg">Nigeria's Premier Digital Community for Career Growth, Skills Acquisition, and Meaningful Connection</p>
          </div>

          {/* Mission */}
          <section className="bg-white p-8 rounded-xl border border-border-low-contrast mb-8">
            <h2 className="text-headline-md font-headline-md mb-4">Our Mission</h2>
            <p className="text-body-lg text-on-surface-variant mb-4">
              At i9ja, we're building the largest tech and professional community in Nigeria. Our mission is to empower individuals through job opportunities, continuous learning, and meaningful professional connections.
            </p>
            <p className="text-body-lg text-on-surface-variant">
              We believe in signal over noise – connecting talented professionals with opportunities that matter, fostering knowledge sharing, and building a community where everyone can grow.
            </p>
          </section>

          {/* Values */}
          <section className="mb-8">
            <h2 className="text-headline-md font-headline-md mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Authenticity', desc: 'We believe in genuine connections and real opportunities' },
                { title: 'Inclusivity', desc: 'Everyone has a voice and deserves to be heard' },
                { title: 'Excellence', desc: 'We strive for the highest quality in everything we do' },
                { title: 'Community', desc: 'Together, we are stronger and can accomplish more' },
              ].map((value, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-border-low-contrast">
                  <h3 className="text-headline-md font-headline-md text-primary mb-2">{value.title}</h3>
                  <p className="text-body-lg text-on-surface-variant">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="bg-primary-container rounded-xl p-8 text-on-primary-container mb-8">
            <h2 className="text-headline-md font-headline-md mb-6">By The Numbers</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">48k+</p>
                <p className="text-body-lg">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">3k+</p>
                <p className="text-body-lg">Job Listings</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">820+</p>
                <p className="text-body-lg">Free Courses</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white p-8 rounded-xl border border-border-low-contrast">
            <h2 className="text-headline-md font-headline-md mb-4">Get In Touch</h2>
            <p className="text-body-lg text-on-surface-variant mb-6">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <div className="space-y-3">
              <p className="text-body-lg"><span className="font-bold">Email:</span> hello@i9ja.com</p>
              <p className="text-body-lg"><span className="font-bold">Twitter:</span> @i9jatech</p>
              <p className="text-body-lg"><span className="font-bold">Location:</span> Lagos, Nigeria</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
