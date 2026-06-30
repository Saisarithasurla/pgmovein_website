import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { areas, properties, type Property } from "@/data/mockData";
import { titleCase } from "@/lib/utils";

type PropertySearchParams = {
  city?: string;
  area?: string;
  type?: string;
  budget?: string;
  audience?: string;
  maxBudget?: string;
  featured?: string;
  q?: string;
  sort?: string;
};

const propertyTypeOptions = [
  ["", "Any Type"],
  ["PG", "PG"],
  ["Hostel", "Hostel"],
  ["Flat", "Flat"],
  ["Co-Living", "Co-Living"],
  ["Room", "Room"],
] as const;

const audienceOptions = [
  ["", "Any / All"],
  ["Male", "Boys / Men"],
  ["Female", "Girls / Women"],
  ["Unisex", "Co-Living / Unisex"],
  ["Family", "Family"],
] as const;

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function normalizeType(value?: string) {
  return normalize(value).replace(/[^a-z0-9]/g, "");
}

function sortProperties(items: Property[], sort: string) {
  if (sort === "rent-low") return [...items].sort((a, b) => a.rent - b.rent);
  if (sort === "rent-high") return [...items].sort((a, b) => b.rent - a.rent);
  if (sort === "rating") return [...items].sort((a, b) => b.rating - a.rating);
  return [...items].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}

export default function PropertiesPage({ searchParams }: { searchParams?: PropertySearchParams }) {
  const city = normalize(searchParams?.city) || "bangalore";
  const area = searchParams?.area?.trim() ?? "";
  const type = searchParams?.type?.trim() ?? "";
  const audience = searchParams?.audience?.trim() ?? "";
  const q = searchParams?.q?.trim() ?? "";
  const sort = searchParams?.sort?.trim() || "featured";
  const maxBudget = Number(searchParams?.maxBudget || "30000");
  const featuredOnly = searchParams?.featured === "true";
  const bangaloreAreas = areas.filter((item) => item.city === "bangalore");

  const filtered = sortProperties(
    properties.filter((property) => {
      const query = normalize(q);
      if (property.city !== city) return false;
      if (area && property.area !== area) return false;
      if (type && normalizeType(property.type) !== normalizeType(type)) return false;
      if (audience && property.audience !== audience) return false;
      if (featuredOnly && !property.isFeatured) return false;
      if (property.rent > maxBudget) return false;
      if (query && !`${property.name} ${property.area} ${property.type} ${property.highlights?.join(" ") ?? ""}`.toLowerCase().includes(query)) return false;
      return true;
    }),
    sort,
  );

  return (
    <section className="bg-[#f6f8fb]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-saffron transition-all duration-200 hover:-translate-x-1 hover:text-navy">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            {type ? `${type} stays in ${titleCase(city)}` : `Properties in ${titleCase(city)}`}
          </h1>
          <p className="mt-3 text-slate-600">
            {filtered.length} matching {filtered.length === 1 ? "property" : "properties"} found with your current filters.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-navy">Filters</h2>
              <Link href="/properties?city=bangalore" className="text-sm font-bold text-saffron">
                Reset All
              </Link>
            </div>

            <form className="mt-6 space-y-6">
              <input type="hidden" name="city" value="bangalore" />
              <input type="hidden" name="q" value={q} />
              <input type="hidden" name="sort" value={sort} />

              <label className="block">
                <span className="font-display text-sm font-bold text-navy">Area / Locality</span>
                <select name="area" defaultValue={area} className="mt-3 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none focus:border-saffron focus:ring-2 focus:ring-violet-100">
                  <option value="">All Areas</option>
                  {bangaloreAreas.map((item) => (
                    <option key={item.slug} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="font-display text-sm font-bold text-navy">Property Type</span>
                <select name="type" defaultValue={type} className="mt-3 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-700 outline-none focus:border-saffron focus:ring-2 focus:ring-violet-100">
                  {propertyTypeOptions.map(([value, label]) => (
                    <option key={label} value={value}>{label}</option>
                  ))}
                </select>
              </label>

              <div>
                <span className="font-display text-sm font-bold text-navy">Preferred Tenant</span>
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  {audienceOptions.map(([value, label]) => (
                    <label key={label} className="flex items-center gap-2">
                      <input type="radio" name="audience" value={value} defaultChecked={audience === value} className="h-4 w-4 accent-saffron" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="flex items-center justify-between gap-4 font-display text-sm font-bold text-navy">
                  Max Budget
                  <span className="text-saffron">Rs.{maxBudget.toLocaleString("en-IN")}/mo</span>
                </span>
                <input type="range" name="maxBudget" min="3000" max="50000" step="500" defaultValue={maxBudget} className="mt-4 w-full accent-saffron" />
                <span className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
                  <span>Rs.3,000</span>
                  <span>Rs.50,000+</span>
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm font-bold text-navy">
                <input type="checkbox" name="featured" value="true" defaultChecked={featuredOnly} className="h-4 w-4 rounded accent-saffron" />
                Featured Properties
                <span className="text-yellow-400">★</span>
              </label>

              <button className="w-full rounded-xl bg-saffron px-4 py-3 font-bold text-white shadow-[0_10px_24px_rgba(124,58,237,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700">
                Apply Filters
              </button>
            </form>
          </aside>

          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <form className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                <input type="hidden" name="city" value="bangalore" />
                <input type="hidden" name="area" value={area} />
                <input type="hidden" name="type" value={type} />
                <input type="hidden" name="audience" value={audience} />
                <input type="hidden" name="maxBudget" value={maxBudget} />
                {featuredOnly && <input type="hidden" name="featured" value="true" />}
                <label className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 text-slate-700 focus-within:border-saffron focus-within:ring-2 focus-within:ring-violet-100">
                  <Search className="h-5 w-5 text-saffron" />
                  <span className="sr-only">Search locality, landmark, or area</span>
                  <input name="q" defaultValue={q} placeholder="Search locality, landmark, or area..." className="w-full bg-transparent outline-none" />
                </label>
                <label className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 text-slate-700">
                  <span className="shrink-0 text-sm font-medium">Sort By:</span>
                  <select name="sort" defaultValue={sort} className="bg-transparent outline-none">
                    <option value="featured">Featured First</option>
                    <option value="rating">Top Rated</option>
                    <option value="rent-low">Rent: Low to High</option>
                    <option value="rent-high">Rent: High to Low</option>
                  </select>
                </label>
                <button className="rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5">
                  Search
                </button>
              </form>
            </div>

            {filtered.length > 0 ? (
              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                {filtered.map((property) => <PropertyCard key={property.id} property={property} />)}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <h2 className="font-display text-2xl font-bold text-navy">No properties found</h2>
                <p className="mt-2 text-slate-600">Try changing the area, property type, tenant preference, or budget.</p>
                <Link href="/properties?city=bangalore" className="mt-5 inline-flex rounded-xl bg-saffron px-5 py-3 font-bold text-white">
                  Reset Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
