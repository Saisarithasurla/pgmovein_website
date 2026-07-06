"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Calendar,
  CalendarCheck,
  Wifi,
  Wind,
  Utensils,
  Car,
  Shield,
  Tv,
  Zap,
  Brush,
  Thermometer,
  Building,
  MapPin,
  Clock,
  Compass,
  X,
} from "lucide-react";
import PropertyCard from "../../../components/PropertyCard";
import { useLead } from "../../../context/LeadContext";
import { useProperty } from "../../../context/PropertyContext";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const { openPopup, isSubmitted, leadData, setLeadData } = useLead();
  const { properties: allProperties } = useProperty();

  const property = allProperties.find((p) => p.id === propertyId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("rooms"); // tabs: rooms, amenities, rules, location
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Form states for the quick enquiry widget
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryMobile, setEnquiryMobile] = useState("");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const hasFiredScrollTrigger = useRef(false);

  // 1. Behavior Triggers for Lead Popup
  useEffect(() => {
    if (!property) return;

    // Scroll Trigger: 70% page height
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPct = (window.scrollY / scrollHeight) * 100;

      if (scrollPct >= 70) {
        const submitted = sessionStorage.getItem("leadSubmitted") === "true";
        if (!submitted && !hasFiredScrollTrigger.current) {
          hasFiredScrollTrigger.current = true;
          openPopup("auto-scroll", { id: property.id, name: property.name });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [property, openPopup]);

  // Sync wishlist status
  useEffect(() => {
    if (typeof window !== "undefined" && property) {
      const wishlist = JSON.parse(localStorage.getItem("pgmove_wishlist") || "[]");
      setIsSaved(wishlist.includes(property.id));
    }
  }, [propertyId, property]);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#F5F7FF] font-sans">
        <div className="text-center py-20">
          <h2 className="text-2xl font-black text-gray-900">Property Not Found</h2>
          <p className="text-gray-500 mt-2">The property you are looking for does not exist or has been removed.</p>
          <Link href="/properties" className="mt-6 inline-block bg-purple-600 text-white font-bold px-6 py-3 rounded-xl">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Handle manual click triggers
  const handleCTA = (btnLabel: string) => {
    openPopup("button-click", { id: property.id, name: property.name });
  };

  const handleQuickEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || enquiryMobile.length !== 10) return;
    setEnquirySubmitted(true);
  };

  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-5 w-5 text-purple-650" />;
      case "ac":
        return <Wind className="h-5 w-5 text-purple-650" />;
      case "food":
        return <Utensils className="h-5 w-5 text-purple-650" />;
      case "parking":
        return <Car className="h-5 w-5 text-purple-650" />;
      case "gym":
        return <Building className="h-5 w-5 text-purple-650" />;
      case "cctv":
        return <Shield className="h-5 w-5 text-purple-650" />;
      case "laundry":
        return <Brush className="h-5 w-5 text-purple-650" />;
      case "tv":
        return <Tv className="h-5 w-5 text-purple-650" />;
      case "powerbackup":
        return <Zap className="h-5 w-5 text-purple-650" />;
      case "housekeeping":
        return <Brush className="h-5 w-5 text-purple-650" />;
      case "hotwater":
        return <Thermometer className="h-5 w-5 text-purple-650" />;
      default:
        return <CheckCircle className="h-5 w-5 text-purple-650" />;
    }
  };

  // Filter similar properties (same area or price)
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && p.area === property.area)
    .slice(0, 3);

  return (
    <div className="bg-[#F5F7FF] min-h-screen flex flex-col font-sans pb-24 md:pb-8">

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Breadcrumbs & Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-purple-650 transition-colors self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Results
          </button>
          <nav className="text-xs font-semibold text-[#6B7280] flex items-center gap-2">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <span>&gt;</span>
            <Link href="/properties" className="hover:text-purple-600">Properties</Link>
            <span>&gt;</span>
            <span className="text-gray-600 truncate max-w-[200px]">{property.name}</span>
          </nav>
        </div>

        {/* Top Hero Section: Image Gallery & Property Header side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
          {/* Left Column: Image Gallery */}
          <section>
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer group" onClick={() => setIsImageModalOpen(true)}>
              <img
                src={property.images[activeImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-[1.01]"
              />
              {/* Verified Badge overlay on image */}
              {property.verified && (
                <span className="absolute top-4 left-4 z-10 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md backdrop-blur-sm">
                  <CheckCircle className="h-3.5 w-3.5 fill-white text-green-500" /> VERIFIED
                </span>
              )}
              {/* Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {/* Index Tracker */}
              <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {activeImageIndex + 1} / {property.images.length}
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all relative ${activeImageIndex === idx ? "border-purple-650 scale-95 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </section>

          {/* Right Column: Property Header & CTA Buttons */}
          <section className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold text-purple-750 bg-[#F5F3FF] px-2 py-0.5 rounded border border-purple-100">
                  {property.type === "PG"
                    ? (({ Male: "Boys", Female: "Girls", Unisex: "Co-Living" } as Record<string, string>)[property.gender] ?? property.gender) + " Preference"
                    : (({ "1BHK": "1 BHK", "2BHK": "2 BHK", "3BHK": "3 BHK" } as Record<string, string>)[property.gender] ?? property.gender)}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${property.availability === "Available" ? "bg-green-50 text-green-700 border border-green-150" : "bg-amber-50 text-amber-700 border border-amber-150"
                  }`}>
                  {property.availability}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1E1B2E] tracking-tight leading-tight">
                {property.name}
              </h1>

              <p className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4 text-[#7C3AED] shrink-0" />
                {property.area}, Bangalore
              </p>

              <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 pt-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(property.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <span>{property.rating}</span>
                <span className="text-gray-400 font-normal font-semibold">({property.reviews} ratings)</span>
              </div>
            </div>

            <div className="bg-[#F5F3FF] border border-purple-100 p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold">Starting Rent</span>
                <span className="text-3xl font-extrabold text-[#7C3AED]">₹{property.startingRent.toLocaleString("en-IN")}</span>
                <span className="text-xs text-gray-655 font-bold"> / month</span>
              </div>
              <div className="text-right text-xs text-gray-550 font-medium">
                <p>Deposit: ₹{property.securityDeposit.toLocaleString("en-IN")}</p>
                <p className="text-green-600 font-bold mt-0.5">No Brokerage</p>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-row gap-3 pt-2">
              <button
                id="btn-check-availability"
                onClick={() => handleCTA("Check Availability")}
                className="flex-1 flex items-center justify-center gap-1.5 h-12 px-4 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="truncate">Check Availability</span>
              </button>

              <button
                id="btn-book-visit"
                onClick={() => handleCTA("Book Visit")}
                className="flex-1 flex items-center justify-center gap-1.5 h-12 px-4 bg-white hover:bg-[#F5F3FF] border-[1.5px] border-[#7C3AED] text-[#7C3AED] font-bold text-sm rounded-xl transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
              >
                <CalendarCheck className="h-4 w-4 shrink-0" />
                <span className="truncate">Book Visit</span>
              </button>
            </div>
          </section>
        </div>

        {/* Grid Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Specs Tab Layout) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 bg-white rounded-xl shadow-sm p-1.5 overflow-x-auto whitespace-nowrap gap-1">
              <button
                onClick={() => setActiveTab("rooms")}
                className={`py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === "rooms"
                  ? "bg-[#F5F3FF] text-[#7C3AED]"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                Rooms & Pricing
              </button>
              <button
                onClick={() => setActiveTab("amenities")}
                className={`py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === "amenities"
                  ? "bg-[#F5F3FF] text-[#7C3AED]"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                Amenities
              </button>
              <button
                onClick={() => setActiveTab("rules")}
                className={`py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === "rules"
                  ? "bg-[#F5F3FF] text-[#7C3AED]"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                Food & Rules
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`py-3 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === "location"
                  ? "bg-[#F5F3FF] text-[#7C3AED]"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                Location & Map
              </button>
            </div>

            {/* Tab 1: Rooms & Pricing */}
            {activeTab === "rooms" && (
              <div className="space-y-6 animate-fade-in">
                {/* Pricing & Deposit Details */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50">
                  <h3 className="font-display font-bold text-[#1E1B2E] text-base mb-4">Pricing & Deposit Details</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Starting Rent</span>
                      <span className="text-base font-extrabold text-gray-900">₹{property.startingRent}</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Security Deposit</span>
                      <span className="text-base font-extrabold text-gray-900">₹{property.securityDeposit}</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Maintenance</span>
                      <span className="text-base font-extrabold text-green-600">Included</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Available From</span>
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1 mt-1">
                        <Calendar className="h-3.5 w-3.5 text-[#7C3AED]" /> {property.availableFrom}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sharing Options Table */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50">
                  <h3 className="font-display font-bold text-[#1E1B2E] text-base mb-4">Sharing Options & Rates</h3>
                  <div className="overflow-hidden border border-gray-100 rounded-xl">
                    <table className="min-w-full divide-y divide-gray-100 text-sm">
                      <thead className="bg-gray-55 font-bold text-gray-700 text-xs uppercase">
                        <tr>
                          <th className="px-6 py-4 text-left">Occupancy Type</th>
                          <th className="px-6 py-4 text-right">Monthly Rent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                        {property.sharingTypes.single && (
                          <tr>
                            <td className="px-6 py-4">Single Occupancy Room</td>
                            <td className="px-6 py-4 text-right text-[#7C3AED] font-bold">₹{property.sharingTypes.single.toLocaleString("en-IN")}/mo</td>
                          </tr>
                        )}
                        {property.sharingTypes.double && (
                          <tr>
                            <td className="px-6 py-4">Double Occupancy Room</td>
                            <td className="px-6 py-4 text-right text-[#7C3AED] font-bold">₹{property.sharingTypes.double.toLocaleString("en-IN")}/mo</td>
                          </tr>
                        )}
                        {property.sharingTypes.triple && (
                          <tr>
                            <td className="px-6 py-4">Triple Occupancy Room</td>
                            <td className="px-6 py-4 text-right text-[#7C3AED] font-bold">₹{property.sharingTypes.triple.toLocaleString("en-IN")}/mo</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Amenities */}
            {activeTab === "amenities" && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 animate-fade-in">
                <h3 className="font-display font-bold text-[#1E1B2E] text-base mb-4">Amenities Offered</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-55/40 rounded-xl">
                      <span className="p-1.5 bg-[#F5F3FF] rounded-lg shrink-0">
                        {getAmenityIcon(amenity)}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Food & Rules */}
            {activeTab === "rules" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {/* Food Details */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-[#1E1B2E] text-base mb-4">Food & Catering</h3>
                    {property.food.available ? (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-700">
                          <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-150 rounded-lg">
                            🟢 {property.food.type} Catering
                          </span>
                          <span className="px-3 py-1 bg-gray-50 border border-gray-150 rounded-lg">
                            Meals: {property.food.meals.join(", ")}
                          </span>
                        </div>
                        <div className="text-xs text-[#6B7280] bg-gray-50 p-4 rounded-xl space-y-1">
                          <p className="font-bold text-gray-750">Meal Timings:</p>
                          <p>• Breakfast: 7:30 AM - 9:30 AM</p>
                          <p>• Lunch: 1:00 PM - 2:30 PM (Weekends)</p>
                          <p>• Dinner: 8:00 PM - 10:00 PM</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm font-semibold text-[#6B7280] bg-gray-55 p-4 rounded-xl">
                        🚫 Food is not included or provided at this PG. Professional tiffin services are available nearby.
                      </div>
                    )}
                  </div>
                </div>

                {/* House Rules */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50">
                  <h3 className="font-display font-bold text-[#1E1B2E] text-base mb-4">House Rules & Curfews</h3>
                  <ul className="space-y-3">
                    {property.houseRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#6B7280] font-semibold">
                        <span className="text-red-500 mt-0.5 font-bold shrink-0">✕</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 4: Location & Address */}
            {activeTab === "location" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-[#1E1B2E] text-base">Location Address</h3>
                      <p className="text-xs text-[#6B7280] mt-1">{property.address || `${property.area}, Bangalore, KA, India`}</p>
                    </div>
                  </div>

                  {/* Nearby Landmarks */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 space-y-4">
                    <h3 className="font-display font-bold text-[#1E1B2E] text-base">Nearby Landmarks</h3>
                    <div className="space-y-3 text-xs font-semibold">
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#7C3AED] uppercase text-[10px] tracking-wider">🏢 Tech Parks</h4>
                        <p className="text-[#6B7280] truncate">{property.nearbyPlaces.companies.join(", ")}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#7C3AED] uppercase text-[10px] tracking-wider">🎓 Colleges</h4>
                        <p className="text-[#6B7280] truncate">{property.nearbyPlaces.colleges.join(", ")}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#7C3AED] uppercase text-[10px] tracking-wider">🚇 Metro</h4>
                        <p className="text-[#6B7280] truncate">{property.nearbyPlaces.metro.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar Enquiry) */}
          <div className="space-y-6">
            {/* Quick Enquiry Mini-Form */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-50 space-y-4">
              {enquirySubmitted ? (
                <div className="text-center py-8 space-y-4 animate-scale-in">
                  <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-[#7C3AED] fill-[#F5F3FF]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-gray-900 text-base">Enquiry Sent!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold px-2">
                      Thank you, {enquiryName}. We have received your query for {property.name}. Our support team will get in touch with you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-[#1E1B2E] text-base">Quick Enquiry</h3>
                  <form onSubmit={handleQuickEnquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#6B7280] mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#6B7280] mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={enquiryMobile}
                        onChange={(e) => setEnquiryMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="10-digit mobile number"
                        className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!enquiryName || enquiryMobile.length !== 10}
                      className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-md"
                    >
                      Send Enquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Similar PGs Section */}
        {similarProperties.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display font-bold text-[#1E1B2E] text-2xl tracking-tight">Similar PGs in {property.area}</h3>
                <p className="text-sm text-[#6B7280] mt-1">Check out other verified options available nearby</p>
              </div>
              <Link
                href={`/properties?area=${encodeURIComponent(property.area)}`}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors"
              >
                View All Similar PGs &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 z-[110] p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col justify-center items-center rounded-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={property.images[activeImageIndex]}
              alt={property.name}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />

            {/* Lightbox Navigation */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Index / Info */}
            <div className="mt-4 text-white text-sm font-bold bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
              <span>{property.name}</span>
              <span className="text-white/40">•</span>
              <span>{activeImageIndex + 1} / {property.images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
