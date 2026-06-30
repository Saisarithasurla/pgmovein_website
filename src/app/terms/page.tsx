const sections = [
  {
    title: "1. About GharStay",
    body: "GharStay is an online platform that connects tenants with property owners offering PGs, hostels, flats, apartments, and co-living spaces. GharStay acts solely as a listing and discovery platform and is not a party to any rental, lease, or accommodation agreement between tenants and property owners.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old to create an account or use GharStay's services. By using this platform, you confirm that the information you provide is accurate and that you have the legal capacity to enter into agreements.",
  },
  {
    title: "3. Listings and Accuracy of Information",
    body: 'Property listings on GharStay are provided by property owners or their representatives. While we make reasonable efforts to verify listings through our "Verified" badge process, GharStay does not guarantee the accuracy, completeness, or current availability of any listing. Users are encouraged to independently verify property details, photos, pricing, and amenities before making any commitments.',
  },
  {
    title: "4. User Responsibilities",
    body: "Users agree not to misuse the platform, including posting false information, harassing other users or property owners, or attempting to bypass the platform for fraudulent purposes. Users are responsible for any communication, negotiation, and agreements made directly with property owners.",
  },
  {
    title: "5. No Guarantee of Transaction",
    body: "GharStay does not collect rent, security deposits, or any transactional payments between tenants and property owners unless explicitly stated for specific paid services (such as Relocation Support). Any financial transactions conducted directly between users are outside GharStay's control and responsibility.",
  },
  {
    title: "6. Account Suspension",
    body: "GharStay reserves the right to suspend or terminate any user account found violating these terms, posting fraudulent listings, or engaging in harmful conduct on the platform.",
  },
  {
    title: "7. Limitation of Liability",
    body: "GharStay shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of the platform, including disputes between tenants and property owners, inaccurate listings, or any losses incurred during the rental process.",
  },
  {
    title: "8. Changes to Terms",
    body: "GharStay reserves the right to update these Terms & Conditions at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "9. Contact Us",
    body: "For any questions regarding these terms, please contact us at hello@gharstay.in.",
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">Terms & Conditions</h1>
      <p className="mt-3 text-sm font-semibold text-slate-500">Last Updated: June 30, 2026</p>
      <p className="mt-8 leading-7 text-slate-600">
        Welcome to GharStay. By accessing or using our website and services, you agree to be bound by the following terms and conditions. Please read them carefully.
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
