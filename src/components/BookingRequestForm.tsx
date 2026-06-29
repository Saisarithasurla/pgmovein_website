"use client";

import { Calendar, CheckCircle, Mail, Phone, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Property } from "@/data/mockData";

const bookingKey = "gharstay_booking_requests";

function readBookings() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(bookingKey) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function BookingRequestForm({ property }: { property: Property }) {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextBooking = {
      id: `${property.id}-${Date.now()}`,
      propertyId: property.id,
      propertyName: property.name,
      area: property.area,
      city: property.city,
      rent: property.rent,
      ownerName: property.owner.name,
      ownerPhone: property.owner.phone,
      tenantName: String(form.get("tenantName") ?? ""),
      mobile: String(form.get("mobile") ?? ""),
      email: String(form.get("email") ?? ""),
      moveInDate: String(form.get("moveInDate") ?? ""),
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem(bookingKey, JSON.stringify([nextBooking, ...readBookings()]));
    setConfirmed(true);
    window.setTimeout(() => router.push("/bookings"), 1200);
  };

  if (confirmed) {
    return (
      <div className="rounded-md bg-emerald-50 p-5 text-emerald-800">
        <p className="flex items-center gap-2 font-bold">
          <CheckCircle className="h-5 w-5" />
          Booking request sent
        </p>
        <p className="mt-2 text-sm leading-6">
          The owner will contact you shortly to confirm your move-in date and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">Full Name</span>
        <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-3">
          <User className="h-5 w-5 text-saffron" />
          <input required name="tenantName" className="w-full outline-none" />
        </span>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">Mobile</span>
        <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-3">
          <Phone className="h-5 w-5 text-saffron" />
          <input required name="mobile" type="tel" inputMode="numeric" placeholder="+91" className="w-full outline-none" />
        </span>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">Email</span>
        <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-3">
          <Mail className="h-5 w-5 text-saffron" />
          <input required name="email" type="email" className="w-full outline-none" />
        </span>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">Move-in Date</span>
        <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-3">
          <Calendar className="h-5 w-5 text-saffron" />
          <input required name="moveInDate" type="date" className="w-full outline-none" />
        </span>
      </label>
      <button type="submit" className="rounded-md bg-saffron px-4 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5">
        Send Booking Request
      </button>
    </form>
  );
}
