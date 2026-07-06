"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import PropertyCard from "../../components/PropertyCard";
import { useProperty } from "../../context/PropertyContext";
import { Property } from "../../data/mockData";

export default function SavedPropertiesPage() {
  const { properties } = useProperty();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wishlist: string[] = JSON.parse(localStorage.getItem("pgmove_wishlist") || "[]");
      const matched = properties.filter((p) => wishlist.includes(p.id));
      setSavedProperties(matched);
      setIsLoading(false);
    }
  }, [properties]);

  return (
    <div className="bg-[#F5F7FF] min-h-screen font-sans py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-purple-650 transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Search
            </Link>
            <h1 className="font-display text-4xl font-extrabold text-[#1E1B2E] tracking-tight flex items-center gap-2.5">
              <Heart className="h-8 w-8 text-red-500 fill-red-500" /> Saved Properties
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Manage your bookmarked paying guests, hostels & co-living options.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="h-8 w-8 border-4 border-purple-650 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-gray-500 mt-2 font-semibold">Loading your favorites...</p>
          </div>
        ) : savedProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-md text-center max-w-md mx-auto space-y-4 border border-gray-50">
            <div className="h-16 w-16 rounded-full bg-[#F5F3FF] flex items-center justify-center mx-auto text-[#7C3AED]">
              <Heart className="h-8 w-8 text-gray-300" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1E1B2E]">No saved PGs yet</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Start searching for properties in Bangalore and tap the heart icon on any listing card to keep track of them here.
            </p>
            <Link
              href="/properties"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Find Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
