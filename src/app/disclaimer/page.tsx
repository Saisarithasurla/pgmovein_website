import React from "react";

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Disclaimer</h1>
          <p className="text-sm text-gray-400 font-bold">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-purple max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <p>
            The information presented on PGMove is provided for general informational purposes only and may not be fully accurate, complete, or up to date at all times.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. No Tenancy Contract</h2>
          <p>
            PGMove is a digital listing and lead generation platform. We do not act as a party to any rental agreement, tenancy contract, license agreement, or PG accommodation booking. Any agreement made between a tenant and a PG owner is solely at the parties' own discretion.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Listing Accuracy</h2>
          <p>
            While we strive to maintain accurate and up-to-date PG listings, we cannot guarantee that rent prices, availability, amenities, food menus, or house rules are precisely current as circumstances may change at any time at the PG owner's discretion.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. External Links &amp; Maps</h2>
          <p>
            PGMove may embed maps, street-view tools, or third-party links for navigational purposes. We assume no responsibility for the accuracy of external map data or third-party content linked from our platform.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">4. Safety Advisory</h2>
          <p>
            PGMove strongly advises tenants to physically inspect each property before making any rental payment or advance deposit transfer. Do not transfer money before visiting the property and confirming details in person with the owner.
          </p>
        </div>
      </div>
    </div>
  );
}
