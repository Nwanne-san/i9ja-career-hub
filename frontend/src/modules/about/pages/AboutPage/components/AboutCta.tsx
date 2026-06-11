import Button from "@/modules/shared/component/Button";
import { AppRoutes } from "@/routes/app.routes";

export function AboutCta() {
  return (
    <section className="px-0 py-2 sm:py-4">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-brand-green p-8 text-center text-white shadow-2xl sm:p-12">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-5" />
        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Join the Future of Nigerian Talent
          </h2>
          <p className="mx-auto max-w-xl text-sm opacity-90 sm:text-base">
            Whether you&apos;re looking for your next career move or looking to
            hire the best, i9ja is where the signal starts.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <Button
              href={AppRoutes.login}
              className="rounded-full border-transparent bg-white px-8 py-3.5 text-brand-green hover:bg-white/90"
            >
              Create Free Account
            </Button>
            <Button
              href={AppRoutes.jobs}
              variant="outline"
              className="rounded-full border-white/30 bg-brand-green-dark px-8 py-3.5 text-white hover:bg-brand-green-dark/80 hover:text-white"
            >
              Browse Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
