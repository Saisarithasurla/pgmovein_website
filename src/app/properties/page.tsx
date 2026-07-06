"use client";

import React, { useState, useRef } from "react";
import PropertyCard from "../../components/PropertyCard";
import PropertyCardSkeleton from "../../components/PropertyCardSkeleton";
import { useProperty, Filters } from "../../context/PropertyContext";
import { BANGALORE_AREA_GROUPS, BUDGET_RANGES } from "../../data/mockData";
import { SlidersHorizontal, Grid, List, Map, X, HelpCircle, Star, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLead } from "../../context/LeadContext";


export default function SearchResultsPage() {
  const { filteredProperties, filters, setFilters, isPending, clearFilters } = useProperty();
  const { openPopup } = useLead();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set());
  const mobileMapRef = useRef<HTMLDivElement>(null);

  const amenitiesList = [
    { label: "Wi-Fi", value: "Wifi" },
    { label: "AC", value: "AC" },
    { label: "Food Included", value: "Food" },
    { label: "Parking", value: "Parking" },
    { label: "Gym", value: "Gym" },
    { label: "CCTV", value: "CCTV" },
    { label: "Laundry", value: "Laundry" }
  ];

  const handleCheckboxChange = (
    category: keyof Omit<Filters, "sortBy" | "searchQuery">,
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: nextValues };
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const toggleMapView = () => {
    const next = !showMapView;
    setShowMapView(next);
    if (next) {
      setTimeout(() => {
        mobileMapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const activeFiltersCount =
    filters.areas.length +
    filters.budgets.length +
    filters.genders.length +
    filters.sharings.length +
    filters.amenities.length;

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Results Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {isPending ? "Filtering PGs..." : "PGs Found in Bangalore"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing verified paying guests, hostels &amp; co-living options
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* View Mode Toggles */}
            <div className="border border-gray-200 rounded-xl p-1 flex items-center gap-1 bg-gray-50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-purple-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-purple-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>


            {/* Mobile Filters Trigger */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid gap-8 pt-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">

          {/* 1. Sidebar Filters — Desktop only */}
          <aside className="hidden md:block md:col-span-1 space-y-6 self-start sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-150">
              <span className="font-bold text-gray-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-purple-600" /> Filters
              </span>
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="text-xs font-semibold text-purple-600 hover:text-purple-800">
                  Clear All
                </button>
              )}
            </div>

            {/* Area Filter */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 text-sm">Location / Area</h3>
              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {BANGALORE_AREA_GROUPS.map((group) => {
                  const isExpanded = expandedAreas.has(group.name);
                  const isParentChecked = filters.areas.includes(group.name);
                  return (
                    <div key={group.name}>
                      {/* Parent row */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`area-${group.name}`}
                          checked={isParentChecked}
                          onChange={() => handleCheckboxChange("areas", group.name)}
                          className="rounded text-purple-600 focus:ring-purple-500 border-gray-300 flex-shrink-0"
                        />
                        <label
                          htmlFor={`area-${group.name}`}
                          className="flex-1 text-sm text-gray-700 font-normal cursor-pointer select-none"
                        >
                          {group.name}
                        </label>
                        <button
                          onClick={() => {
                            const next = new Set(expandedAreas);
                            if (isExpanded) next.delete(group.name); else next.add(group.name);
                            setExpandedAreas(next);
                          }}
                          className="p-1 rounded text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors flex-shrink-0"
                          title="Show sub-areas"
                        >
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                      </div>
                      {/* Sub-areas */}
                      {isExpanded && (
                        <div className="ml-5 mt-1.5 mb-1 space-y-1.5 border-l-2 border-purple-100 pl-3">
                          {group.subAreas.map((sub) => (
                            <label key={sub} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-purple-600">
                              <input
                                type="checkbox"
                                checked={filters.areas.includes(sub)}
                                onChange={() => handleCheckboxChange("areas", sub)}
                                className="rounded text-purple-600 focus:ring-purple-400 border-gray-300 flex-shrink-0"
                              />
                              <span>{sub}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Budget Range</h3>
              <div className="space-y-2">
                {BUDGET_RANGES.map((b) => (
                  <label key={b.value} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.budgets.includes(b.value)}
                      onChange={() => handleCheckboxChange("budgets", b.value)}
                      className="rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span>{b.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Gender Preference</h3>
              <div className="space-y-2">
                {[
                  { value: "Male", label: "Boys" },
                  { value: "Female", label: "Girls" },
                  { value: "Unisex", label: "Co-Living" },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.genders.includes(value)}
                      onChange={() => handleCheckboxChange("genders", value)}
                      className="rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sharing Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Sharing Type</h3>
              <div className="space-y-2">
                {["Single", "Double", "Triple"].map((sharing) => (
                  <label key={sharing} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.sharings.includes(sharing)}
                      onChange={() => handleCheckboxChange("sharings", sharing)}
                      className="rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span>{sharing} Sharing</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Amenities</h3>
              <div className="space-y-2">
                {amenitiesList.map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(item.value)}
                      onChange={() => handleCheckboxChange("amenities", item.value)}
                      className="rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* 2. Listings Area */}
          <main className="col-span-1 md:col-span-2 lg:col-span-3">
            {/* Sort & Quick info */}
            <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-xs font-semibold text-gray-500">
                {activeFiltersCount > 0 && <span>Active Filters ({activeFiltersCount})</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 uppercase">Sort By</span>
                <select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="bg-white border border-gray-200 text-sm font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Content Switcher */}
            {isPending ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-dashed border-gray-200 p-8">
                <HelpCircle className="h-16 w-16 text-purple-300 mx-auto stroke-[1.5]" />
                <h3 className="mt-4 text-lg font-bold text-gray-900">No properties found</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  We couldn&apos;t find any PGs matching your exact filters. Try relaxing area checkboxes, expanding your budget range, or clearing filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 font-bold text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-all shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    onMouseEnter={() => setHoveredPropertyId(property.id)}
                    onMouseLeave={() => setHoveredPropertyId(null)}
                    className={`${viewMode === "list" ? "flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow" : ""}`}
                  >
                    {viewMode === "list" ? (
                      <>
                        <Link
                          href={`/properties/${property.id}`}
                          className="sm:w-2/5 aspect-video sm:aspect-auto sm:h-52 overflow-hidden relative block"
                        >
                          <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                          {property.verified && (
                            <span className="absolute bottom-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                              <CheckCircle className="h-3 w-3 fill-white text-green-500" /> VERIFIED
                            </span>
                          )}
                        </Link>
                        <div className="p-5 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                                {property.gender}
                              </span>
                              <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span>{property.rating}</span>
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-900 text-base leading-snug">{property.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{property.area}, Bangalore</p>
                            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{property.highlights.join(" • ")}</p>
                          </div>
                          <div className="pt-4 border-t border-gray-50 mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs text-gray-400">Starts from</span>
                                <span className="text-base font-black text-purple-700 ml-1">
                                  ₹{property.startingRent.toLocaleString("en-IN")}
                                </span>
                                <span className="text-[10px] text-gray-500">/mo</span>
                              </div>
                              <Link
                                href={`/properties/${property.id}`}
                                className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
                              >
                                Details
                              </Link>
                            </div>
                            {/* Check Availability CTA */}
                            <button
                              id={`btn-check-availability-${property.id}`}
                              onClick={() => openPopup("button-click", { id: property.id, name: property.name })}
                              className="w-full flex items-center justify-center gap-2 h-10 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                              <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>Check Availability</span>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <PropertyCard property={property} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div> {/* end main content layout grid */}
      </div>{/* end flex-grow container */}

      {/* 4. Mobile Drawer Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm md:hidden">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto flex flex-col p-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-purple-600" /> Filters
              </span>
              <button onClick={() => setShowMobileFilters(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 py-6 space-y-6">
              {/* Areas */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm">Location / Area</h4>
                <div className="space-y-1.5">
                  {BANGALORE_AREA_GROUPS.map((group) => {
                    const isExpanded = expandedAreas.has(group.name);
                    const isParentChecked = filters.areas.includes(group.name);
                    return (
                      <div key={group.name}>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`m-area-${group.name}`}
                            checked={isParentChecked}
                            onChange={() => handleCheckboxChange("areas", group.name)}
                            className="rounded text-purple-600 border-gray-300 flex-shrink-0"
                          />
                          <label
                            htmlFor={`m-area-${group.name}`}
                            className="flex-1 text-sm text-gray-700 font-normal cursor-pointer select-none"
                          >
                            {group.name}
                          </label>
                          <button
                            onClick={() => {
                              const next = new Set(expandedAreas);
                              if (isExpanded) next.delete(group.name); else next.add(group.name);
                              setExpandedAreas(next);
                            }}
                            className="p-1 rounded text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors flex-shrink-0"
                          >
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="ml-5 mt-1.5 mb-1 space-y-1.5 border-l-2 border-purple-100 pl-3">
                            {group.subAreas.map((sub) => (
                              <label key={sub} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-purple-600">
                                <input
                                  type="checkbox"
                                  checked={filters.areas.includes(sub)}
                                  onChange={() => handleCheckboxChange("areas", sub)}
                                  className="rounded text-purple-600 border-gray-300 flex-shrink-0"
                                />
                                <span>{sub}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budgets */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm">Budget Range</h4>
                <div className="space-y-2">
                  {BUDGET_RANGES.map((b) => (
                    <label key={b.value} className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={filters.budgets.includes(b.value)}
                        onChange={() => handleCheckboxChange("budgets", b.value)}
                        className="rounded text-purple-600"
                      />
                      <span>{b.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm">Gender</h4>
                <div className="flex gap-2">
                  {[
                    { value: "Male", label: "Boys" },
                    { value: "Female", label: "Girls" },
                    { value: "Unisex", label: "Co-Living" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => handleCheckboxChange("genders", value)}
                      className={`flex-1 py-2 px-3 border text-xs font-semibold rounded-xl transition-all ${
                        filters.genders.includes(value)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sharing */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm">Sharing Type</h4>
                <div className="flex gap-2">
                  {["Single", "Double", "Triple"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleCheckboxChange("sharings", s)}
                      className={`flex-1 py-2 px-3 border text-xs font-semibold rounded-xl transition-all ${
                        filters.sharings.includes(s)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                onClick={() => { clearFilters(); setShowMobileFilters(false); }}
                className="w-1/2 py-3 text-center text-sm font-semibold border border-purple-200 text-purple-700 rounded-xl"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-1/2 py-3 text-center text-sm font-semibold text-white bg-purple-600 rounded-xl shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
