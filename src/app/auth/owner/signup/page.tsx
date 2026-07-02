"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Building, ArrowRight } from "lucide-react";

export default function OwnerSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [pgName, setPgName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name || !email || mobile.length !== 10 || !password || !pgName) {
      setError("Please fill in all fields correctly (10-digit mobile number).");
      return;
    }

    setMessage("Registration successful! Redirecting to owner dashboard...");
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-150 shadow-sm">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            For PG Owners
          </span>
          <h2 className="mt-4 text-3xl font-black text-gray-950 tracking-tight">
            List Your PG on PGMove
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Connect directly with tenants. Zero commissions, zero middlemen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Owner Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mr. Suresh Gowda"
                className="w-full text-sm font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="suresh@example.com"
                className="w-full text-sm font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Mobile Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-450 text-sm font-bold">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="9876543210"
                className="w-full text-sm font-semibold p-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          {/* PG Name */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Primary PG Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Building className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={pgName}
                onChange={(e) => setPgName(e.target.value)}
                placeholder="Sri Sai Executive PG"
                className="w-full text-sm font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Choose Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
              />
            </div>
          </div>

          {/* Errors */}
          {error && <p className="p-3 bg-red-50 text-red-750 text-xs font-semibold rounded-xl">{error}</p>}
          {message && <p className="p-3 bg-green-50 text-green-750 text-xs font-semibold rounded-xl">{message}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Register &amp; List PG</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </form>

        <div className="text-center text-xs font-semibold text-gray-500 border-t border-gray-100 pt-4">
          Already registered?{" "}
          <Link href="/auth/owner/login" className="text-purple-600 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
