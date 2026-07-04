"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadCapturePopup from "./LeadCapturePopup";

/**
 * Conditionally renders the Navbar, Footer, and LeadCapturePopup.
 * These are hidden on /agent/* routes (login, dashboard) since
 * agent pages have their own custom layouts.
 */
export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAgentRoute = pathname?.startsWith("/agent");

  if (isAgentRoute) {
    // Agent pages: no public chrome, just render children directly
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
