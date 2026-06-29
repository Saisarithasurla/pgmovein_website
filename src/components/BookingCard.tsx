"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/data/mockData";

export default function BookingCard({ property }: { property: Property }) {
  const phoneDigits = property.owner.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(`Hi, I am interested in ${property.name} on GharStay.`);

  return (
    <aside className="rounded-md border border-slate-200 p-4 sm:p-5">
      <p className="font-display text-2xl font-bold text-navy sm:text-3xl">
        Rs.{property.rent.toLocaleString("en-IN")}
        <span className="text-base text-slate-500">/month</span>
      </p>
      <div className="mt-5 border-t border-slate-200 pt-5">
        <p className="text-sm font-semibold text-slate-500">Owner</p>
        <p className="font-bold text-navy">{property.owner.name}</p>
      </div>

      <div className="mt-6 grid gap-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
          <Link
            href={`/properties/${property.id}/book`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-saffron px-4 py-3 font-bold text-white transition-all duration-200"
          >
            <CalendarCheck className="h-5 w-5" />
            Book Now
          </Link>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <motion.a
            href={`tel:${property.owner.phone.replace(/\s/g, "")}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-saffron px-4 py-3 font-bold text-saffron transition-all duration-200 hover:bg-saffron/10"
          >
            <Phone className="h-5 w-5" />
            Call
          </motion.a>
          <motion.a
            href={`https://wa.me/${phoneDigits}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-saffron px-4 py-3 font-bold text-saffron transition-all duration-200 hover:bg-saffron/10"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </motion.a>
        </div>
      </div>
    </aside>
  );
}
