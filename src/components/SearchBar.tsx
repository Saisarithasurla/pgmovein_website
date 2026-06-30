"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { areas } from "@/data/mockData";

type SearchValues = {
  city?: string;
  area?: string;
  type?: string;
  budget?: string;
};

export default function SearchBar({ initialSearch }: { initialSearch?: SearchValues }) {
  const router = useRouter();
  const bangaloreAreas = areas.filter((area) => area.city === "bangalore");
  const locationRef = useRef<HTMLDivElement>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [search, setSearch] = useState({
    city: "bangalore",
    area: initialSearch?.area || "",
    type: initialSearch?.type || "",
    budget: initialSearch?.budget || "",
  });

  const update = (key: keyof typeof search, value: string) => setSearch((current) => ({ ...current, [key]: value }));
  const updateLocation = (value: string) => {
    setSearch((current) => ({ ...current, city: "bangalore", area: value }));
    setLocationOpen(false);
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!locationRef.current?.contains(event.target as Node)) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <form
      className="grid gap-2 rounded-2xl border border-violet-100 bg-white p-2 shadow-[0_18px_44px_rgba(36,17,63,0.10)] md:grid-cols-[1.2fr_1fr_1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        Object.entries({ ...search, city: "bangalore" }).forEach(([key, value]) => {
          if (value.trim()) params.set(key, value.trim());
        });
        router.push(`/properties?${params.toString()}`);
      }}
    >
      <div ref={locationRef} className="relative">
        <button
          type="button"
          aria-expanded={locationOpen}
          aria-haspopup="listbox"
          onClick={() => setLocationOpen((current) => !current)}
          className="flex min-h-14 w-full items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-left text-slate-700 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-200"
        >
          <MapPin className="h-5 w-5 text-saffron" />
          <span className="min-w-0 flex-1 truncate text-sm">{search.area || "All"}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`} />
        </button>
        {locationOpen && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-40 max-h-72 w-full overflow-y-auto rounded-xl border border-violet-100 bg-white p-2 text-sm shadow-[0_18px_40px_rgba(36,17,63,0.16)]" role="listbox">
            <button type="button" onClick={() => updateLocation("")} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-navy transition-colors hover:bg-violet-50">
              All
            </button>
            {bangaloreAreas.map((area) => (
              <button key={area.slug} type="button" onClick={() => updateLocation(area.name)} className="block w-full rounded-lg px-3 py-2 text-left text-slate-600 transition-colors hover:bg-violet-50 hover:text-saffron">
                {area.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <label className="flex min-h-14 items-center rounded-xl bg-slate-50 px-4 py-3 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-200">
        <span className="sr-only">Property Type</span>
        <select value={search.type} onChange={(event) => update("type", event.target.value)} className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none">
          <option value="">Select Stay Type</option>
          {["PG", "Flat", "Hostel", "Co-Living", "Room"].map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label className="flex min-h-14 items-center rounded-xl bg-slate-50 px-4 py-3 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-200">
        <span className="sr-only">Budget</span>
        <select value={search.budget} onChange={(event) => update("budget", event.target.value)} className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none">
          <option value="">Any Budget</option>
          {["₹3k-5k", "₹5k-10k", "₹10k-20k", "20k+"].map((budget) => <option key={budget}>{budget}</option>)}
        </select>
      </label>
      <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-saffron px-7 py-3 font-bold text-white shadow-[0_12px_26px_rgba(124,58,237,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700">
        <Search className="h-5 w-5" />
        Search
      </button>
    </form>
  );
}
