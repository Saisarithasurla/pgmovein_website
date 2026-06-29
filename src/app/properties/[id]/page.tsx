import Link from "next/link";
import { ArrowLeft, Building2, Car, CheckCircle, IndianRupee, MapPin, ShieldCheck, Star, TrainFront, UtensilsCrossed, Wifi, Wind } from "lucide-react";
import { notFound } from "next/navigation";
import BookingCard from "@/components/BookingCard";
import PropertyImageGallery from "@/components/PropertyImageGallery";
import SavePropertyButton from "@/components/SavePropertyButton";
import { cityGuides, properties } from "@/data/mockData";
import { titleCase } from "@/lib/utils";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((item) => item.id === params.id);
  if (!property) notFound();

  const cityGuide = cityGuides[property.city];
  const gallery = [
    property.images[0],
    `https://picsum.photos/seed/${property.id}-living/800/600`,
    `https://picsum.photos/seed/${property.id}-room/800/600`,
  ];
  const deposit = property.rent * (property.type === "Flat" ? 2 : 1);
  const availableFrom = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const amenities = [
    [Wifi, "Wifi"],
    [Wind, "AC"],
    [UtensilsCrossed, "Meals"],
    [Car, "Parking"],
  ] as const;
  const nearby = cityGuide?.highlights ?? [`Popular rentals in ${property.area}`, "Daily essentials nearby", "Easy commute options"];
  const rules = property.type === "Flat" ? ["Family and working professionals preferred", "Two month deposit estimate", "Maintenance discussed with owner"] : ["ID verification required", "Visitors as per house policy", "Move-in date confirmed by owner"];

  return (
    <div className="pb-10 sm:pb-16">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-bold text-navy transition-all duration-200 hover:text-saffron">
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        <PropertyImageGallery
          images={gallery}
          propertyName={property.name}
          badges={
            <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
              <span className="rounded-md bg-navy px-2.5 py-1 text-xs font-bold text-white sm:px-3 sm:text-sm">{property.type}</span>
              {property.isVerified && <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white sm:px-3 sm:text-sm"><CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />Verified</span>}
            </div>
          }
        />

        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6 sm:space-y-8">
            <section className="rounded-md bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold text-navy sm:text-4xl">{property.name}</h1>
                  <p className="mt-3 flex items-center gap-2 text-slate-600"><MapPin className="h-5 w-5 text-saffron" />{property.area}, {titleCase(property.city)}</p>
                  <p className="mt-4 flex items-center gap-1 font-bold text-saffron"><Star className="h-5 w-5 fill-saffron" />{property.rating} ({property.reviewCount} reviews)</p>
                </div>
                <SavePropertyButton propertyId={property.id} />
              </div>
              <p className="mt-6 leading-7 text-slate-600">
                A verified {property.type.toLowerCase()} in {property.area} with clear rent details, direct owner contact, and practical amenities for a smooth move-in.
              </p>
            </section>

            <section className="rounded-md bg-white p-4 shadow-sm sm:p-6">
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Rent Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {([
                  [IndianRupee, "Monthly Rent", `Rs.${property.rent.toLocaleString("en-IN")}`],
                  [ShieldCheck, "Deposit Estimate", `Rs.${deposit.toLocaleString("en-IN")}`],
                  [Building2, "Available From", availableFrom],
                ] as const).map(([Icon, label, value]) => (
                  <div key={label} className="rounded-md border border-slate-200 p-4">
                    <Icon className="h-6 w-6 text-saffron" />
                    <p className="mt-3 text-sm font-semibold text-slate-500">{label}</p>
                    <p className="mt-1 font-display text-xl font-bold text-navy">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-md bg-white p-4 shadow-sm sm:p-6">
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Amenities</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {amenities.map(([Icon, label]) => (
                  <div key={label} className={`rounded-md border p-4 text-center ${property.amenities.includes(label) ? "border-slate-200" : "border-slate-100 opacity-40"}`}>
                    <Icon className="mx-auto h-6 w-6 text-navy" />
                    <span className="mt-2 block text-sm font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-md bg-white p-4 shadow-sm sm:p-6">
                <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Nearby</h2>
                <div className="mt-4 space-y-3">
                  {nearby.slice(0, 3).map((item) => (
                    <p key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><TrainFront className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />{item}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm sm:p-6">
                <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">House Rules</h2>
                <div className="mt-4 space-y-3">
                  {rules.map((rule) => (
                    <p key={rule} className="flex gap-2 text-sm leading-6 text-slate-600"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{rule}</p>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-md bg-navy p-4 text-white sm:p-6">
              <h2 className="font-display text-xl font-bold sm:text-2xl">Location Preview</h2>
              <div className="mt-5 flex min-h-52 items-center justify-center rounded-md border border-white/15 bg-white/10 text-center">
                <div>
                  <MapPin className="mx-auto h-10 w-10 text-saffron" />
                  <p className="mt-3 font-bold">{property.area}, {titleCase(property.city)}</p>
                  <p className="mt-1 text-sm text-white/70">Map integration can connect here when a real backend is added.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <BookingCard property={property} />
          </div>
        </div>
      </section>
    </div>
  );
}
