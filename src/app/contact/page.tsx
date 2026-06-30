"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MessageSquare, ChevronDown, CheckCircle, ArrowRight, HelpCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { easeOutQuart } from "@/lib/animations";

// Separate the component logic to use useSearchParams inside a Suspense boundary
function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    if (subjectParam) {
      setFormData((prev) => ({ ...prev, subject: subjectParam }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request to Hello@gharstay.in
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
      setErrors({});
    }, 1200);
  };

  const handleSubjectSelect = (subj: string) => {
    setFormData((prev) => ({ ...prev, subject: subj }));
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-navy mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-violet-400 focus:ring-violet-100"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-violet-400 focus:ring-violet-100"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-1.5">
                  Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition-all focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  placeholder="+91 9000000000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-navy mb-1.5">
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleSubjectSelect(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 pr-10 text-navy"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Property Listing Issue">Property Listing Issue</option>
                  <option value="Account Help">Account Help</option>
                  <option value="Partnership/Owner Inquiry">Partnership/Owner Inquiry</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-navy mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.message ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-violet-400 focus:ring-violet-100"
                }`}
                placeholder="How can we help you?"
              />
              {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-saffron px-6 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(242,120,40,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-saffron/90 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy">Message Sent!</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Thanks for reaching out! We&apos;ll get back to you within 24-48 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-8 text-sm font-semibold text-saffron hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f5f7ff] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutQuart }}
          >
            <span className="inline-flex items-center rounded-full bg-violet-100/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-saffron ring-1 ring-violet-200">
              CONTACT US
            </span>
          </motion.div>
          <motion.h1
            className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutQuart }}
          >
            We&apos;re here to help
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutQuart }}
          >
            Have a question about a listing, your account, or how GharStay works? Reach out and we&apos;ll get back to you as soon as possible.
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.06),transparent_40%)]" />
      </section>

      {/* Main Content (Form & Sidebar) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-50 animate-pulse" />}>
                  <ContactFormContent />
                </Suspense>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal delay={0.15}>
                <div className="rounded-2xl border border-slate-100 bg-[#fbfaff] p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-navy mb-6">Other ways to reach us</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-saffron ring-1 ring-violet-100">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-navy">Phone</h4>
                        <p className="mt-1 text-sm text-slate-600 font-semibold">+91 9000000000</p>
                        <p className="mt-0.5 text-xs text-slate-500">Available Mon-Sat, 10 AM - 7 PM</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-saffron ring-1 ring-violet-100">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-navy">Email</h4>
                        <p className="mt-1 text-sm text-slate-600 font-semibold">hello@gharstay.in</p>
                        <p className="mt-0.5 text-xs text-slate-500">We typically respond within 24-48 hours</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-navy">WhatsApp</h4>
                        <p className="mt-0.5 text-xs text-slate-500">Chat with us directly</p>
                        <a
                          href="https://wa.me/919000000000?text=Hi%2C%20I%20have%20a%20question%20about%20GharStay."
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-50 shadow-sm"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Property Owners Section */}
              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-600 to-indigo-700 p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
                  <div className="relative z-10">
                    <h3 className="font-display text-lg font-bold">Want to list your property on GharStay?</h3>
                    <p className="mt-2 text-sm text-violet-100">
                      Reach thousands of verified tenants looking for their next home.
                    </p>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        const selectEl = document.getElementById("subject") as HTMLSelectElement;
                        if (selectEl) {
                          selectEl.value = "Partnership/Owner Inquiry";
                          selectEl.dispatchEvent(new Event("change", { bubbles: true }));
                          const formEl = document.getElementById("name");
                          if (formEl) formEl.focus();
                        }
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50"
                    >
                      List Your Property
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                    <Plus className="h-40 w-40" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mini FAQ Section */}
      <section className="bg-[#fbfaff] py-16 sm:py-24 border-t border-violet-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-2xl font-bold text-navy sm:text-3xl">Common Questions</h2>
          </ScrollReveal>
          
          <div className="mt-8 space-y-4">
            <ScrollReveal delay={0.1}>
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <button
                  onClick={() => toggleFaq(1)}
                  className="flex w-full items-center justify-between text-left font-display font-bold text-navy sm:text-lg"
                >
                  <span>Is GharStay free for tenants?</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${openFaq === 1 ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Yes. Searching properties, viewing details, and contacting owners is 100% free for tenants. We never charge any fee from tenants at any point.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <button
                  onClick={() => toggleFaq(2)}
                  className="flex w-full items-center justify-between text-left font-display font-bold text-navy sm:text-lg"
                >
                  <span>How do I contact the property owner?</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${openFaq === 2 ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Open any property and click the Contact Owner button. You can call directly or send a WhatsApp message to the owner. No middlemen - direct owner contact only.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
