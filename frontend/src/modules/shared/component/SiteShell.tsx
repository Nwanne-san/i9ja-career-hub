import Footer from "@/modules/shared/component/Footer";
import Navbar from "@/modules/shared/component/Navbar";
import MobileBottomNav from "@/modules/shared/component/MobileBottomNav";
import type { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Navbar />
      {children}
      <MobileBottomNav />
      <Footer />
    </>
  );
}
