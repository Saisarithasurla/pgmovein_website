import React from "react";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  collegeOrCompany: string;
  area: string;
  reviewText: string;
  rating?: number;
}

export default function TestimonialCard({
  name,
  collegeOrCompany,
  area,
  reviewText,
  rating = 5,
}: TestimonialCardProps) {
  // Get initials for the avatar
  const getInitials = (n: string) => {
    return n
      .split(" ")
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative duration-300 flex flex-col justify-between h-full">
      {/* Quote Icon */}
      <span className="absolute top-6 right-6 text-purple-100 shrink-0">
        <Quote className="h-10 w-10 rotate-180 fill-purple-50 text-purple-100" />
      </span>

      <div className="space-y-4 relative z-10">
        {/* Star Rating */}
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-sm leading-relaxed italic">
          "{reviewText}"
        </p>
      </div>

      {/* User Info Row */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-50 relative z-10">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm tracking-wide shrink-0">
          {getInitials(name)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm leading-snug">{name}</h4>
          <p className="text-xs text-gray-500 font-medium">
            {collegeOrCompany} • Stayed in <span className="text-purple-600 font-semibold">{area}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
