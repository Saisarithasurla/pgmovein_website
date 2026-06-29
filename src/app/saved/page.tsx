"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/mockData";

const savedKey = "gharstay_saved_properties";

function readSaved() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(savedKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export default function SavedPropertiesPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSavedIds(readSaved());
    sync();
    window.addEventListener("gharstay:saved-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("gharstay:saved-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const savedProperties = properties.filter((property) => savedIds.includes(property.id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-md bg-rose-50 px-3 py-1 text-sm font-bold text-rose-600">
            <Heart className="h-4 w-4 fill-current" />
            Saved Properties
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">Your Shortlist</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Keep your favorite homes in one place while you compare rent, location, and owner details.</p>
        </div>
        <Link href="/properties" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-saffron px-4 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 sm:w-auto">
          <Search className="h-5 w-5" />
          Browse More
        </Link>
      </div>

      {savedProperties.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {savedProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-dashed border-slate-300 bg-white p-5 text-center sm:p-8">
          <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">No saved properties yet</h2>
          <p className="mt-2 text-slate-600">Tap the heart on any listing to add it here.</p>
        </div>
      )}
    </section>
  );
}
