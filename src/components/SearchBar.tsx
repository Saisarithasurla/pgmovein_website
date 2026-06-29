"use client";

import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { cities } from "@/data/mockData";
import { titleCase } from "@/lib/utils";

type SearchValues = {
  city?: string;
  area?: string;
  type?: string;
  budget?: string;
};

export default function SearchBar({ initialSearch }: { initialSearch?: SearchValues }) {
  const router = useRouter();
  const [search, setSearch] = useState({
    city: initialSearch?.city || "",
    area: initialSearch?.area || "",
    type: initialSearch?.type || "",
    budget: initialSearch?.budget || "",
  });

  const update = (key: keyof typeof search, value: string) => setSearch((current) => ({ ...current, [key]: value }));

  return (
    <form
      className="grid gap-3 rounded-md bg-white p-3 shadow-md md:grid-cols-[1fr_1.2fr_1fr_1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        Object.entries(search).forEach(([key, value]) => {
          if (value.trim()) params.set(key, value.trim());
        });
        router.push(`/properties?${params.toString()}`);
      }}
    >
      <label className="flex min-h-11 items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-slate-700">
        <MapPin className="h-5 w-5 text-saffron" />
        <span className="sr-only">City</span>
        <select value={search.city} onChange={(event) => update("city", event.target.value)} className="w-full min-w-0 bg-transparent text-sm outline-none">
          <option value="">All</option>
          {cities.map((city) => (
            <option key={city} value={city}>{titleCase(city)}</option>
          ))}
        </select>
      </label>
      <label className="flex min-h-11 items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-slate-700">
        <Search className="h-5 w-5 text-saffron" />
        <span className="sr-only">Area</span>
        <input value={search.area} onChange={(event) => update("area", event.target.value)} placeholder="Search area" className="w-full min-w-0 bg-transparent text-sm outline-none" />
      </label>
      <label className="flex min-h-11 items-center rounded-md border border-slate-200 px-3 py-2">
        <span className="sr-only">Property Type</span>
        <select value={search.type} onChange={(event) => update("type", event.target.value)} className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none">
          <option value="">Any Type</option>
          {["PG", "Flat", "Hostel", "Co-Living", "Room"].map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label className="flex min-h-11 items-center rounded-md border border-slate-200 px-3 py-2">
        <span className="sr-only">Budget</span>
        <select value={search.budget} onChange={(event) => update("budget", event.target.value)} className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none">
          <option value="">Any Budget</option>
          {["₹3k-5k", "₹5k-10k", "₹10k-20k", "20k+"].map((budget) => <option key={budget}>{budget}</option>)}
        </select>
      </label>
      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-saffron px-5 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5">
        <Search className="h-5 w-5" />
        Search
      </button>
    </form>
  );
}
