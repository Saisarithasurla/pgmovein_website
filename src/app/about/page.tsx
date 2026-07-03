"use client";

import React from "react";
import { Shield, Target, Users, Sparkles } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="bg-[#F5F7FF] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-28 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        {/* Subtle dot-grid pattern background */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Soft purple gradient blobs */}
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-purple-200/25 blur-3xl -z-0"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-200/20 blur-3xl -z-0"></div>

        <ScrollReveal variant="fade" className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5F3FF] border border-purple-100 text-[#7C3AED] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Our Mission
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-[#1E1B2E] leading-tight">
            About PGMove
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#6B7280] font-medium leading-relaxed">
            Simplifying co-living and paying guest discovery in Bangalore through physical verification, zero brokerage, and direct contact.
          </p>
        </ScrollReveal>
      </section>

      {/* Stats Bar (Floating overlapping card) */}
      <section className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        <ScrollReveal variant="scale">
          <div className="bg-white rounded-[20px] shadow-lg p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-gray-100">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED] block">12k+</span>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Tenants Served</span>
            </div>
            <div className="border-l border-gray-100 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED] block">500+</span>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Verified PGs</span>
            </div>
            <div className="border-l border-gray-100 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED] block">10+</span>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Prime Localities</span>
            </div>
            <div className="border-l border-gray-100 space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED] block">₹0</span>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Brokerage Charged</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Container */}
      <section className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 space-y-24">
        {/* Our Story Section */}
        <ScrollReveal variant="slideLeft" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Story details */}
          <div className="lg:col-span-7 space-y-7">
            {/* Section label */}
            <div className="flex items-center gap-3">
              <h2 className="font-display text-3xl font-extrabold text-[#1E1B2E] tracking-tight">Our Story</h2>
              <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-widest bg-[#F5F3FF] border border-purple-100 px-3 py-1 rounded-full">
                Since 2024
              </span>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-[#6B7280] font-medium leading-relaxed">
              <p>
                It started with a frustrating house-hunt. Our founders — engineers who moved to Bangalore for work — wasted weeks on fake listings, broker fees, and PGs that looked nothing like their photos.
              </p>
              <p>
                That experience sparked a simple question: <span className="text-[#1E1B2E] font-semibold">what if finding a PG was honest and straightforward?</span> So we built PGMove — where every listing is physically verified before it goes live.
              </p>

              {/* Highlighted quote */}
              <blockquote className="border-l-4 border-[#7C3AED] pl-5 py-2 bg-[#F5F3FF]/60 rounded-r-xl">
                <p className="text-[#4C1D95] font-semibold text-sm italic leading-relaxed">
                  &ldquo;We don&apos;t just list PGs — we visit, verify, and only then show them to you. That&apos;s our promise.&rdquo;
                </p>
              </blockquote>

              <p>
                Today, PGMove connects tenants directly with trusted PG owners across Koramangala, Whitefield, HSR Layout, Indiranagar and more — zero brokerage, zero surprises.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80"
                alt="Co-living space in Bangalore"
                className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent flex items-end p-6">
                <div className="space-y-1">
                  <p className="text-white text-sm font-bold leading-snug">
                    Verified. Trusted. Home.
                  </p>
                  <p className="text-white/70 text-xs font-medium">
                    Every PG personally checked by our team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Values Section */}
        <div className="space-y-12">
          <ScrollReveal variant="slideRight" className="text-center space-y-2">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-widest block">HOW WE DELIVER</span>
            <h2 className="font-display text-3xl font-extrabold text-[#1E1B2E] tracking-tight">Core Values We Live By</h2>
          </ScrollReveal>

          <ScrollReveal variant="scale" className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-50 space-y-5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6 text-[#7C3AED]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-[#1E1B2E] text-lg">Uncompromising Audits</h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-medium">
                  Our operations team physically verifies every single listing to guarantee pictures, layouts, curfew hours, and security parameters match the truth.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-50 space-y-5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
                <Target className="h-6 w-6 text-[#7C3AED]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-[#1E1B2E] text-lg">Pure Transparency</h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-medium">
                  We believe in full upfront disclosures. All sharing prices, security deposit structures, gate curfew timings, and house guidelines are open to view.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-50 space-y-5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-[#7C3AED]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-[#1E1B2E] text-lg">Zero Middlemen</h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-medium">
                  We collect zero token or booking commission fees. By putting you in direct contact with PG owners, we ensure the lowest prices possible.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
