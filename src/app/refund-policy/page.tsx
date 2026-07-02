import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Refund Policy</h1>
          <p className="text-sm text-gray-400 font-bold">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-purple max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <p>
            At PGMove, we focus on connecting tenants directly with PG owners. As such, we have clear guidelines regarding transaction refunds.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Booking &amp; Token Sums</h2>
          <p>
            PGMove does not handle, process, or hold token bookings, security deposits, or advance rents. All financial exchanges are done directly between you (the tenant) and the respective property host.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Dispute Resolution</h2>
          <p>
            Any requests for refunds of tokens, booking cancellations, or deposit deductions must be raised directly with the PG owner according to their specific house refund terms. PGMove is not responsible for refunding security deposits or rental payments under any circumstances.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Listing Verification Payments</h2>
          <p>
            If a property host opts for premium list boosting, verification audits, or advertising packages, payments are non-refundable unless specified otherwise in the service invoice.
          </p>
        </div>
      </div>
    </div>
  );
}
