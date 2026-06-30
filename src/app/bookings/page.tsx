"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle, Clock, MessageCircle, Search, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type BookingStatus = "Pending" | "Owner Contacted" | "Cancelled";

type BookingRequest = {
  id: string;
  propertyId: string;
  propertyName: string;
  area: string;
  city: string;
  rent: number;
  ownerName: string;
  ownerPhone: string;
  tenantName: string;
  mobile: string;
  email: string;
  moveInDate: string;
  status: BookingStatus;
  createdAt: string;
};

const bookingKey = "gharstay_booking_requests";

function readBookings() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(bookingKey) ?? "[]");
    return Array.isArray(parsed) ? (parsed as BookingRequest[]) : [];
  } catch {
    return [];
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBookings(readBookings());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const updateStatus = (id: string, status: BookingStatus) => {
    const next = bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking));
    window.localStorage.setItem(bookingKey, JSON.stringify(next));
    setBookings(next);
  };

  const statusStyles: Record<BookingStatus, string> = {
    Pending: "bg-amber-50 text-amber-700",
    "Owner Contacted": "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-slate-100 text-slate-600",
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-md bg-saffron/10 px-3 py-1 text-sm font-bold text-saffron">
            <CalendarDays className="h-4 w-4" />
            Booking Tracking
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">My Booking Requests</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Track requests you send to owners, check move-in dates, and keep follow-ups organized.</p>
        </div>
        <Link href="/properties" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-saffron px-4 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 sm:w-auto">
          <Search className="h-5 w-5" />
          Find Homes
        </Link>
      </div>

      {bookings.length > 0 ? (
        <div className="mt-8 grid gap-5">
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn("inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-bold", statusStyles[booking.status])}>
                      {booking.status === "Pending" && <Clock className="h-4 w-4" />}
                      {booking.status === "Owner Contacted" && <CheckCircle className="h-4 w-4" />}
                      {booking.status === "Cancelled" && <XCircle className="h-4 w-4" />}
                      {booking.status}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">Requested {new Date(booking.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold text-navy sm:text-2xl">{booking.propertyName}</h2>
                  <p className="mt-2 text-slate-600">{booking.area}, {booking.city} - Rs.{booking.rent.toLocaleString("en-IN")}/month</p>
                  <p className="mt-2 text-sm text-slate-500">Move-in: {new Date(booking.moveInDate).toLocaleDateString("en-IN")} - Tenant: {booking.tenantName}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3 lg:w-[460px]">
                  <Link href={`/properties/${booking.propertyId}`} className="inline-flex items-center justify-center rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-navy transition-all duration-200 hover:border-saffron hover:text-saffron">
                    View Property
                  </Link>
                  <a href={`tel:${booking.ownerPhone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-md border border-saffron px-3 py-2 text-sm font-bold text-saffron transition-all duration-200 hover:bg-saffron/10">
                    <MessageCircle className="h-4 w-4" />
                    Contact
                  </a>
                  {booking.status !== "Cancelled" ? (
                    <button type="button" onClick={() => updateStatus(booking.id, booking.status === "Pending" ? "Owner Contacted" : "Pending")} className="rounded-md bg-navy px-3 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5">
                      {booking.status === "Pending" ? "Mark Contacted" : "Mark Pending"}
                    </button>
                  ) : (
                    <button type="button" onClick={() => updateStatus(booking.id, "Pending")} className="rounded-md bg-navy px-3 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5">
                      Reopen
                    </button>
                  )}
                </div>
              </div>
              {booking.status !== "Cancelled" && (
                <button type="button" onClick={() => updateStatus(booking.id, "Cancelled")} className="mt-4 inline-flex items-center justify-center rounded-md border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-50">
                  Cancel request
                </button>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-dashed border-slate-300 bg-white p-5 text-center sm:p-8">
          <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">No booking requests yet</h2>
          <p className="mt-2 text-slate-600">Send a request from any property page and it will appear here.</p>
        </div>
      )}
    </section>
  );
}
