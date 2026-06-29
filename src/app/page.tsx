"use client";

import Link from "next/link";
import { BedDouble, Building2, ChevronDown, DoorOpen, Handshake, Home, Star, User, Users } from "lucide-react";
import { IconAward, IconEye, IconKey, IconLock, IconMessageCircle, IconPhoneCall, IconSearch, IconShieldCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AreaCard from "@/components/AreaCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";
import SearchBar from "@/components/SearchBar";
import { areas, properties } from "@/data/mockData";
import { easeOutQuart, staggerContainer, staggerItem } from "@/lib/animations";
import { cn, titleCase } from "@/lib/utils";

const quickPills = [
  { label: "PG in Hyderabad", href: "/properties?city=hyderabad&type=PG" },
  { label: "Flats in Bangalore", href: "/properties?city=bangalore&type=Flat" },
  { label: "Hostels in Mumbai", href: "/properties?city=mumbai&type=Hostel" },
  { label: "Co-Living in Pune", href: "/properties?city=pune&type=Co-Living" },
];
const cityTabs = ["hyderabad", "bangalore", "mumbai", "pune", "chennai"];
const propertyTypes = [
  [Building2, "Apartments"],
  [Home, "Independent House"],
  [Users, "PG Accommodation"],
  [BedDouble, "Hostels"],
  [Handshake, "Co-Living"],
  [DoorOpen, "Shared Room"],
] as const;
const tenantSteps = [
  { icon: IconSearch, label: "Search", description: "Find verified homes by city, area, type, and budget." },
  { icon: IconEye, label: "Explore", description: "Compare photos, amenities, rent, and owner details." },
  { icon: IconPhoneCall, label: "Connect", description: "Call or message owners directly without middlemen." },
  { icon: IconKey, label: "Move In", description: "Visit, confirm details, and plan your move with confidence." },
] as const;
const whyFeatures = [
  { icon: IconShieldCheck, label: "Verified Listings", description: "Properties checked for genuine details.", accent: "#F5A623", tile: "#FEF3E2" },
  { icon: IconLock, label: "Secure Bookings", description: "Track requests before you commit.", accent: "#22C55E", tile: "#EAF8EF" },
  { icon: IconMessageCircle, label: "Direct Contact", description: "Talk to owners on call or WhatsApp.", accent: "#3B82F6", tile: "#EAF2FF" },
  { icon: IconAward, label: "Best Deals", description: "Compare rent and negotiate directly.", accent: "#EC4899", tile: "#FCEAF3" },
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
  const [activeCity, setActiveCity] = useState("hyderabad");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const featured = properties.filter((property) => property.isFeatured).slice(0, 3);
  const activeAreas = areas.filter((area) => area.city === activeCity);

  return (
    <div>
      <section className="bg-gradient-to-br from-navy to-teal text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.p
              className="text-xs font-bold tracking-[0.12em] text-white/75 sm:text-sm sm:tracking-[0.18em]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutQuart }}
            >
              INDIA&apos;S TRUSTED RENTAL PLATFORM
            </motion.p>
            <motion.h1
              className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeOutQuart }}
            >
              Find Your Next Home With Ease
            </motion.h1>
            <motion.p
              className="mt-4 text-base leading-7 text-white/85 sm:mt-5 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: easeOutQuart }}
            >
              Search verified PGs, flats, hostels, and co-living spaces across India.
            </motion.p>
          </div>
          <motion.div
            className="mx-auto mt-8 max-w-6xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.4, ease: easeOutQuart }}
          >
            <SearchBar />
          </motion.div>
          <motion.div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3" initial="hidden" animate="visible" variants={staggerContainer}>
            {quickPills.map((pill) => (
              <motion.div key={pill.label} variants={staggerItem} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}>
                <Link href={pill.href} className="inline-flex rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-white/25 sm:px-4 sm:text-sm">{pill.label}</Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-8 grid gap-3 text-center sm:mt-10 sm:grid-cols-3 sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: easeOutQuart }}
          >
            {[
              ["Properties", 10000],
              ["Cities", 50],
              ["Tenants", 25000],
            ].map(([label, target]) => (
              <div key={label as string} className="rounded-md bg-white/10 px-4 py-3 font-display text-lg font-bold sm:px-5 sm:py-4 sm:text-xl">
                <AnimatedCounter target={target as number} suffix="+" /> {label as string}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.12em] text-saffron sm:text-sm sm:tracking-[0.16em]">EXPLORE BY LOCATION</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">Explore Properties by Area</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {cityTabs.map((city) => (
              <motion.button key={city} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} onClick={() => setActiveCity(city)} className={cn("shrink-0 rounded-md px-4 py-2 text-sm font-bold transition-all duration-200", activeCity === city ? "bg-saffron text-white" : "bg-white text-navy hover:bg-saffron/10")}>{titleCase(city)}</motion.button>
            ))}
          </ScrollReveal>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCity}
            className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOutQuart }}
          >
            {activeAreas.map((area) => (
              <motion.div key={area.slug} variants={staggerItem} whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(26,60,94,0.10)" }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.2 }}>
                <AreaCard area={area} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">What are you looking for?</h2>
          </ScrollReveal>
          <motion.div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {propertyTypes.map(([Icon, label]) => (
              <motion.div key={label} variants={staggerItem} whileHover={{ y: -4, boxShadow: "0 4px 16px rgba(245,166,35,0.12)" }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                <Link href={`/properties?type=${encodeURIComponent(label.replace(" Accommodation", "").replace("Apartments", "Flat").replace("Independent House", "Room").replace("Shared Room", "Room"))}`} className="block rounded-md border border-slate-200 bg-white p-4 text-center transition-all duration-200 hover:border-saffron sm:p-5">
                  <motion.span className="block" whileHover={{ scale: 1.15 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                    <Icon className="mx-auto h-8 w-8 text-navy" />
                  </motion.span>
                  <span className="mt-3 block text-sm font-bold text-slate-700">{label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Featured Properties Near You</h2>
          </ScrollReveal>
          <span className="hidden items-center gap-2 rounded-full bg-saffron/15 px-4 py-2 text-sm font-bold text-saffron sm:inline-flex"><Star className="h-4 w-4 fill-saffron" />Top Rated</span>
        </div>
        <motion.div className="mt-8 grid gap-6 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          {featured.map((property) => (
            <motion.div key={property.id} variants={staggerItem} whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(26,60,94,0.12)" }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.2 }}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">How <span className="text-saffron">GharStay</span> Works</h2>
            </ScrollReveal>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-4">
            {tenantSteps.map(({ icon: Icon, label, description }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, boxShadow: "0 14px 34px rgba(26,60,94,0.10)" }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: easeOutQuart }}
                className="relative rounded-md border-[0.5px] border-slate-200 bg-white p-5 text-center sm:rounded-2xl sm:p-6"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8920A] font-display text-base font-bold text-white shadow-[0_8px_22px_rgba(245,166,35,0.32)]">{index + 1}</span>
                <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FEF3E2] text-saffron">
                  <Icon size={30} stroke={1.8} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                {index < tenantSteps.length - 1 && <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease: easeOutQuart }} style={{ transformOrigin: "left" }} className="absolute left-[62%] top-11 hidden w-[86%] border-t-2 border-dashed border-[#F5A623]/70 lg:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Why <span className="text-saffron">GharStay</span></h2>
        </ScrollReveal>
        <motion.div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          {whyFeatures.map(({ icon: Icon, label, description, accent, tile }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              whileHover={{ y: -3, boxShadow: "0 14px 34px rgba(26,60,94,0.10)" }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-md border-[0.5px] border-slate-200 bg-white p-5 shadow-sm sm:rounded-2xl sm:p-6"
            >
              <div className="mb-5 h-[3px] rounded-full" style={{ backgroundColor: accent }} />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: tile, color: accent }}>
                <Icon size={26} stroke={1.8} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </motion.div>
          ))}
        </motion.div>
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

      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">Loved by Tenants</h2>
          </ScrollReveal>
          <motion.div className="mt-8 grid gap-6 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {["Priya S.", "Arjun M.", "Nisha R."].map((name) => (
              <motion.article key={name} variants={staggerItem} whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(26,60,94,0.08)" }} transition={{ duration: 0.2 }} className="rounded-md border border-slate-200 p-5 sm:p-6">
                <div className="flex gap-1 text-saffron">{Array.from({ length: 5 }).map((_, i) => <motion.span key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.3, ease: "backOut" }}><Star className="h-4 w-4 fill-saffron" /></motion.span>)}</div>
                <p className="mt-4 text-slate-600">Found a verified place in two days, with direct owner contact and clear rent details.</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white"><User className="h-5 w-5" /></span>
                  <span className="font-bold text-navy">{name}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
