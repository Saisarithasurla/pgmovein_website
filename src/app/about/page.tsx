"use client";

import Link from "next/link";
import { Users, Building2, MapPinned, BadgeCheck, ArrowRight, ShieldCheck, Heart, Users2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { easeOutQuart, staggerContainer, staggerItem } from "@/lib/animations";

const stats = [
  { icon: Users, label: "Happy Tenants", target: 12500, suffix: "+" },
  { icon: Building2, label: "Stays Listed", target: 3600, suffix: "+" },
  { icon: MapPinned, label: "Cities Covered", target: 5, suffix: "" }, // updated to match actual city count in mockData (5 cities: Hyderabad, Bangalore, Mumbai, Pune, Chennai)
  { icon: BadgeCheck, label: "Verified Properties", target: 2100, suffix: "+" },
] as const;

const values = [
  {
    icon: ShieldCheck,
    title: "Transparency First",
    description: "Every listing shows clear rent, deposit, and amenity details upfront, so there are no surprises during your visit.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: BadgeCheck,
    title: "Verified Listings",
    description: "We review property details before they go live, helping you avoid fake or misleading listings.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Users2,
    title: "No Middlemen",
    description: "Talk directly to property owners through call or WhatsApp — faster communication, fewer delays.",
    color: "from-saffron to-amber-600",
  },
  {
    icon: Sparkles,
    title: "For Every Budget",
    description: "From shared PGs to premium apartments, we list options across a wide range of budgets and cities.",
    color: "from-violet-500 to-purple-600",
  },
] as const;

export default function AboutPage() {
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
              OUR MISSION
            </span>
          </motion.div>
          <motion.h1
            className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutQuart }}
          >
            Finding a home shouldn&apos;t feel <br className="hidden sm:inline" />
            like a search party
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutQuart }}
          >
            GharStay was built to make renting simple, honest, and stress-free — for tenants and property owners alike.
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.06),transparent_40%)]" />
      </section>

      {/* Our Story & What We Do */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">Our Story</h2>
              <div className="mt-6 space-y-6 text-base leading-7 text-slate-600">
                <p>
                  Finding a place to live, whether it&apos;s a PG, a flat, or a co-living space, often means scrolling through outdated listings, chasing brokers, and visiting properties that look nothing like their photos. We started GharStay to fix that.
                </p>
                <p>
                  Our goal is simple: connect tenants directly with verified property owners, with clear information, real photos, and no unnecessary middlemen. Whether you&apos;re a student looking for your first PG, a working professional relocating to a new city, or a family searching for an apartment, GharStay is built to make that search faster and more trustworthy.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">What We Do</h2>
              <div className="mt-6 space-y-6 text-base leading-7 text-slate-600">
                <p>
                  GharStay is a rental property platform that helps tenants discover PGs, hostels, flats, apartments, and co-living spaces across India&apos;s major cities. We verify listings, provide clear rent and amenity details, and let tenants connect directly with property owners through call or WhatsApp — no hidden brokerage fees, no guesswork.
                </p>
                <div className="mt-8 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold">Looking to find a stay?</h3>
                    <p className="mt-2 text-sm text-violet-100">
                      Explore options and filters tailored to your location, budget, and sharing preferences.
                    </p>
                    <Link
                      href="/properties"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50"
                    >
                      Browse Properties
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                    <Building2 className="h-40 w-40" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-violet-100 bg-[#fbfaff] py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((item) => (
            <ScrollReveal key={item.label}>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-saffron ring-1 ring-violet-100">
                <item.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">
                <AnimatedCounter target={item.target} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">{item.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">What we stand for</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                Our core values guide how we build our product, verify properties, and serve our community.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <ScrollReveal key={value.title} delay={idx * 0.1}>
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${value.color} text-white shadow-sm`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-[#f5f7ff] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.06),transparent_40%)]" />
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Ready to find your next home?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              Browse thousands of verified listings across India&apos;s top cities.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-saffron px-6 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(242,120,40,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-saffron/90"
              >
                Explore Properties
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
