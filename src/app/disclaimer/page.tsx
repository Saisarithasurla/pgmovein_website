const sections = [
  {
    title: "1. Listing Accuracy",
    body: 'Property details, photos, pricing, and availability are provided by property owners or their representatives. GharStay\'s "Verified" badge indicates basic verification checks but does not guarantee the property is free from misrepresentation. Users should independently confirm all details before making decisions.',
  },
  {
    title: "2. No Real Estate Advice",
    body: "GharStay does not provide legal, financial, or real estate advisory services. Any reliance you place on information from this platform is strictly at your own risk.",
  },
  {
    title: "3. Third-Party Links",
    body: "Our website may contain links to third-party websites or services. GharStay is not responsible for the content, accuracy, or practices of any linked third-party sites.",
  },
  {
    title: "4. Limitation of Liability",
    body: "In no event will GharStay be liable for any loss or damage, including indirect or consequential loss or damage, arising from the use of this platform or reliance on its content.",
  },
  {
    title: "5. Contact Us",
    body: "If you have questions about this disclaimer, contact us at hello@gharstay.in.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">Disclaimer</h1>
      <p className="mt-3 text-sm font-semibold text-slate-500">Last Updated: June 30, 2026</p>
      <p className="mt-8 leading-7 text-slate-600">
        The information provided on GharStay is for general informational purposes only. While we strive to keep listing information accurate and up to date, GharStay makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of any property listing.
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
