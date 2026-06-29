import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Star } from "lucide-react";
import { notFound } from "next/navigation";
import BookingRequestForm from "@/components/BookingRequestForm";
import { properties } from "@/data/mockData";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default function BookPropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find((item) => item.id === params.id);
  if (!property) notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link href={`/properties/${property.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-navy transition-all duration-200 hover:text-saffron">
        <ArrowLeft className="h-4 w-4" />
        Back to Property
      </Link>

      <div className="mt-6 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-md bg-white shadow-sm">
          <div className="relative aspect-video">
            <Image src={property.images[0]} alt={`${property.name} property photo`} fill className="object-cover" priority />
          </div>
          <div className="p-4 sm:p-6">
            <span className="rounded-md bg-navy px-3 py-1 text-sm font-bold text-white">{property.type}</span>
            <h1 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl">{property.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-slate-600"><MapPin className="h-5 w-5 text-saffron" />{property.area}, {property.city}</p>
            <p className="mt-4 flex items-center gap-1 font-bold text-saffron"><Star className="h-5 w-5 fill-saffron" />{property.rating} ({property.reviewCount} reviews)</p>
            <div className="mt-5 border-t border-slate-200 pt-5">
              <p className="font-display text-2xl font-bold text-navy">Rs.{property.rent.toLocaleString("en-IN")}<span className="text-base text-slate-500">/month</span></p>
              <p className="mt-3 font-bold text-navy">{property.owner.name}</p>
              <a href={`tel:${property.owner.phone.replace(/\s/g, "")}`} className="mt-2 inline-flex items-center gap-2 font-semibold text-saffron">
                <Phone className="h-4 w-4" />
                Contact Now
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Booking Request</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Share your details and preferred move-in date.</p>
          <div className="mt-6">
            <BookingRequestForm property={property} />
          </div>
        </div>
      </div>
    </section>
  );
}
