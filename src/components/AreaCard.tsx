"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Building, Building2, Landmark, Home, Hotel } from "lucide-react";

interface AreaCardProps {
  name: string;
  pgCount: number;
}

export default function AreaCard({ name, pgCount }: AreaCardProps) {
  // Map locality to a specific consistent Lucide icon
  const getAreaIcon = (area: string) => {
    const iconProps = { className: "h-6 w-6 text-[#7C3AED]", strokeWidth: 2 };
    switch (area) {
      case "Koramangala":
        return <Building2 {...iconProps} />;
      case "Whitefield":
        return <Building {...iconProps} />;
      case "HSR Layout":
        return <Home {...iconProps} />;
      case "Marathahalli":
        return <Hotel {...iconProps} />;
      case "Indiranagar":
        return <Landmark {...iconProps} />;
      default:
        return <MapPin {...iconProps} />;
    }
  };

  return (
    <Link
      href={`/properties?area=${encodeURIComponent(name)}`}
      className="group block p-6 bg-white rounded-2xl border border-transparent shadow-md hover:shadow-xl hover:border-[#E8E3FF] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative faint purple circle/blob peeking from bottom-right */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#F5F3FF]/50 group-hover:scale-125 transition-transform duration-500 -z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Top bar with Badge and Arrow */}
        <div className="flex items-center justify-between">
          {/* Top-left: Icon badge */}
          <div className="h-12 w-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center shrink-0">
            {getAreaIcon(name)}
          </div>

          {/* Top-right: Circular arrow link */}
          <div className="h-8 w-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#7C3AED] group-hover:text-white flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Locality text and count */}
        <div className="space-y-1">
          <h3 className="font-display font-semibold text-[#1E1B2E] text-lg group-hover:text-[#7C3AED] transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-[#6B7280] font-medium">
            {pgCount} Properties Available
          </p>
        </div>
      </div>
    </Link>
  );
}
