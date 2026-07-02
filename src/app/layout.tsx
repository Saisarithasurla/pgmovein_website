import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LeadCapturePopup from "../components/LeadCapturePopup";
import { LeadProvider } from "../context/LeadContext";
import { PropertyProvider } from "../context/PropertyContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PGMove — Find Verified PGs in Bangalore | Zero Brokerage",
  description:
    "Find verified PGs, hostels, and co-living spaces in Bangalore near your office or college. Zero brokerage. Instant contact with owners.",
  keywords: "PG in Bangalore, paying guest Bangalore, PG near me, hostel Bangalore, co-living Bangalore",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "PGMove — Find Verified PGs in Bangalore | Zero Brokerage",
    description:
      "Find verified PGs, hostels, and co-living spaces in Bangalore near your office or college. Zero brokerage. Instant contact with owners.",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F7FF]">
        <LeadProvider>
          <Suspense fallback={<div className="p-4 text-center text-xs">Loading Search...</div>}>
            <PropertyProvider>
              {/* Note: Navbar and Footer are managed globally in layout */}
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <LeadCapturePopup />
            </PropertyProvider>
          </Suspense>
        </LeadProvider>
      </body>
    </html>
  );
}
