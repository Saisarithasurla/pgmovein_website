import Image from "next/image";
import Link from "next/link";
import { Car, MapPin, Star, UtensilsCrossed, Wifi, Wind } from "lucide-react";
import SavePropertyButton from "@/components/SavePropertyButton";
import type { Property } from "@/data/mockData";
import { cn } from "@/lib/utils";

const amenityIcons = { Wifi, AC: Wind, Meals: UtensilsCrossed, Parking: Car };
const typeLabels: Record<Property["type"], string> = {
  PG: "PG",
  Flat: "APARTMENT",
  Hostel: "HOSTEL",
  CoLiving: "CO-LIVING",
  Room: "ROOM",
};
const audienceStyles = {
  Male: "bg-blue-50 text-blue-700",
  Female: "bg-pink-50 text-pink-600",
  Unisex: "bg-emerald-50 text-emerald-700",
  Family: "bg-amber-50 text-amber-700",
} as const;

export default function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  const visibleAmenities = property.amenities.slice(0, 4);
  const extraCount = Math.max(property.amenities.length - visibleAmenities.length, property.isFeatured ? 4 : 0);

  return (
    <article className="property-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200">
      <div className={cn("relative", compact ? "h-44 sm:h-48" : "h-56 sm:h-60")}>
        <Link href={`/properties/${property.id}`} aria-label={`View ${property.name}`}>
          <Image src={property.images[0]} alt={`${property.name} property photo`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="property-image object-cover" />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
        {property.isFeatured && (
          <span className="absolute left-0 top-5 inline-flex items-center gap-1 rounded-r-md bg-saffron px-3 py-2 text-xs font-bold tracking-wide text-white shadow-md">
            <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
            FEATURED
          </span>
        )}
        <div className="absolute right-3 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-saffron shadow-md">{typeLabels[property.type]}</span>
        </div>
        <SavePropertyButton propertyId={property.id} compact className="absolute bottom-4 right-4 h-11 w-11 rounded-full border-white/90 bg-white/95 text-rose-500 shadow-md hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600" />
        {property.audience && (
          <span className={cn("absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm", audienceStyles[property.audience])}>
            {property.audience}
          </span>
        )}
      </div>
      <div className={cn(compact ? "p-4 sm:p-5" : "p-5 sm:p-6")}>
        <h3 className={cn("font-display font-extrabold text-navy", compact ? "text-lg" : "text-xl")}>
          <Link href={`/properties/${property.id}`} className="transition-colors duration-200 hover:text-saffron">
            {property.name}
          </Link>
        </h3>
        <p className={cn("mt-2 flex items-center gap-2 text-slate-600", compact ? "text-sm" : "text-base")}>
          <MapPin className="h-4 w-4 fill-pink-500 text-pink-500" />
          {property.area}, Bangalore
        </p>
        {property.highlights && (
          <div className={cn("flex flex-wrap gap-2", compact ? "mt-4" : "mt-5")}>
            {property.highlights.map((highlight) => (
              <span key={highlight} className={cn("rounded-md border border-slate-200 bg-slate-50 font-medium text-slate-600", compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm")}>
                {highlight}
              </span>
            ))}
          </div>
        )}
        <div className={cn("flex flex-wrap gap-x-3 gap-y-2 text-slate-600", compact ? "mt-4 text-xs" : "mt-5 text-sm")}>
          {visibleAmenities.map((amenity) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
            return Icon ? (
              <span key={amenity} className="flex items-center gap-1">
                <Icon className="h-4 w-4 text-blue-500" />
                {amenity}
              </span>
            ) : null;
          })}
          {extraCount > 0 && <span className="font-bold text-saffron">+{extraCount} more</span>}
        </div>
        <div className={cn("border-t border-slate-200", compact ? "mt-4 pt-4" : "mt-6 pt-5")}>
          <div className="flex items-center justify-between gap-4">
            <p className={cn("font-display font-extrabold text-saffron", compact ? "text-xl" : "text-2xl")}>
              Rs.{property.rent.toLocaleString("en-IN")}
              <span className="text-sm font-semibold text-slate-400">/month</span>
            </p>
            <div className="flex items-center gap-1 text-sm font-bold text-navy">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {property.rating}
              <span className="font-medium text-slate-400">({property.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
