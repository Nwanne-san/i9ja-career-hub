import type { Metadata } from "next";
import Navbar from "@/modules/shared/component/Navbar";
import Footer from "@/modules/shared/component/Footer";

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username} | i9ja`,
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-page px-4 pb-16 pt-20 sm:px-6 md:pb-0 md:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-green/20 font-display text-2xl font-bold text-brand-green-light">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">@{username}</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Public profile — full profile UI will connect to the API in a later sprint.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
