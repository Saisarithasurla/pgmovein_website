"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { Property, mockProperties, BANGALORE_AREA_GROUPS } from "../data/mockData";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface Filters {
  areas: string[];
  budgets: string[]; // values like: "under-5000", "5000-8000", "8000-12000", "12000-20000", "above-20000"
  genders: string[]; // "Male", "Female", "Unisex"
  sharings: string[]; // "single", "double", "triple"
  amenities: string[]; // "Wifi", "AC", "Food", etc.
  sortBy: string; // "price-asc", "price-desc", "popular", "rating", "newest"
  searchQuery: string;
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isPending: boolean;
  clearFilters: () => void;
}

const defaultFilters: Filters = {
  areas: [],
  budgets: [],
  genders: [],
  sharings: [],
  amenities: [],
  sortBy: "popular",
  searchQuery: "",
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  // Supabase-fetched properties (agent-added)
  const [supabaseProperties, setSupabaseProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.properties)) {
          setSupabaseProperties(data.properties);
        }
      })
      .catch(() => {
        // Silently fail — mock data will still be available
      });
  }, []);

  // Merge static mock properties with Supabase-fetched properties
  const allProperties = supabaseProperties;

  // 1. Initialize filters from URL on mount
  useEffect(() => {
    const areas = searchParams.get("area")?.split(",").filter(Boolean) || [];
    const budgets = searchParams.get("budget")?.split(",").filter(Boolean) || [];
    const genders = searchParams.get("gender")?.split(",").filter(Boolean) || [];
    const sharings = searchParams.get("sharing")?.split(",").filter(Boolean) || [];
    const amenities = searchParams.get("amenities")?.split(",").filter(Boolean) || [];
    const sortBy = searchParams.get("sortBy") || "popular";
    const searchQuery = searchParams.get("query") || "";

    setFilters({
      areas,
      budgets,
      genders,
      sharings,
      amenities,
      sortBy,
      searchQuery,
    });
  }, [searchParams]);

  // Helper to check if a property fits selected budget ranges
  const checkBudget = (startingRent: number, budgetsSelected: string[]) => {
    if (budgetsSelected.length === 0) return true;
    return budgetsSelected.some((range) => {
      if (range === "under-5000") return startingRent < 5000;
      if (range === "5000-8000") return startingRent >= 5000 && startingRent <= 8000;
      if (range === "8000-12000") return startingRent >= 8000 && startingRent <= 12000;
      if (range === "12000-20000") return startingRent >= 12000 && startingRent <= 20000;
      if (range === "above-20000") return startingRent > 20000;
      return false;
    });
  };

  // 2. Perform filtering & sorting
  // Build sub-area → parent map for smart area matching
  const subAreaToParent: Record<string, string> = {};
  BANGALORE_AREA_GROUPS.forEach((group) => {
    group.subAreas.forEach((sub) => {
      subAreaToParent[sub.toLowerCase()] = group.name.toLowerCase();
    });
  });

  const getFilteredProperties = () => {
    return allProperties
      .filter((p) => {
        // Area Match: support parent area and sub-area selection
        if (filters.areas.length > 0) {
          const propArea = p.area.toLowerCase();
          const propParent = subAreaToParent[propArea]; // parent of property's area (if sub-area)
          const matched = filters.areas.some((a) => {
            const filterArea = a.toLowerCase();
            // Direct match
            if (filterArea === propArea) return true;
            // Filter is a parent area, property's area is a sub-area of that parent
            if (propParent && propParent === filterArea) return true;
            // Filter is a sub-area, property has the parent area
            if (subAreaToParent[filterArea] === propArea) return true;
            return false;
          });
          if (!matched) return false;
        }

        // Budget Match
        if (!checkBudget(p.startingRent, filters.budgets)) {
          return false;
        }

        // Gender Match
        if (filters.genders.length > 0 && !filters.genders.includes(p.gender)) {
          return false;
        }

        // Sharing Type Match
        if (filters.sharings.length > 0) {
          const hasSelectedSharing = filters.sharings.some((share) => {
            const key = share.toLowerCase() as keyof typeof p.sharingTypes;
            return p.sharingTypes[key] !== undefined;
          });
          if (!hasSelectedSharing) return false;
        }

        // Amenities Match
        if (filters.amenities.length > 0) {
          const hasAllAmenities = filters.amenities.every((amenity) =>
            p.amenities.some((a) => a.toLowerCase() === amenity.toLowerCase())
          );
          if (!hasAllAmenities) return false;
        }

        // Search Query Match
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesArea = p.area.toLowerCase().includes(q);
          if (!matchesName && !matchesArea) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") {
          return a.startingRent - b.startingRent;
        }
        if (filters.sortBy === "price-desc") {
          return b.startingRent - a.startingRent;
        }
        if (filters.sortBy === "rating") {
          return b.rating - a.rating;
        }
        if (filters.sortBy === "newest") {
          // Compare dates
          return new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime();
        }
        // default "popular" - sort by reviews count or featured status first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.reviews - a.reviews;
      });
  };

  const filteredProperties = getFilteredProperties();

  // 3. Sync filters state to URL parameters
  const updateUrl = (newFilters: Filters) => {
    if (pathname !== "/properties") return;

    const params = new URLSearchParams();

    if (newFilters.areas.length > 0) params.set("area", newFilters.areas.join(","));
    if (newFilters.budgets.length > 0) params.set("budget", newFilters.budgets.join(","));
    if (newFilters.genders.length > 0) params.set("gender", newFilters.genders.join(","));
    if (newFilters.sharings.length > 0) params.set("sharing", newFilters.sharings.join(","));
    if (newFilters.amenities.length > 0) params.set("amenities", newFilters.amenities.join(","));
    if (newFilters.sortBy !== "popular") params.set("sortBy", newFilters.sortBy);
    if (newFilters.searchQuery) params.set("query", newFilters.searchQuery);

    const queryStr = params.toString();
    startTransition(() => {
      router.push(`${pathname}${queryStr ? "?" + queryStr : ""}`, { scroll: false });
    });
  };

  const setFiltersWithUrlSync = (
    value: React.SetStateAction<Filters>
  ) => {
    setFilters((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      setTimeout(() => {
        updateUrl(next);
      }, 0);
      return next;
    });
  };

  const clearFilters = () => {
    setFiltersWithUrlSync(defaultFilters);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties: allProperties,
        filteredProperties,
        filters,
        setFilters: setFiltersWithUrlSync,
        isPending,
        clearFilters,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};
