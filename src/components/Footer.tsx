"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const socialLinks = [
  // TODO: Replace placeholder social URLs with active GharStay profiles before launch.
  { label: "Instagram", href: "https://instagram.com/gharstay", icon: IconBrandInstagram },
  { label: "Facebook", href: "https://facebook.com/gharstay", icon: IconBrandFacebook },
  { label: "LinkedIn", href: "https://linkedin.com/company/gharstay", icon: IconBrandLinkedin },
  { label: "Twitter/X", href: "https://x.com/gharstay", icon: IconBrandX },
] as const;

const seoSearchLinks = [
  { label: "PG in Madhapur", city: "hyderabad", area: "Madhapur", type: "PG" },
  { label: "Flats in Bangalore", city: "bangalore", area: "", type: "Flat" },
  { label: "Hostels in Mumbai", city: "mumbai", area: "", type: "Hostel" },
  { label: "Co-Living in Pune", city: "pune", area: "", type: "Co-Living" },
  { label: "PG in Marathahalli", city: "bangalore", area: "Marathahalli", type: "PG" },
  { label: "Flats in Andheri", city: "mumbai", area: "Andheri", type: "Flat" },
  { label: "PG in Kondapur", city: "hyderabad", area: "Kondapur", type: "PG" },
  { label: "Hostels in Whitefield", city: "bangalore", area: "Whitefield", type: "Hostel" },
] as const;

function propertySearchHref({ city, area, type }: { city: string; area: string; type: string }) {
  const params = new URLSearchParams({ city, type });
  if (area) params.set("area", area);
  return `/properties?${params.toString()}`;
}

export default function Footer() {
  return (
    <footer className="border-t border-violet-100 bg-white text-navy">
      <motion.div
        className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div variants={staggerItem}>
          <Link href="/" className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-saffron sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron text-base font-black text-white">
              G
            </span>
            GharStay
          </Link>
          <p className="text-sm leading-6 text-slate-600">Verified PGs, flats, hostels, and co-living spaces across India.</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`GharStay on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-saffron transition-all duration-200 hover:-translate-y-0.5 hover:bg-saffron hover:text-white"
              >
                <Icon size={19} stroke={1.8} />
              </a>
            ))}
          </div>
        </motion.div>

        <FooterColumn
          title="Explore"
          links={[
            ["Home", "/"],
            ["Properties", "/properties"],
            ["Areas", "/#popular-areas"],
            ["Saved Properties", "/saved"],
            ["My Bookings", "/bookings"],
            ["FAQ", "/#faq"],
          ]}
        />

        <FooterColumn
          title="Legal"
          links={[
            ["Terms & Conditions", "/terms"],
            ["Privacy Policy", "/privacy"],
            ["Refund & Cancellation Policy", "/refund-policy"],
            ["Disclaimer", "/disclaimer"],
          ]}
        />

        <motion.div variants={staggerItem}>
          <h3 className="mb-4 font-display text-lg font-bold">Support & Account</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            <Link href="/#faq" className="footer-link">Help Center</Link>
            <Link href="/auth/tenant/login" className="footer-link">Tenant Login</Link>
            <Link href="/auth/tenant/signup" className="footer-link">Create Account</Link>
            <div className="mt-1 border-t border-violet-100 pt-4">
              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-saffron" />+91 9000000000</span>
                <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-saffron" />hello@gharstay.in</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-violet-100 bg-[#fbfaff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 lg:px-8">
          <span>(c) 2026 GharStay. All rights reserved.</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <motion.div variants={staggerItem}>
      <h3 className="mb-4 font-display text-lg font-bold">{title}</h3>
      <div className="flex flex-col gap-3 text-sm">
        {links.map(([label, href]) => (
          <Link key={`${label}-${href}`} href={href} className="footer-link text-slate-600">
            {label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
