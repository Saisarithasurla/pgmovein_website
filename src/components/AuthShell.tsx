"use client";

import Link from "next/link";
import { Building2, CheckCircle, Home } from "lucide-react";
import { motion } from "framer-motion";
import type { InputHTMLAttributes, ReactNode } from "react";
import { easeOutQuart, staggerContainer, staggerItem } from "@/lib/animations";

export function AuthShell({ role, children }: { role: "tenant" | "owner"; children: ReactNode }) {
  const owner = role === "owner";
  const benefits = owner ? ["List unlimited properties", "Get verified tenant leads", "Manage all bookings"] : ["10,000+ verified listings", "Direct owner contact", "Clear rent and booking details"];
  return (
    <section className="grid min-h-[calc(100vh-72px)] bg-white md:grid-cols-[minmax(320px,42%)_1fr] xl:grid-cols-[44%_56%]">
      <motion.aside
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
        className={`hidden overflow-hidden bg-gradient-to-br ${owner ? "from-navy to-navy" : "from-navy to-teal"} px-8 py-10 text-white md:flex md:flex-col md:justify-start lg:px-12`}
      >
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold">
            <Home className="h-7 w-7 text-amber-200" />
            GharStay
          </Link>

          <div className="mt-10 max-w-md">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-amber-100/90">{owner ? "Owner dashboard" : "Tenant signup"}</span>
            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-md bg-white/12 ring-1 ring-white/20">
              {owner ? <Building2 className="h-9 w-9" /> : <Home className="h-9 w-9" />}
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight lg:text-4xl">{owner ? "Grow your rental income with GharStay" : "Find a verified home that feels right"}</h1>
            <p className="mt-4 text-base leading-7 text-white/78">
              {owner ? "Reach serious tenants and manage your property details from one simple account." : "Create your account to save homes, contact owners, and compare places with confidence."}
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-md">
          <motion.div className="grid gap-3" variants={staggerContainer} initial="hidden" animate="visible">
            {benefits.map((benefit) => (
              <motion.p key={benefit} variants={staggerItem} className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10"><CheckCircle className="h-5 w-5 shrink-0 text-amber-100" />{benefit}</motion.p>
            ))}
          </motion.div>
          <span className="mt-6 block text-sm text-white/65">GharStay India</span>
        </div>
      </motion.aside>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
        className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <div className="w-full max-w-md">{children}</div>
      </motion.div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  icon: React.ElementType;
  suffix?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function Field({ id, label, icon: Icon, type = "text", placeholder, suffix, className, ...inputProps }: FieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-3">
        <Icon className="h-5 w-5 shrink-0 text-saffron" />
        <input id={id} type={type} placeholder={placeholder} className={className ?? "w-full min-w-0 outline-none"} {...inputProps} />
        {suffix}
      </span>
    </label>
  );
}
