const sections = [
  {
    title: "1. Information We Collect",
    items: [
      "Personal details such as your name, phone number, and email address when you create an account or contact a property owner",
      "Search and browsing activity, such as property types, areas, and filters you use",
      "Device and usage data, including IP address, browser type, and pages visited",
    ],
    intro: "We may collect the following types of information:",
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "Connect you with relevant property listings and owners",
      "Improve our website's functionality and user experience",
      "Send updates, notifications, or promotional content (you may opt out at any time)",
      "Respond to customer support inquiries",
    ],
    intro: "We use the information we collect to:",
  },
  {
    title: "3. Sharing of Information",
    body: "GharStay may share your contact details with property owners when you express interest in a listing, so they can respond to your inquiry. We do not sell your personal data to third parties for marketing purposes.",
  },
  {
    title: "4. Data Security",
    body: "We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies",
    body: "GharStay may use cookies to enhance your browsing experience, remember preferences, and analyze site traffic. You can disable cookies through your browser settings, though this may affect site functionality.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, update, or request deletion of your personal data. To make such a request, contact us at hello@gharstay.in.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.",
  },
  {
    title: "8. Contact Us",
    body: "If you have any questions about this Privacy Policy, please reach out to us at hello@gharstay.in.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm font-semibold text-slate-500">Last Updated: June 30, 2026</p>
      <p className="mt-8 leading-7 text-slate-600">
        GharStay (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data.
      </p>
      <div className="mt-8 space-y-7">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-bold text-navy">{section.title}</h2>
            {section.intro && <p className="mt-3 leading-7 text-slate-600">{section.intro}</p>}
            {section.body && <p className="mt-3 leading-7 text-slate-600">{section.body}</p>}
            {section.items && (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
