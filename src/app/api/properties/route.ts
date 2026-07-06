import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseClient";
import type { Property } from "../../../data/mockData";

/**
 * GET /api/properties
 * Fetches all properties from Supabase and transforms them
 * into the Property interface shape used by the frontend.
 */
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // Transform Supabase rows into the Property interface shape
    const properties: Property[] = (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      area: row.area,
      city: row.city || "Bangalore",
      gender: row.gender as Property["gender"],
      type: row.type as Property["type"],
      sharingTypes: {
        ...(row.sharing_single ? { single: row.sharing_single } : {}),
        ...(row.sharing_double ? { double: row.sharing_double } : {}),
        ...(row.sharing_triple ? { triple: row.sharing_triple } : {}),
      },
      startingRent: row.starting_rent,
      securityDeposit: row.security_deposit || 0,
      amenities: row.amenities || [],
      food: {
        available: row.food_available || false,
        type: (row.food_type || "Veg") as "Veg" | "NonVeg" | "Both",
        meals: row.food_meals || [],
      },
      houseRules: row.house_rules || [],
      images:
        row.images && row.images.length > 0
          ? row.images
          : [`https://picsum.photos/800/500?random=${Date.now()}`],
      rating: parseFloat(row.rating) || 4.0,
      reviews: row.reviews || 0,
      availableFrom: row.available_from || new Date().toISOString().split("T")[0],
      availability: (row.availability || "Available") as Property["availability"],
      featured: row.featured || false,
      nearbyPlaces: {
        companies: row.nearby_companies || [],
        colleges: row.nearby_colleges || [],
        metro: row.nearby_metro || [],
      },
      latitude: parseFloat(row.latitude) || 12.9716,
      longitude: parseFloat(row.longitude) || 77.5946,
      ownerName: row.owner_name || "",
      verified: row.verified || false,
      highlights: row.highlights || [],
    }));

    return NextResponse.json({ success: true, properties });
  } catch (error: any) {
    console.error("Properties API GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
