import {
  Award,
  BadgeCheck,
  Brain,
  Shield,
  Users,
  Zap,
} from "lucide-react";

export function AboutValues() {
  return (
    <section className="rounded-2xl border border-border-line bg-bg-card px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-page">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-ink sm:text-3xl">
          Built on Core Values
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* High Integrity — spans 2 cols */}
          <div className="card-lift flex flex-col gap-6 rounded-3xl border border-border-line bg-bg-elevated p-6 transition-colors hover:border-brand-green/30 md:col-span-2 md:flex-row md:p-8">
            <div className="flex-1 space-y-4">
              <BadgeCheck className="h-10 w-10 fill-brand-green/20 text-brand-green-light" />
              <h3 className="font-display text-xl font-semibold text-ink">
                High Integrity
              </h3>
              <p className="text-sm text-ink-muted sm:text-base">
                We prioritize verified interactions and genuine opportunities. In
                a world of noise, we provide the signal.
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-2xl bg-bg-card p-6 shadow-sm">
              <div className="text-center">
                <Shield className="mx-auto h-12 w-12 text-brand-green-light" />
                <p className="mt-2 text-xs font-bold text-brand-green-light">
                  VERIFIED STATUS
                </p>
              </div>
            </div>
          </div>

          {/* Nigeria First */}
          <div className="flex flex-col justify-between space-y-4 rounded-3xl bg-brand-green p-6 text-white shadow-lg sm:p-8">
            <Users className="h-10 w-10 text-brand-gold" />
            <div>
              <h3 className="font-display text-xl font-semibold">Nigeria First</h3>
              <p className="mt-2 text-sm opacity-90 sm:text-base">
                Deeply rooted in the local context, designed for the unique
                challenges and strengths of Nigerian talent.
              </p>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-4 rounded-3xl border border-brand-green/20 bg-brand-green/10 p-6 sm:p-8">
            <Zap className="h-10 w-10 text-brand-green-light" />
            <h3 className="font-display text-xl font-semibold text-ink">
              Performance
            </h3>
            <p className="text-sm text-ink-muted sm:text-base">
              Optimized for low-bandwidth environments without compromising on
              modern aesthetics or functionality.
            </p>
          </div>

          {/* Skill-Focused — spans 2 cols */}
          <div className="card-lift flex flex-col gap-6 rounded-3xl border border-border-line bg-bg-elevated p-6 md:col-span-2 md:flex-row-reverse md:p-8">
            <div className="flex-1 space-y-4">
              <Brain className="h-10 w-10 text-brand-green-light" />
              <h3 className="font-display text-xl font-semibold text-ink">
                Skill-Focused
              </h3>
              <p className="text-sm text-ink-muted sm:text-base">
                We move beyond degrees. Our platform highlights what you can
                actually do, showcasing skills through real-world courses and
                projects.
              </p>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-brand-green/10 bg-brand-green/5 p-6">
              <Award className="h-20 w-20 text-brand-green/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
