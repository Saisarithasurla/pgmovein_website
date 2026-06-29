import Image from "next/image";
import Link from "next/link";
import { Car, CheckCircle, MapPin, UtensilsCrossed, Wifi, Wind } from "lucide-react";
import SavePropertyButton from "@/components/SavePropertyButton";
import type { Property } from "@/data/mockData";

const amenityIcons = { Wifi, AC: Wind, Meals: UtensilsCrossed, Parking: Car };

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="property-card overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all duration-200">
      <div className="relative aspect-video">
        <Image src={property.images[0]} alt={`${property.name} property photo`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="property-image object-cover" />
        {property.isVerified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-bold text-white">
            <CheckCircle className="h-3.5 w-3.5" />
            VERIFIED
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-navy px-2 py-1 text-xs font-bold text-white">{property.type}</span>
        <SavePropertyButton propertyId={property.id} compact className="absolute bottom-3 right-3 shadow-md" />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-base font-bold text-navy sm:text-lg">{property.name}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-saffron" />
          {property.area}, {property.city}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
          {property.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
            return Icon ? (
              <span key={amenity} className="flex items-center gap-1">
                <Icon className="h-4 w-4 text-navy" />
                {amenity}
              </span>
            ) : null;
          })}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-bold text-navy">Rs.{property.rent.toLocaleString("en-IN")}<span className="text-sm font-semibold text-slate-500">/month</span></p>
          <Link href={`/properties/${property.id}`} className="inline-flex w-full items-center justify-center rounded-md bg-saffron px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 sm:w-auto">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
