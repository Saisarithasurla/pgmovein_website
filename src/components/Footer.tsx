import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

// Inline social icon SVGs since lucide-react doesn't export them
const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path fill="white" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line stroke="white" strokeWidth="2" x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-800">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-lg">
                P
              </span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                PGMove
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Find Your Perfect PG in Bangalore. Verified rooms, hostels & co-living spaces near you. Zero brokerage, guaranteed.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-purple-500 transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="hover:text-purple-500 transition-colors">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:text-white transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="/#popular-areas" className="hover:text-white transition-colors">
                  Areas
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Contact */}
          <div className="space-y-4 text-sm">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Support & Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="hover:text-white transition-colors block">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors block">
                  Contact Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-500" />
                <a href="tel:+919108421609" className="text-gray-300 hover:text-white transition-colors">
                  +91 91084 21609
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-500" />
                <a href="mailto:agent@pgmove.in" className="text-gray-300 hover:text-white transition-colors">
                  agent@pgmove.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-purple-500 mt-0.5" />
                <span className="text-gray-300">
                  Sector 6, HSR Layout, Bangalore, KA, India - 560102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-gray-500 gap-4">
          <div>
            © 2026 PGMove. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
