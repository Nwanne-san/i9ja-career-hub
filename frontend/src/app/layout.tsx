import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "../theme/globals.css";
import Providers from "./providers";
import MobileBottomNav from "@/modules/shared/component/MobileBottomNav";
import ScrollToTop from "@/modules/shared/component/ScrollToTop";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "i9ja | Your Nigerian Hub for Jobs, Courses & Community",
  description:
    "Connect with Nigeria's trusted platform for jobs, free courses, and community discussions.",
  keywords: "Nigeria, jobs, courses, community, forums, career",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} flex min-h-screen flex-col bg-bg-base font-body text-ink antialiased`}
      >
        <Providers>
          <ScrollToTop />
          <div className="flex-1">{children}</div>
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
