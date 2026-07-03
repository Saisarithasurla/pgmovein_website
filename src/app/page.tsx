"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Star, Sparkles, Shield, Clock, BadgeCheck, Users, ArrowRight, Tag } from "lucide-react";
import SearchBar from "../components/SearchBar";
import AreaCard from "../components/AreaCard";
import PropertyCard from "../components/PropertyCard";
import TestimonialCard from "../components/TestimonialCard";
import ScrollReveal from "../components/ScrollReveal";
import { mockProperties } from "../data/mockData";
import { useLead } from "../context/LeadContext";

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { openPopup } = useLead();

  const handleGetBestPrice = () => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "cta_click",
        params: { button_name: "get-best-price" }
      });
    }
    openPopup("get-best-price", { id: null, name: "General" });
  };

  // Popular Areas details
  const popularAreas = [
    { name: "Koramangala", count: 24 },
    { name: "Whitefield", count: 18 },
    { name: "HSR Layout", count: 20 },
    { name: "Marathahalli", count: 15 },
    { name: "Indiranagar", count: 12 },
    { name: "Electronic City", count: 16 },
    { name: "BTM Layout", count: 22 },
    { name: "Bellandur", count: 14 }
  ];

  // Featured properties
  const featuredProperties = mockProperties.filter((p) => p.featured).slice(0, 6);

  // FAQ list
  const faqs = [
    {
      q: "Is PGMove free for tenants?",
      a: "Yes! Searching for PGs, viewing listings, and submitting enquiries is 100% free for all tenants. We believe in transparency and zero brokerage."
    },
    {
      q: "How are PGs verified?",
      a: "Our field team physically visits each PG listed as 'Verified' on our platform to cross-verify the images, security features, amenities, and owner documents."
    },
    {
      q: "Can I schedule a visit before moving in?",
      a: "Absolutely. Once you request contact details, you can speak directly with the owner to arrange a physical or virtual visit at your convenience."
    },
    {
      q: "What does the monthly rent include?",
      a: "It varies by PG. However, most listings include basic room amenities, Wi-Fi, and housekeeping. Food and laundry may be included or charged extra as detailed in the PG's pricing card."
    },
    {
      q: "How do I contact the PG owner?",
      a: "Simply click any call-to-action (like 'Contact Us' or 'Get Best Price') on the PG Details Page, fill in your details, verify with OTP, and get instant access to the owner's contact details."
    },
    {
      q: "Can I negotiate the rent?",
      a: "Yes, since you connect directly with the PG owners without any brokers, you are free to discuss and negotiate rent, security deposit terms, or minimum stay periods."
    }
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">

      <main className="flex-grow">
        {/* Section 2: Hero Banner */}
        <section className="relative overflow-hidden bg-[#F5F7FF] pt-20 pb-16 md:pb-28 px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Subtle colored background blurs */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-200/20 blur-3xl -z-0"></div>
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 rounded-full bg-purple-200/10 blur-3xl -z-0"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
            {/* Badges — grouped together in document flow */}
            <ScrollReveal variant="scale" delay={0} className="z-20 w-full px-4 mb-2">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-2xl mx-auto">
                {/* Static Badge */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap select-none h-[34px]">
                  <span>Bangalore's #1 PG Finder</span>
                </div>
                
                {/* Interactive Get Best Price Badge */}
                <button
                  onClick={handleGetBestPrice}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer h-[34px] group"
                >
                  <Tag className="h-3.5 w-3.5 text-white" />
                  <span>Get Best Price</span>
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={0}>
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-snug">
                Find Your Perfect PG <br />
                <span className="text-purple-600">in Bangalore</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={0}>
              {/* Subtext */}
              <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-slate-500 font-medium leading-relaxed">
                Verified PGs, Hostels &amp; Co-Living spaces near your office or college. Zero brokerage. Direct connection.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 3: Search Bar */}
        <section className="px-4 sm:px-6 lg:px-8 relative mb-6 md:mb-20">
          <ScrollReveal variant="slideUp" delay={0}>
            <SearchBar />
          </ScrollReveal>
        </section>

        {/* Section 4: Popular Locations */}
        <section id="popular-areas" className="bg-white pt-8 pb-16 md:py-16 scroll-mt-20 border-b border-gray-100">
          <ScrollReveal variant="slideLeft" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Popular Areas in Bangalore
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Explore high-demand IT hubs and college locations with verified property options.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularAreas.map((area, idx) => (
                <AreaCard key={idx} name={area.name} pgCount={area.count} />
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Section 5: Featured PGs */}
        <section className="py-20 bg-gray-50/50">
          <ScrollReveal variant="scale" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Featured PGs in Bangalore
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Premium, handpicked accommodations personally verified by our quality assurance team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3.5 rounded-xl transition-all shadow-md shadow-purple-100 hover:-translate-y-0.5"
              >
                View All PGs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Section 6: Why Choose PGMove */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="slideRight">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-extrabold text-navy tracking-tight">
                Why Choose PGMove?
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                We make PG finding transparent, reliable, and super fast.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                <img
                  src="https://picsum.photos/400/250?random=11"
                  alt="Zero Brokerage"
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="p-2 bg-purple-50 text-purple-650 rounded-lg w-fit">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-gray-950 text-base">Zero Brokerage</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    No hidden charges, middleman commissions, or token payments. Connect directly with verified owners.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                <img
                  src="https://picsum.photos/400/250?random=12"
                  alt="Verified Listings"
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="p-2 bg-purple-50 text-purple-650 rounded-lg w-fit">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-gray-950 text-base">Verified Listings</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Every PG listed goes through double validation steps. Rest assured you see only real, checked images.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                <img
                  src="https://picsum.photos/400/250?random=13"
                  alt="Instant Contact"
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="p-2 bg-purple-50 text-purple-650 rounded-lg w-fit">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-gray-950 text-base">Instant Contact</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Get owner mobile numbers or WhatsApp links directly post verification. No waiting times or requests.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                <img
                  src="https://picsum.photos/400/250?random=14"
                  alt="Best Price"
                  className="w-full h-40 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="p-2 bg-purple-50 text-purple-650 rounded-lg w-fit">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-gray-950 text-base">Best Price</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    Find sharing options starting at just ₹4,500/month. Filter details tailored to your budget constraints.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Section 7: How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50 text-gray-900 scroll-mt-20">
          <ScrollReveal variant="slideUp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy">How PGMove Works</h2>
              <p className="text-gray-500 mt-2 font-medium">
                Get into your room in 4 simple, stress-free stages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Illustrative Co-Living Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <img
                    src="https://picsum.photos/600/500?random=15"
                    alt="Premium Co-Living Space"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                    <p className="text-white text-sm font-semibold tracking-wide">
                      Real accommodations verified by our quality assurance team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Step-by-Step Cards */}
              <div className="lg:col-span-7 space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-purple-50 text-purple-650 font-bold flex items-center justify-center border border-purple-150">
                    1
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900 text-base">Search</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Filter properties by area, budget preference, gender and occupancy options.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-purple-50 text-purple-650 font-bold flex items-center justify-center border border-purple-150">
                    2
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900 text-base">Select</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Compare pricing details, food inclusions, curfew rules and surrounding map landmarks.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-purple-50 text-purple-650 font-bold flex items-center justify-center border border-purple-150">
                    3
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900 text-base">Visit</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Connect with the owner immediately and schedule a visit directly without intermediary brokers.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-purple-50 text-purple-650 font-bold flex items-center justify-center border border-purple-150">
                    4
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-950 text-base">Move In</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Confirm room availability, pay security deposit, and claim your keys to settle in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Section 8: Customer Reviews */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="scale">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                What Our Tenants Say
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Join thousands of happy job professionals and university students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Aditya Sen"
                collegeOrCompany="Wipro Technologies"
                area="Koramangala"
                reviewText="Finding a clean, zero-brokerage room in Koramangala was incredibly easy through PGMove. Got the owner details instantly after verification, toured the place and moved in the next day."
              />
              <TestimonialCard
                name="Meera Nair"
                collegeOrCompany="NIFT Bangalore"
                area="HSR Layout"
                reviewText="The PG listed exactly matched the photos on PGMove. Secure building, good food, and absolutely transparent deposit details. Curfew and rules are pre-disclosed which I loved."
              />
              <TestimonialCard
                name="Rohan Das"
                collegeOrCompany="IIIT Bangalore Student"
                area="Electronic City"
                reviewText="I was worried about fake listings in EC, but the verified badge here is legit. The website filters helped me target exactly double occupancy under my budget of 10k."
              />
            </div>
          </ScrollReveal>
        </section>        {/* Section 9: FAQ */}
        <section id="faq" className="py-20 bg-gray-50 scroll-mt-20">
          <ScrollReveal variant="fade" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-purple-50/20 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-purple-650 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>
      </main>
    </div>
  );
}
