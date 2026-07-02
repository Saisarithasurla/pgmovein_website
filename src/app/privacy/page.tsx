import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-400 font-bold">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-purple max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <p>
            At PGMove, we value the privacy of our visitors. This Privacy Policy details how we collect, store, and utilize your personal information.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Information We Collect</h2>
          <p>
            When you register an enquiry on PGMove, we collect your Full Name, Mobile Number, Email Address, Move-in Date, Preferred Area, Budget Range, and professional/academic affiliation (if provided).
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. How We Use Your Data</h2>
          <p>
            The collected information is used solely to facilitate connection between you and the respective PG owner. We share your contact coordinates with the property owner you enquired about, enabling them to connect with you via Call or WhatsApp.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Storage &amp; Cookies</h2>
          <p>
            Your enquiries are saved in your browser's local storage and session storage to manage navigation flow and prevent repetitive popup alerts during your active session.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">4. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or lease your private contact information to third-party marketing companies. Data is only shared with verified PG hosts that you explicitly initiate contact with.
          </p>
        </div>
      </div>
    </div>
  );
}
