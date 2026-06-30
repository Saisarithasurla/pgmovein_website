import Link from "next/link";
import { ArrowRight, Building2, Hotel, MapPin, Users } from "lucide-react";
import type { Area } from "@/data/mockData";
import { titleCase } from "@/lib/utils";

export default function AreaCard({ area }: { area: Area }) {
  return (
    <article className="group rounded-2xl border border-violet-100 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-saffron/30 hover:shadow-[0_12px_28px_rgba(124,58,237,0.10)] sm:p-5">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="font-display text-lg font-bold text-navy">{area.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <MapPin className="h-4 w-4 text-saffron" />
            {titleCase(area.city)}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-saffron">
          {area.propertyCount} homes
        </span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="grid gap-2 text-xs font-semibold text-slate-600 min-[380px]:grid-cols-3 sm:gap-3">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-saffron" />
            {area.pgCount} PGs
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-saffron" />
            {area.flatCount} Flats
          </span>
          <span className="flex items-center gap-1.5">
            <Hotel className="h-3.5 w-3.5 text-saffron" />
            {area.hostelCount} Hostels
          </span>
        </div>
        <Link href={`/properties?area=${encodeURIComponent(area.name)}&city=${area.city}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-saffron transition-all duration-200 group-hover:gap-2 group-hover:underline">
          Browse properties
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
