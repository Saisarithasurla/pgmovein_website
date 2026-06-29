"use client";

import Link from "next/link";
import { Home, Mail, MessageCircle, Phone, Rss, Send, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <motion.div
        className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div variants={staggerItem}>
          <Link href="/" className="mb-4 flex items-center gap-2 font-display text-xl font-bold sm:text-2xl">
            <Home className="h-7 w-7 text-amber-200" />
            GharStay
          </Link>
          <p className="text-sm leading-6 text-white/75">Verified PGs, flats, hostels, and co-living spaces across India.</p>
          <div className="mt-5 flex gap-3 text-white/80">
            {[MessageCircle, Send, Share2, Rss].map((Icon, index) => (
              <motion.span key={index} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}>
                <Icon className="h-5 w-5" />
              </motion.span>
            ))}
          </div>
        </motion.div>

        <FooterColumn
          title="Explore"
          links={[
            ["Home", "/"],
            ["Properties", "/properties"],
            ["Areas", "/areas/hyderabad"],
            ["Saved Properties", "/saved"],
            ["My Bookings", "/bookings"],
            ["FAQ", "/#faq"],
          ]}
        />

        <FooterColumn
          title="Account"
          links={[
            ["Tenant Login", "/auth/tenant/login"],
            ["Create Account", "/auth/tenant/signup"],
          ]}
        />

        <motion.div variants={staggerItem}>
          <h3 className="mb-4 font-display text-lg font-bold">Support</h3>
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <Link href="/#faq" className="footer-link">Help Center</Link>
            <Link href="/#faq" className="footer-link">Terms</Link>
            <Link href="/#faq" className="footer-link">Privacy Policy</Link>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-200" />+91 9000000000</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-amber-200" />hello@gharstay.in</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 lg:px-8">
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
          <Link key={`${label}-${href}`} href={href} className="footer-link text-white/75">
            {label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
