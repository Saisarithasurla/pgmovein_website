"use client";

import React, { useState } from "react";
import { X, Send, Phone, Mail, MessageCircle, CheckCircle, Building2, User } from "lucide-react";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [tab, setTab] = useState<"customer" | "owner">("customer");

  // Customer form state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!message.trim()) e.message = "Please write a message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // Show success immediately — no waiting
    setSubmitted(true);

    // Fire API in the background (non-blocking)
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone: mobile,
        email: email || null,
        city: "General",
        message,
        leadSource: "Contact Us Form - Navbar",
      }),
    }).catch(() => {
      // Silent fail
    });
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-md min-h-[540px] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-slide-up">

        {/* Header */}
        <div className="bg-white px-6 py-5 relative border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Get in Touch</h2>
          <p className="text-gray-500 text-sm mt-0.5">We typically respond within 30 minutes</p>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 w-full">
            <button
              onClick={() => setTab("customer")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                tab === "customer" ? "bg-purple-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <User className="h-3.5 w-3.5 flex-shrink-0" /> Looking for PG
            </button>
            <button
              onClick={() => setTab("owner")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                tab === "owner" ? "bg-purple-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Building2 className="h-3.5 w-3.5 flex-shrink-0" /> PG Owner
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">

          {/* ── CUSTOMER TAB ── */}
          {tab === "customer" && (
            <>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="h-14 w-14 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">Message Sent!</h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Our team will contact you on <span className="font-bold text-gray-700">+91 {mobile}</span> within 30 minutes.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-gray-500 mb-1">Fill in your details and we'll find the perfect PG for you.</p>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1">Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="10-digit number"
                        className="w-full text-sm font-semibold p-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobile}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1">Message *</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what kind of PG you are looking for..."
                      className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-100"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              )}
            </>
          )}

          {/* ── PG OWNER TAB ── */}
          {tab === "owner" && (
            <div className="space-y-3.5">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-4.5 w-4.5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm">List Your PG with Us</h3>
                    <p className="text-xs text-gray-650 mt-0.5 leading-normal">
                      Partner with <span className="font-bold text-purple-600">PGMove.in</span> for verified tenants, zero brokerage, and free listing.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold text-gray-500 text-center uppercase tracking-wider">Connect with our Agent</p>

              {/* Contact options */}
              <div className="grid gap-2.5">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919108421609?text=Hi%2C%20I%20want%20to%20list%20my%20PG%20on%20PGMove.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-green-200 bg-green-50/50 hover:bg-green-50 transition-all group"
                >
                  <div className="h-10 w-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">WhatsApp Us</p>
                    <p className="text-xs text-gray-500 mt-0.5">+91 91084 21609 · Instant reply</p>
                  </div>
                  <div className="text-green-600 font-bold text-xs flex-shrink-0 pr-1 group-hover:translate-x-0.5 transition-transform">
                    Chat →
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+919108421609"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all group"
                >
                  <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">Call Us</p>
                    <p className="text-xs text-gray-500 mt-0.5">+91 91084 21609 · Mon–Sat</p>
                  </div>
                  <div className="text-blue-600 font-bold text-xs flex-shrink-0 pr-1 group-hover:translate-x-0.5 transition-transform">
                    Call →
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:agent@pgmove.in?subject=I want to list my PG"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition-all group"
                >
                  <div className="h-10 w-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">Email Us</p>
                    <p className="text-xs text-gray-500 mt-0.5">agent@pgmove.in · Reply within 24h</p>
                  </div>
                  <div className="text-purple-600 font-bold text-xs flex-shrink-0 pr-1 group-hover:translate-x-0.5 transition-transform">
                    Mail →
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
