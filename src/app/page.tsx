"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, ChevronDown, Eye, KeyRound, MapPin, MapPinned, PhoneCall, Search, Star, User, Users, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";
import SearchBar from "@/components/SearchBar";
import { areas, properties } from "@/data/mockData";
import { easeOutQuart, staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const quickPills = [
  { label: "PG in HSR Layout", href: "/properties?city=bangalore&area=HSR%20Layout&type=PG" },
  { label: "Hostel in Whitefield", href: "/properties?city=bangalore&area=Whitefield&type=Hostel" },
  { label: "Co-Living in Indiranagar", href: "/properties?city=bangalore&area=Indiranagar&type=Co-Living" },
  { label: "Flat in Koramangala", href: "/properties?city=bangalore&area=Koramangala&type=Flat" },
];
const propertyTypeTiles = [
  { label: "PG", description: "Paying guest accommodations", type: "PG", image: "https://picsum.photos/seed/gharstay-type-pg/640/420" },
  { label: "Hostel", description: "Shared hostel rooms", type: "Hostel", image: "https://picsum.photos/seed/gharstay-type-hostel/640/420" },
  { label: "Flat", description: "Independent flats", type: "Flat", image: "https://picsum.photos/seed/gharstay-type-flat/640/420" },
  { label: "Apartment", description: "Apartment complexes", type: "Flat", image: "https://picsum.photos/seed/gharstay-type-apartment/640/420" },
  { label: "Co-Living", description: "Modern co-living spaces", type: "Co-Living", image: "https://picsum.photos/seed/gharstay-type-coliving/640/420" },
  { label: "Independent House", description: "Standalone houses", type: "Room", image: "https://picsum.photos/seed/gharstay-type-house/640/420" },
] as const;
const featuredOrder = ["hsr-layout-premium-pg", "koramangala-co-living", "indiranagar-furnished-flat", "whitefield-family-flat", "marathahalli-studio-pg"];
const bangaloreAreaImages: Record<string, { image: string; landmark: string }> = {
  Marathahalli: { image: "https://picsum.photos/seed/gharstay-area-marathahalli/760/460", landmark: "Near ORR Junction" },
  Whitefield: { image: "https://picsum.photos/seed/gharstay-area-whitefield/760/460", landmark: "Near ITPL Tech Park" },
  Indiranagar: { image: "https://picsum.photos/seed/gharstay-area-indiranagar/760/460", landmark: "Near 100 Feet Road" },
  Koramangala: { image: "https://picsum.photos/seed/gharstay-area-koramangala/760/460", landmark: "Near Forum Mall" },
  Bellandur: { image: "https://picsum.photos/seed/gharstay-area-bellandur/760/460", landmark: "Near Ecospace" },
  "Electronic City": { image: "https://picsum.photos/seed/gharstay-area-electronic-city/760/460", landmark: "Near Phase 1" },
  "JP Nagar": { image: "https://picsum.photos/seed/gharstay-area-jp-nagar/760/460", landmark: "Near Metro Line" },
  "HSR Layout": { image: "https://picsum.photos/seed/gharstay-area-hsr-layout/760/460", landmark: "Near Sector 7" },
  "BTM Layout": { image: "https://picsum.photos/seed/gharstay-area-btm-layout/760/460", landmark: "Near Silk Board" },
  Yelahanka: { image: "https://picsum.photos/seed/gharstay-area-yelahanka/760/460", landmark: "Near Airport Road" },
  Jayanagar: { image: "https://picsum.photos/seed/gharstay-area-jayanagar/760/460", landmark: "Near 4th Block" },
  Hebbal: { image: "https://picsum.photos/seed/gharstay-area-hebbal/760/460", landmark: "Near Manyata Tech Park" },
};
const bangaloreAreaOrder = ["Hebbal", "Marathahalli", "Indiranagar", "JP Nagar", "Whitefield", "Bellandur", "Koramangala", "Yelahanka", "Electronic City", "HSR Layout", "Jayanagar", "BTM Layout"];
const stats = [
  { icon: Users, label: "Happy Tenants", target: 12500, suffix: "+" },
  { icon: Building2, label: "Stays Listed", target: 3600, suffix: "+" },
  { icon: MapPinned, label: "Bangalore Localities", target: 18, suffix: "" },
  { icon: BadgeCheck, label: "Verified Properties", target: 2100, suffix: "+" },
] as const;
const tenantSteps = [
  {
    icon: Search,
    label: "Search",
    description: "Find verified homes by city, area, type, and budget.",
  },
  {
    icon: Eye,
    label: "Explore",
    description: "Compare photos, amenities, rent, and owner details.",
  },
  {
    icon: PhoneCall,
    label: "Connect",
    description: "Call or message owners directly without middlemen.",
  },
  {
    icon: KeyRound,
    label: "Move In",
    description: "Visit, confirm details, and plan your move with confidence.",
  },
] as const;
const whyFeatures = [
  { label: "Verified Listings", description: "Properties checked for genuine details.", accent: "#7C3AED", image: "https://picsum.photos/seed/gharstay-verified-listings/640/420" },
  { label: "Secure Bookings", description: "Track requests before you commit.", accent: "#6D28D9", image: "https://picsum.photos/seed/gharstay-secure-bookings/640/420" },
  { label: "Direct Contact", description: "Talk to owners on call or WhatsApp.", accent: "#8B5CF6", image: "https://picsum.photos/seed/gharstay-direct-contact/640/420" },
  { label: "Best Deals", description: "Compare rent and negotiate directly.", accent: "#A855F7", image: "https://picsum.photos/seed/gharstay-best-deals/640/420" },
] as const;
const tenantReviews = [
  {
    name: "Priya S.",
    quote: "Booked a clean PG near work without chasing brokers. The rent, amenities, and owner contact were all clear.",
  },
  {
    name: "Arjun M.",
    quote: "The Bangalore area filters helped me compare HSR and Indiranagar quickly before scheduling visits.",
  },
  {
    name: "Nisha R.",
    quote: "Saved my shortlist, spoke directly with owners, and found a comfortable stay within my budget.",
  },
] as const;
const faqs = [
  {
    id: 1,
    question: "Is GharStay free for tenants?",
    answer:
      "Yes. Searching properties, viewing details, and contacting owners is 100% free for tenants. We never charge any fee from tenants at any point.",
  },
  {
    id: 2,
    question: "How do I contact the property owner?",
    answer:
      "Open any property and click the Contact Owner button. You can call directly or send a WhatsApp message to the owner. No middlemen - direct owner contact only.",
  },
  {
    id: 3,
    question: "What does the Verified badge mean?",
    answer:
      "Verified means our team has personally confirmed the property exists, the owner details are genuine, and the photos are real and recent. Always look for the green Verified badge when searching.",
  },
  {
    id: 4,
    question: "Can I visit the property before paying anything?",
    answer:
      "Always. We strongly recommend visiting the property in person before making any payment or signing any rental agreement. Never pay any advance without a physical visit.",
  },
  {
    id: 5,
    question: "Can I negotiate rent with the owner?",
    answer:
      "Yes. GharStay connects you directly with property owners. You can discuss and negotiate rent, security deposit amount, and move-in date directly with them over call or WhatsApp.",
  },
];

export default function HomePage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const featured = featuredOrder
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is (typeof properties)[number] => Boolean(property));
  const bangaloreAreas = bangaloreAreaOrder
    .map((name) => areas.find((area) => area.city === "bangalore" && area.name === name))
    .filter((area): area is (typeof areas)[number] => Boolean(area));

  return (
    <div className="bg-white">
      <section className="bg-[#f5f7ff]">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="mx-auto max-w-4xl">
            <motion.p
              className="mx-auto inline-flex items-center rounded-full bg-white/70 px-5 py-2 text-xs font-bold tracking-normal text-saffron shadow-sm ring-1 ring-violet-100 sm:text-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutQuart }}
            >
              INDIA&apos;S TRUSTED RENTAL PLATFORM
            </motion.p>
            <motion.h1
              className="mt-8 font-display text-4xl font-bold leading-tight text-navy sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeOutQuart }}
            >
              Find Your Next Home
              <br />
              With Ease
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: easeOutQuart }}
            >
              Search verified PGs, flats, hostels, and co-living spaces across India.
            </motion.p>
          </div>
          <motion.div
            className="mx-auto mt-12 max-w-5xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.4, ease: easeOutQuart }}
          >
            <SearchBar />
          </motion.div>
          <motion.div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 sm:gap-3" initial="hidden" animate="visible" variants={staggerContainer}>
            <span className="font-medium">Popular:</span>
            {quickPills.map((pill) => (
              <motion.div key={pill.label} variants={staggerItem} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}>
                <Link href={pill.href} className="inline-flex rounded-full bg-violet-100/75 px-3 py-2 text-xs font-semibold text-saffron transition-all duration-200 hover:bg-violet-200 sm:px-4 sm:text-sm">{pill.label}</Link>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-violet-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 text-center sm:grid-cols-2 sm:px-6 sm:py-10 lg:grid-cols-4 lg:px-8">
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

      <section id="how-it-works" className="scroll-mt-24 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">How <span className="text-saffron">GharStay</span> Works</h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {tenantSteps.map(({ icon: Icon, label, description }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(36,17,63,0.08)" }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: easeOutQuart }}
                className="rounded-md border border-slate-100 bg-white px-6 py-8 text-center shadow-sm"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-saffron font-display text-sm font-bold text-white shadow-[0_10px_24px_rgba(124,58,237,0.24)]">
                  {index + 1}
                </span>
                <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-saffron/10 text-saffron">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{label}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="property-types" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">Explore by Property Type</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">Choose the living space that fits the way you live</p>
          </ScrollReveal>
          <motion.div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {propertyTypeTiles.map((tile) => (
              <motion.div key={tile.label} variants={staggerItem} whileHover={{ y: -4, boxShadow: "0 14px 34px rgba(36,17,63,0.10)" }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Link href={`/properties?city=bangalore&type=${encodeURIComponent(tile.type)}`} className="block overflow-hidden rounded-2xl border border-slate-200 bg-white text-center transition-all duration-200 hover:border-saffron/40">
                  <div className="relative h-32">
                    <Image src={tile.image} alt={`${tile.label} accommodation`} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="px-5 py-5">
                    <h3 className="font-display text-lg font-bold text-navy">{tile.label}</h3>
                    <p className="mt-2 text-sm font-medium text-slate-500">{tile.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="popular-areas" className="scroll-mt-24 bg-[#f6f8fb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">Popular Areas in Bangalore</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">Popular areas in Bangalore for PGs, hostels, apartments, and easy daily commutes.</p>
          </ScrollReveal>
          <motion.div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {bangaloreAreas.map((area) => {
              const imageMeta = bangaloreAreaImages[area.name] ?? { image: `https://picsum.photos/seed/gharstay-area-${area.slug}/760/460`, landmark: "Near daily essentials" };

              return (
                <motion.article key={area.slug} variants={staggerItem} whileHover={{ y: -5, boxShadow: "0 16px 34px rgba(36,17,63,0.10)" }} transition={{ duration: 0.2 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Link href={`/properties?city=bangalore&area=${encodeURIComponent(area.name)}`} className="block">
                    <div className="relative h-40">
                      <Image src={imageMeta.image} alt={`${area.name} rental area`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold text-navy">{area.name}</h3>
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="h-4 w-4 fill-pink-500 text-pink-500" />
                        {imageMeta.landmark}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                        <span className="font-display text-base font-bold text-saffron">{area.propertyCount}+ Stays</span>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Featured Bangalore Properties</h2>
            <p className="mt-2 text-slate-500">Handpicked verified stays across HSR Layout, Indiranagar, Whitefield, Marathahalli, and Koramangala.</p>
          </ScrollReveal>
          <Link href="/properties?city=bangalore" className="inline-flex items-center justify-center rounded-xl border border-violet-200 px-4 py-2 text-sm font-bold text-saffron transition-all duration-200 hover:bg-violet-50">
            View All Properties
          </Link>
        </div>
        <motion.div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          {featured.map((property, index) => (
            <motion.div
              key={property.id}
              variants={staggerItem}
              whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(26,60,94,0.12)" }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className={cn("lg:col-span-2", index === 3 && "lg:col-start-2")}
            >
              <PropertyCard property={property} compact />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="why" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Why <span className="text-saffron">GharStay</span></h2>
        </ScrollReveal>
        <motion.div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          {whyFeatures.map(({ label, description, accent, image }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              whileHover={{ y: -3, boxShadow: "0 14px 34px rgba(26,60,94,0.10)" }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-md border-[0.5px] border-slate-200 bg-white shadow-sm sm:rounded-2xl"
            >
              <div className="h-[3px]" style={{ backgroundColor: accent }} />
              <div className="relative h-36">
                <Image src={image} alt={`${label} preview`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-navy">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="testimonials" className="scroll-mt-24 bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Testimonials</h2>
          </ScrollReveal>
          <motion.div className="mt-8 grid gap-6 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {tenantReviews.map((review) => (
              <motion.article key={review.name} variants={staggerItem} whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(26,60,94,0.08)" }} transition={{ duration: 0.2 }} className="rounded-md border border-slate-200 p-5 sm:p-6">
                <div className="flex gap-1 text-yellow-400">{Array.from({ length: 5 }).map((_, i) => <motion.span key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.3, ease: "backOut" }}><Star className="h-4 w-4 fill-yellow-400" /></motion.span>)}</div>
                <p className="mt-4 text-slate-600">{review.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white"><User className="h-5 w-5" /></span>
                  <span className="font-bold text-navy">{review.name}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-slate-600">Clear answers before you contact an owner or plan a visit.</p>
          </ScrollReveal>
          <div className="mt-8 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, index) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08, ease: easeOutQuart }} className="p-4 sm:p-5">
                <button type="button" onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)} className="flex w-full items-center justify-between gap-3 text-left font-display text-base font-bold text-navy sm:gap-4 sm:text-lg">
                  {faq.question}
                  <motion.span animate={{ rotate: openFaqId === faq.id ? 180 : 0 }} transition={{ duration: 0.3, ease: easeOutQuart }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-saffron/10 text-saffron">
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaqId === faq.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.35, ease: easeOutQuart }, opacity: { duration: 0.25 } }} className="overflow-hidden">
                      <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
