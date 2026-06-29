"use client";

import Link from "next/link";
import { Building2, ChevronRight, IndianRupee, MapPin, Route, Sparkles, TrendingUp, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AreaCard from "@/components/AreaCard";
import { areas, cities, cityGuides } from "@/data/mockData";
import { easeOutQuart, staggerContainer, staggerItem } from "@/lib/animations";
import { cn, titleCase } from "@/lib/utils";

export default function CityAreasPage({ params }: { params: { city: string } }) {
  const city = params.city.toLowerCase();
  const cityAreas = areas.filter((area) => area.city === city);
  const guide = cityGuides[city];
  const [active, setActive] = useState("All");
  const visibleAreas = active === "All" ? cityAreas : cityAreas.filter((area) => area.name === active);
  const totalHomes = cityAreas.reduce((sum, area) => sum + area.propertyCount, 0);
  const lowestRent = Math.min(...cityAreas.map((area) => area.startingRent));

  return (
    <div className="pb-10 sm:pb-16">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-saffron">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/areas/hyderabad" className="hover:text-saffron">Areas</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-navy">{titleCase(city)}</span>
        </nav>
      </section>

      <motion.section className="bg-navy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: easeOutQuart }}>
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-white sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_360px] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOutQuart }}>
            <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-white">
              <MapPin className="h-4 w-4 text-saffron" />
              City Rental Guide
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Properties in {titleCase(city)}</h1>
            <p className="mt-4 max-w-3xl text-white/75">{guide?.summary ?? `Explore verified rental properties across ${titleCase(city)}.`}</p>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {(guide?.bestFor ?? ["PGs", "Flats", "Hostels"]).map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold sm:px-4 sm:text-sm">{item}</span>
              ))}
            </div>
          </motion.div>
          <motion.div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1" variants={staggerContainer} initial="hidden" animate="visible">
            {([
              [Building2, "Listed homes", totalHomes.toLocaleString("en-IN")],
              [IndianRupee, "Starting rent", `Rs.${lowestRent.toLocaleString("en-IN")}`],
              [Users, "Popular areas", `${cityAreas.length}+`],
            ] as const).map(([Icon, label, value]) => (
              <motion.div key={label} variants={staggerItem} className="rounded-md border border-white/15 bg-white/10 p-4">
                <Icon className="h-5 w-5 text-saffron" />
                <p className="mt-2 text-sm text-white/65">{label}</p>
                <p className="font-display text-2xl font-bold">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy sm:text-2xl"><TrendingUp className="h-5 w-5 text-saffron sm:h-6 sm:w-6" />Popular Searches in {titleCase(city)}</h2>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
          {cityAreas.slice(0, 6).map((area, index) => (
            <Link key={area.slug} href={`/properties?type=${index % 2 ? "flat" : "pg"}&area=${encodeURIComponent(area.name)}&city=${area.city}`} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition-all duration-200 hover:text-saffron">
              {index % 2 ? "Flats" : "PG"} in {area.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Explore Other Cities</h2>
        <motion.div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0" variants={staggerContainer} initial="hidden" animate="visible">
          {cities.map((item) => (
            <motion.div key={item} variants={staggerItem} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Link href={`/areas/${item}`} className={cn("block shrink-0 rounded-md px-4 py-2 font-bold transition-all duration-200", item === city ? "bg-navy text-white" : "bg-white text-navy hover:bg-saffron/10")}>{titleCase(item)}</Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {guide && (
        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOutQuart }} className="rounded-md bg-white p-4 shadow-sm sm:p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy sm:text-2xl"><IndianRupee className="h-5 w-5 text-saffron sm:h-6 sm:w-6" />Average Rent</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {([
                ["PG", guide.averageRent.pg],
                ["Flat", guide.averageRent.flat],
                ["Hostel", guide.averageRent.hostel],
              ] as const).map(([label, rent]) => (
                <div key={label} className="rounded-md border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-500">{label}</p>
                  <p className="mt-1 font-display text-xl font-bold text-navy">Rs.{Number(rent).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOutQuart }} className="rounded-md bg-white p-4 shadow-sm sm:p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy sm:text-2xl"><Route className="h-5 w-5 text-saffron sm:h-6 sm:w-6" />Commute Notes</h2>
            <div className="mt-4 space-y-3">
              {guide.commute.map((item) => (
                <p key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />{item}</p>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0" variants={staggerContainer} initial="hidden" animate="visible">
          {["All", ...cityAreas.map((area) => area.name)].map((area) => (
            <motion.button key={area} variants={staggerItem} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} onClick={() => setActive(area)} className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200", active === area ? "bg-navy text-white" : "bg-white text-navy hover:bg-saffron/10")}>{area}</motion.button>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={active} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" animate="visible" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: easeOutQuart }}>
            {visibleAreas.map((area) => (
              <motion.div key={area.slug} variants={staggerItem} whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(26,60,94,0.10)" }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.2 }}>
                <AreaCard area={area} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

    </div>
  );
}
