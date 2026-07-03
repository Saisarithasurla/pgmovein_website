"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

interface AreaCardProps {
  name: string;
  pgCount: number;
}

const areaImages: Record<string, string> = {
  "Koramangala": "/areas/koramangala.png",
  "Whitefield": "/areas/whitefield.png",
  "HSR Layout": "/areas/hsr-layout.png",
  "Marathahalli": "/areas/marathahalli.png",
  "Indiranagar": "/areas/indiranagar.png",
  "Electronic City": "/areas/electronic-city.png",
  "BTM Layout": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
  "Bellandur": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
};

export default function AreaCard({ name, pgCount }: AreaCardProps) {
  const bgImage = areaImages[name] || null;

  return (
    <Link
      href={`/properties?area=${encodeURIComponent(name)}`}
      className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
      style={{ minHeight: "180px" }}
    >
      {/* Background image */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Gradient overlay — darkens bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/80 transition-all duration-300" />

      {/* Top-right arrow */}
      <div className="absolute top-3 right-3 z-10">
        <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-white group-hover:bg-[#7C3AED] flex items-center justify-center transition-all duration-300 border border-white/30">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Bottom content: name + count */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col gap-0.5">
        <h3 className="font-display font-bold text-white text-lg leading-tight drop-shadow-sm group-hover:text-purple-200 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-xs text-white/80 font-medium flex items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0" />
          {pgCount} Properties Available
        </p>
      </div>
    </Link>
  );
}
