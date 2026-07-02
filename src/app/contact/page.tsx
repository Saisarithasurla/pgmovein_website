"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!name || !email || mobile.length !== 10 || !message) {
      setError("Please fill in all fields (10-digit mobile number).");
      return;
    }

    setStatus("Thank you! Our support team will get in touch with you shortly.");
    setName("");
    setEmail("");
    setMobile("");
    setMessage("");
  };

  return (
    <div className="bg-[#F5F7FF] min-h-screen font-sans py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <ScrollReveal variant="fade" className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Support Centre
          </span>
          <h1 className="font-display text-4xl font-extrabold text-[#1E1B2E] tracking-tight">
            We are here to help
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-medium">
            Have questions about verified listings, onboarding your PG, or need customer assistance? Reach out to us.
          </p>
        </ScrollReveal>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Contact Form Card */}
          <ScrollReveal variant="slideRight" className="lg:col-span-6 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="font-display text-xl font-bold text-[#1E1B2E] mb-6">Send Us a Message</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Kumar"
                  className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your query or listing request here..."
                  className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                ></textarea>
              </div>

              {error && <p className="p-3 bg-red-50 text-red-750 text-xs font-semibold rounded-xl">{error}</p>}
              {status && <p className="p-3 bg-green-50 text-green-750 text-xs font-semibold rounded-xl">{status}</p>}

              <button
                type="submit"
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-775 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          </ScrollReveal>

          {/* Right Side: Info Stack */}
          <ScrollReveal variant="slideLeft" className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex gap-4">
              <div className="p-3 bg-[#F5F3FF] text-[#7C3AED] rounded-xl shrink-0 h-fit">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-base">Call Support</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Speak with customer care directly.</p>
                <p className="text-[#7C3AED] font-extrabold text-sm mt-3">+91 9000000000</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex gap-4">
              <div className="p-3 bg-[#F5F3FF] text-[#7C3AED] rounded-xl shrink-0 h-fit">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-base">Email Support</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Queries resolved in 24 hours.</p>
                <p className="text-[#7C3AED] font-extrabold text-sm mt-3">hello@pgmove.in</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex gap-4">
              <div className="p-3 bg-[#F5F3FF] text-[#7C3AED] rounded-xl shrink-0 h-fit">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-base">Corporate Office</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Sector 6, HSR Layout, <br />
                  Bangalore, KA, India - 560102
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex gap-4">
              <div className="p-3 bg-[#F5F3FF] text-[#7C3AED] rounded-xl shrink-0 h-fit">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-base">Support Hours</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Support desk call availability.</p>
                <p className="text-[#7C3AED] font-extrabold text-xs mt-3">Mon - Sat: 9am - 7pm</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
