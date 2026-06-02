import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About i9ja - Connecting Nigerian Talent",
  description:
    "Connecting Nigeria's brightest minds to global opportunities through verified networking, high-signal discussions, and direct access to growth.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
