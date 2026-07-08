"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadCapturePopup from "./LeadCapturePopup";

/**
 * Conditionally renders the Navbar, Footer, and LeadCapturePopup.
 * These are hidden on /agent/* and /admin/* routes (login, dashboard) since
 * they have their own custom layouts.
 */
export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInternalRoute = pathname?.startsWith("/agent") || pathname?.startsWith("/admin");

  if (isInternalRoute) {
    // Internal pages: no public chrome, just render children directly
    return <>{children}</>;
  }

  // Public pages: full Navbar + Footer + LeadCapturePopup
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <LeadCapturePopup />
    </>
  );
}
