const sections = [
  {
    title: "1. Cancellations",
    body: "If you wish to cancel a paid service booked through GharStay, please contact us at hello@gharstay.in as soon as possible. Cancellation requests made within [X] hours/days of booking may be eligible for a full or partial refund, depending on the service.",
  },
  {
    title: "2. Refund Eligibility",
    body: "Refunds will be evaluated on a case-by-case basis depending on the stage of service delivery. Services that have already been partially or fully rendered may not be eligible for a refund.",
  },
  {
    title: "3. Refund Processing Time",
    body: "Approved refunds will be processed within 7-10 business days to the original payment method used.",
  },
  {
    title: "4. Non-Refundable Situations",
    body: "GharStay is not responsible for refunding any amount paid directly to property owners, including rent, security deposits, or booking advances, as these transactions occur outside our platform.",
  },
  {
    title: "5. Contact for Refund Requests",
    body: "For any refund or cancellation requests, please email hello@gharstay.in with your booking details.",
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">Refund & Cancellation Policy</h1>
      <p className="mt-3 text-sm font-semibold text-slate-500">Last Updated: June 30, 2026</p>
      <p className="mt-8 leading-7 text-slate-600">
        This policy applies to any paid services offered directly through GharStay, such as Relocation Support or premium listing features. It does not apply to rent, deposits, or payments made directly between tenants and property owners, which are outside GharStay&apos;s control.
      </p>
      <div className="mt-8 space-y-7">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-bold text-navy">{section.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
