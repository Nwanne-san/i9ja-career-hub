import Footer from "@/modules/shared/component/Footer";
import Navbar from "@/modules/shared/component/Navbar";
import type { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
