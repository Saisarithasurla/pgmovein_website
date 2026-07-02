import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-400 font-bold">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-purple max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <p>
            Welcome to PGMove. By accessing or using our website, platform, and services, you agree to comply with and be bound by the following Terms &amp; Conditions.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Scope of Services</h2>
          <p>
            PGMove provides a digital listing platform that allows property owners and representatives to list guest houses, hostels, and paying guest (PG) accommodations, and enables users to browse, search, and contact these owners directly.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Zero Brokerage Guarantee</h2>
          <p>
            We do not act as agents or intermediaries in transactions between tenants and owners. No booking commissions or brokerage fees are collected from tenants. All negotiations, deposit agreements, and rental contracts are finalized directly between the user and the PG owner.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Verification Disclaimer</h2>
          <p>
            While our quality check team makes best efforts to physically inspect PGs marked as "Verified" to confirm photo authenticity and amenities, PGMove does not guarantee the safety, standard, food quality, or security of any property. Users are strongly advised to perform a physical inspection before handing over deposit monies.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">4. User Account &amp; OTP Verification</h2>
          <p>
            To obtain property owner contact details, users must fill in a lead form and authenticate their phone number using OTP. By verifying, you agree to receive follow-up phone calls, SMS texts, and WhatsApp messages from PGMove representatives and PG owners.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India, and any disputes will be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.
          </p>
        </div>
      </div>
    </div>
  );
}
