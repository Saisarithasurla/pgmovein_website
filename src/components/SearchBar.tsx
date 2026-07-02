"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, IndianRupee, Users, Calendar, Search } from "lucide-react";
import { BANGALORE_AREAS, BUDGET_RANGES } from "../data/mockData";

export default function SearchBar() {
  const router = useRouter();
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [gender, setGender] = useState("");
  const [sharing, setSharing] = useState("");
  const [moveInDate, setMoveInDate] = useState("");

  // Custom dropdown state for Location/Area
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (areaRef.current && !areaRef.current.contains(e.target as Node)) {
        setIsAreaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (budget) params.set("budget", budget);
    if (gender) params.set("gender", gender);
    if (sharing && sharing !== "Any") params.set("sharing", sharing);
    if (moveInDate) params.set("date", moveInDate);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl md:rounded-full shadow-2xl border border-gray-150 p-5 md:py-3 md:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 max-w-6xl mx-auto -mt-8 relative z-20"
    >
      {/* 1. Location Field (Custom Dropdown) */}
      <div 
        ref={areaRef}
        className="flex-1 min-w-[145px] border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-3 flex items-center gap-2.5 relative cursor-pointer select-none"
        onClick={() => setIsAreaOpen(!isAreaOpen)}
      >
        <MapPin className="h-5 w-5 text-[#7C3AED] shrink-0" />
        <div className="w-full">
          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Location
          </label>
          <div className="w-full text-xs font-semibold text-gray-850 mt-0.5 flex items-center justify-between">
            <span className="truncate">{area || "Select Area"}</span>
            <span className="text-[9px] text-gray-450 ml-1">▼</span>
          </div>
        </div>

        {/* Custom Downward Dropdown Options Panel */}
        {isAreaOpen && (
          <div className="absolute top-full left-0 mt-3.5 w-60 bg-white border border-gray-150 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto py-2 animate-fade-in">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setArea("");
                setIsAreaOpen(false);
              }}
              className={`px-4 py-2.5 text-xs font-bold text-gray-400 hover:bg-purple-50 hover:text-purple-650 cursor-pointer ${
                area === "" ? "bg-purple-50 text-purple-650" : ""
              }`}
            >
              Select Area
            </div>
            {BANGALORE_AREAS.map((item) => (
              <div
                key={item}
                onClick={(e) => {
                  e.stopPropagation();
                  setArea(item);
                  setIsAreaOpen(false);
                }}
                className={`px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-[#F5F3FF] hover:text-[#7C3AED] cursor-pointer ${
                  area === item ? "bg-[#F5F3FF] text-[#7C3AED] font-bold" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Budget Field */}
      <div className="flex-1 min-w-[130px] border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-3 flex items-center gap-2.5">
        <IndianRupee className="h-5 w-5 text-purple-600 shrink-0" />
        <div className="w-full">
          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-gray-800 focus:ring-0 focus:outline-none cursor-pointer mt-0.5"
          >
            <option value="">Select Budget</option>
            {BUDGET_RANGES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Gender Field */}
      <div className="flex-1 min-w-[110px] border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-3 flex items-center gap-2.5">
        <Users className="h-5 w-5 text-purple-600 shrink-0" />
        <div className="w-full">
          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-gray-800 focus:ring-0 focus:outline-none cursor-pointer mt-0.5"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male Only</option>
            <option value="Female">Female Only</option>
            <option value="Unisex">Unisex / Co</option>
          </select>
        </div>
      </div>

      {/* 4. Sharing Type Field */}
      <div className="flex-1 min-w-[110px] border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-3 flex items-center gap-2.5">
        <Users className="h-5 w-5 text-purple-600 shrink-0" />
        <div className="w-full">
          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Sharing
          </label>
          <select
            value={sharing}
            onChange={(e) => setSharing(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-gray-800 focus:ring-0 focus:outline-none cursor-pointer mt-0.5"
          >
            <option value="">Select Sharing</option>
            <option value="Any">Any Sharing</option>
            <option value="Single">Single Room</option>
            <option value="Double">Double Room</option>
            <option value="Triple">Triple Room</option>
          </select>
        </div>
      </div>

      {/* 5. Date Field */}
      <div className="flex-1 min-w-[125px] flex items-center gap-2.5 pb-2 md:pb-0">
        <Calendar className="h-5 w-5 text-[#7C3AED] shrink-0" />
        <div className="w-full">
          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Move-in Date
          </label>
          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-gray-850 focus:ring-0 focus:outline-none cursor-pointer mt-0.5"
          />
        </div>
      </div>

      {/* 6. Search Button (Positioned at the end) */}
      <button
        type="submit"
        className="w-full md:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-6 py-3 rounded-xl md:rounded-full transition-all shadow-md flex items-center justify-center gap-2 shrink-0 self-center mt-1 md:mt-0"
      >
        <Search className="h-4.5 w-4.5" />
        <span>Search</span>
      </button>
    </form>
  );
}
