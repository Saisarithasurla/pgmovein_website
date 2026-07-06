"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "../data/mockData";
import { Heart, Star, CheckCircle, Wifi, Wind, Utensils, Car, Users, Building, Shield, Brush, Tv, Zap, Thermometer } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("pgmove_wishlist") || "[]");
      setIsWishlisted(wishlist.includes(property.id));
    }
  }, [property.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("pgmove_wishlist") || "[]");
      let updatedWishlist;
      if (wishlist.includes(property.id)) {
        updatedWishlist = wishlist.filter((id: string) => id !== property.id);
        setIsWishlisted(false);
      } else {
        updatedWishlist = [...wishlist, property.id];
        setIsWishlisted(true);
      }
      localStorage.setItem("pgmove_wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "Male":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Female":
        return "bg-pink-50 text-pink-700 border-pink-100";
      case "1BHK":
      case "2BHK":
      case "3BHK":
        return "bg-orange-50 text-orange-700 border-orange-100";
      default:
        return "bg-purple-50 text-purple-700 border-purple-100";
    }
  };

  // Map gender/config value to display label
  const getGenderLabel = (gender: string, type: string) => {
    if (type === "PG") {
      switch (gender) {
        case "Male": return "Boys";
        case "Female": return "Girls";
        case "Unisex": return "Co-Living";
        default: return gender;
      }
    }
    // For Flat type
    switch (gender) {
      case "1BHK": return "1 BHK";
      case "2BHK": return "2 BHK";
      case "3BHK": return "3 BHK";
      default: return gender;
    }
  };

  // Helper to map amenity name to icon
  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3.5 w-3.5" />;
      case "ac":
        return <Wind className="h-3.5 w-3.5" />;
      case "food":
        return <Utensils className="h-3.5 w-3.5" />;
      case "parking":
        return <Car className="h-3.5 w-3.5" />;
      case "gym":
        return <Building className="h-3.5 w-3.5" />;
      case "cctv":
        return <Shield className="h-3.5 w-3.5" />;
      case "laundry":
        return <Brush className="h-3.5 w-3.5" />;
      case "tv":
        return <Tv className="h-3.5 w-3.5" />;
      case "powerbackup":
        return <Zap className="h-3.5 w-3.5" />;
      case "housekeeping":
        return <Brush className="h-3.5 w-3.5" />;
      case "hotwater":
        return <Thermometer className="h-3.5 w-3.5" />;
      default:
        return <CheckCircle className="h-3.5 w-3.5" />;
    }
  };

  const sharingString = Object.keys(property.sharingTypes)
    .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
    .join(" / ");

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
      >
        <Heart
          className={`h-4.5 w-4.5 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : ""
          }`}
        />
      </button>

      {/* Image Gallery Header */}
      <Link href={`/properties/${property.id}`} className="block overflow-hidden relative aspect-video bg-gray-100">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* PG / Flat type badge - top left */}
        <span className={`absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-md shadow-sm backdrop-blur-sm ${
          property.type === "PG"
            ? "bg-purple-600 text-white"
            : "bg-orange-500 text-white"
        }`}>
          {property.type === "PG" ? "PG" : "Flat"}
        </span>

        {/* Verification badge */}
        {property.verified && (
          <span className="absolute bottom-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <CheckCircle className="h-3 w-3 fill-white text-green-500" /> VERIFIED
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Header Row: Gender/BHK Badge & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getGenderColor(
                property.gender
              )}`}
            >
              {getGenderLabel(property.gender, property.type)}
            </span>
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{property.rating}</span>
              <span className="text-gray-400 text-xs font-normal">({property.reviews})</span>
            </div>
          </div>

          {/* Name & Location */}
          <Link href={`/properties/${property.id}`} className="block">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
              {property.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <span className="inline-block h-1 w-1 bg-gray-400 rounded-full"></span>
            {property.area}, Bangalore
          </p>

          {/* Sharing Info */}
          <div className="mt-3 flex items-center gap-1 text-xs text-gray-600">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span>{property.type === "Flat" ? getGenderLabel(property.gender, property.type) : `${sharingString} Sharing`}</span>
          </div>

          {/* Amenities Summary */}
          <div className="mt-4 flex flex-wrap gap-2">
            {property.amenities.slice(0, 4).map((amenity, idx) => {
              const icon = getAmenityIcon(amenity);
              return icon ? (
                <div
                  key={idx}
                  className="flex items-center justify-center p-1.5 rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
                  title={amenity}
                >
                  {icon}
                </div>
              ) : null;
            })}
            {property.amenities.length > 4 && (
              <span className="text-[10px] font-medium text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-1 rounded-lg">
                +{property.amenities.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-6 pt-4 border-t border-gray-50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">
                Starting Rent
              </span>
              <span className="text-lg font-extrabold text-purple-700">
                ₹{property.startingRent.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-500 font-normal">/mo</span>
            </div>

            <Link
              href={`/properties/${property.id}`}
              className="text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
            >
              View Details
            </Link>
          </div>


        </div>
      </div>
    </div>
  );
}
