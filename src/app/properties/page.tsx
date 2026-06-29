import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { properties } from "@/data/mockData";
import { titleCase } from "@/lib/utils";

type PropertySearchParams = {
  city?: string;
  area?: string;
  type?: string;
  budget?: string;
};

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function normalizeType(value?: string) {
  return normalize(value).replace(/[^a-z0-9]/g, "");
}

function matchesBudget(rent: number, budget: string) {
  if (!budget) return true;
  if (budget.includes("3k-5k")) return rent >= 3000 && rent <= 5000;
  if (budget.includes("5k-10k")) return rent >= 5000 && rent <= 10000;
  if (budget.includes("10k-20k")) return rent >= 10000 && rent <= 20000;
  if (budget.includes("20k+")) return rent >= 20000;
  return true;
}

export default function PropertiesPage({ searchParams }: { searchParams?: PropertySearchParams }) {
  const city = normalize(searchParams?.city);
  const area = normalize(searchParams?.area);
  const type = normalizeType(searchParams?.type);
  const budget = normalize(searchParams?.budget);

  const filtered = properties.filter((property) => {
    if (city && property.city !== city) return false;
    if (area && !property.area.toLowerCase().includes(area)) return false;
    if (type && normalizeType(property.type) !== type) return false;
    if (!matchesBudget(property.rent, budget)) return false;
    return true;
  });
  const hasFilters = Boolean(city || area || type || budget);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-saffron transition-all duration-200 hover:-translate-x-1 hover:text-navy">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">{city ? `Properties in ${titleCase(city)}` : "All Properties"}</h1>
      <p className="mt-3 text-slate-600">
        {hasFilters ? `${filtered.length} matching ${filtered.length === 1 ? "property" : "properties"} found.` : "Browse verified PGs, flats, hostels, co-living spaces, and rooms."}
      </p>

      <div className="mt-8">
        <SearchBar
          key={`${city}-${area}-${type}-${budget}`}
          initialSearch={{
            city: city || undefined,
            area: searchParams?.area,
            type: searchParams?.type,
            budget: searchParams?.budget,
          }}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {filtered.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-dashed border-slate-300 bg-white p-5 text-center sm:p-8">
          <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">No properties found</h2>
          <p className="mt-2 text-slate-600">Try changing the city, area, property type, or budget filter.</p>
        </div>
      )}
    </section>
  );
}
