"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowUpRight, Search, Home, ChevronRight } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

const allAreas = [
  { name: "Koramangala", count: 24, tag: "IT Hub", image: "/areas/koramangala.png", desc: "Vibrant startup zone with cafes, tech offices & great connectivity." },
  { name: "Whitefield", count: 18, tag: "Tech Park", image: "/areas/whitefield.png", desc: "Major IT corridor with top MNC campuses and modern infrastructure." },
  { name: "HSR Layout", count: 20, tag: "Residential", image: "/areas/hsr-layout.png", desc: "Well-planned residential hub favoured by tech professionals & families." },
  { name: "Marathahalli", count: 15, tag: "ORR Corridor", image: "/areas/marathahalli.png", desc: "Bustling commercial area on Outer Ring Road close to major IT parks." },
  { name: "Indiranagar", count: 12, tag: "Upscale", image: "/areas/indiranagar.png", desc: "Trendy neighbourhood with top restaurants, pubs and shopping streets." },
  { name: "Electronic City", count: 16, tag: "IT Hub", image: "/areas/electronic-city.png", desc: "Home to Infosys, Wipro & hundreds of tech companies on NICE Road." },
  { name: "BTM Layout", count: 22, tag: "Budget-Friendly", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80", desc: "Popular among students & freshers with affordable PG options." },
  { name: "Bellandur", count: 14, tag: "Growing Hub", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", desc: "Rapidly expanding area near Sarjapur Road with modern apartments." },
  { name: "Sarjapur Road", count: 11, tag: "Emerging", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", desc: "Fast-developing corridor connecting Electronic City and Whitefield." },
  { name: "JP Nagar", count: 9, tag: "Residential", image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80", desc: "South Bangalore's premier residential area with great metro access." },
  { name: "Hebbal", count: 8, tag: "North BLR", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80", desc: "Rapidly growing north Bangalore hub near airport and Manyata Tech Park." },
  { name: "Yeshwanthpur", count: 7, tag: "Industrial", image: "https://images.unsplash.com/photo-1514565131-fce0801e6785?w=600&q=80", desc: "Key industrial and commercial zone with excellent rail connectivity." },
];

const tagColors: Record<string, string> = {
  "IT Hub": "bg-purple-100 text-purple-700",
  "Tech Park": "bg-blue-100 text-blue-700",
  "Residential": "bg-green-100 text-green-700",
  "ORR Corridor": "bg-orange-100 text-orange-700",
  "Upscale": "bg-pink-100 text-pink-700",
  "Budget-Friendly": "bg-yellow-100 text-yellow-700",
  "Growing Hub": "bg-teal-100 text-teal-700",
  "Emerging": "bg-cyan-100 text-cyan-700",
  "North BLR": "bg-indigo-100 text-indigo-700",
  "Industrial": "bg-gray-100 text-gray-700",
};

export default function AllAreasPage() {
  const [search, setSearch] = useState("");

  const filtered = allAreas.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF] font-sans">
      {/* Hero Banner — matches homepage hero */}
      <section className="relative overflow-hidden bg-[#F5F7FF] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Purple blur blobs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-200/20 blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 rounded-full bg-purple-200/10 blur-3xl -z-0 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-gray-400 text-sm mb-6">
            <Link href="/" className="hover:text-purple-600 flex items-center gap-1 transition-colors">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-600 font-medium">All Areas</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider shadow-sm mb-5 select-none">
            <MapPin className="h-3.5 w-3.5" />
            Bangalore, Karnataka
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1B2E] tracking-tight leading-tight mb-4">
            Explore All <span className="text-purple-600">Areas</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Browse verified PGs across Bangalore&apos;s top neighbourhoods. Filter by area, find your fit.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search an area…"
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white text-gray-800 placeholder-gray-400 text-sm font-medium shadow-xl outline-none focus:ring-2 focus:ring-purple-500 transition border border-purple-100"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-purple-500" />
            <strong className="text-gray-900">{allAreas.length}</strong> Areas Listed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
            <strong className="text-gray-900">{allAreas.reduce((s, a) => s + a.count, 0)}+</strong> Properties Available
          </span>
          {search && (
            <span className="ml-auto text-purple-600">
              Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
            </span>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No areas found for &quot;{search}&quot;</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((area, idx) => (
              <ScrollReveal key={area.name} variant="scale" delay={idx * 60}>
                <Link
                  href={`/properties?area=${encodeURIComponent(area.name)}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-white"
                  style={{ minHeight: "220px" }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${area.image})` }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent group-hover:from-black/85 transition-all duration-300" />

                  {/* Tag badge top-left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tagColors[area.tag] ?? "bg-white/20 text-white"} backdrop-blur-sm`}>
                      {area.tag}
                    </span>
                  </div>

                  {/* Arrow top-right */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white group-hover:bg-[#7C3AED] flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                    <h2 className="font-bold text-white text-lg leading-tight group-hover:text-purple-200 transition-colors duration-300 drop-shadow-sm">
                      {area.name}
                    </h2>
                    <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{area.desc}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <MapPin className="h-3 w-3 text-purple-300 shrink-0" />
                      <span className="text-xs text-white/80 font-semibold">{area.count} Properties Available</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Can&apos;t find your area?</h2>
          <p className="text-gray-500 text-sm mb-6">Browse all available PGs and filter by your preferred location.</p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-purple-100 hover:-translate-y-0.5 transition-all text-sm"
          >
            View All Properties <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
