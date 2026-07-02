import React from "react";

export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-video bg-gray-200 w-full" />

      {/* Card Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-3">
          {/* Badge & Rating Row */}
          <div className="flex items-center justify-between">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 w-12 bg-gray-200 rounded" />
          </div>

          {/* Name & Area */}
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />

          {/* Sharing Info */}
          <div className="h-4 w-1/3 bg-gray-200 rounded" />

          {/* Amenities Row */}
          <div className="flex gap-2 pt-2">
            <div className="h-7 w-7 bg-gray-200 rounded-lg" />
            <div className="h-7 w-7 bg-gray-200 rounded-lg" />
            <div className="h-7 w-7 bg-gray-200 rounded-lg" />
            <div className="h-7 w-7 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>
          <div className="h-9 w-24 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
