"use client";

import React, { useState, useEffect } from "react";
import { X, Lock, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useLead, LeadData } from "../context/LeadContext";
import { BANGALORE_AREAS, BUDGET_RANGES } from "../data/mockData";
import OTPVerification from "@/components/OTPVerification";
import ThankYouScreen from "@/components/ThankYouScreen";

export default function LeadCapturePopup() {
  const { isPopupOpen, popupStep, setStep, closePopup, leadData, setLeadData } = useLead();

  console.log("PGMove: LeadCapturePopup render status:", { isPopupOpen, popupStep });

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [preferredArea, setPreferredArea] = useState("Koramangala");
  const [budget, setBudget] = useState("5000-8000");
  const [moveInDate, setMoveInDate] = useState("");
  const [email, setEmail] = useState("");
  const [companyOrCollege, setCompanyOrCollege] = useState("");

  // Validation state
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData | "global", string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Sync state with Context when pre-filled from quick enquiry form
  useEffect(() => {
    if (isPopupOpen && leadData.name) {
      setName(leadData.name);
    }
    if (isPopupOpen && leadData.mobile) {
      setMobile(leadData.mobile);
    }
  }, [isPopupOpen, leadData]);

  if (!isPopupOpen) return null;

  const validate = (): boolean => {
    const tempErrors: typeof errors = {};
    if (!name.trim()) tempErrors.name = "Full name is required";
    
    if (!mobile.trim()) {
      tempErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      tempErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!moveInDate) {
      tempErrors.moveInDate = "Please choose a move-in date";
    } else {
      const selectedDate = new Date(moveInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.moveInDate = "Move-in date cannot be in the past";
      }
    }

    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate OTP network latency
    setTimeout(() => {
      setIsLoading(false);
      
      // Update context values
      setLeadData({
        name,
        mobile,
        email,
        preferredArea,
        budget,
        moveInDate,
        companyOrCollege,
      });

      // Advance to OTP step
      setStep("otp");
    }, 1200);
  };

  const isFormValid = name.trim() && /^\d{10}$/.test(mobile) && moveInDate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Container that acts as bottom sheet on mobile, modal on desktop */}
      <div
        className={`bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col relative transition-all duration-300 ${
          popupStep === "thanks" ? "md:max-w-md" : ""
        } max-h-[92vh] md:max-h-[85vh] overflow-y-auto self-end md:self-center animate-slide-up`}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors z-20"
        >
          <X className="h-5 w-5" />
        </button>

        {popupStep === "form" && (
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 pr-6">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Get Best Price &amp; Check Availability
              </h2>
              <p className="text-xs text-purple-600 font-bold mt-1 uppercase tracking-wider flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-600 animate-ping"></span>
                Our team will contact you within 30 minutes
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendOTP} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile number"
                    className="w-full text-sm font-semibold p-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobile}</p>}
              </div>

              {/* Area & Budget split */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                    Preferred Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={preferredArea}
                    onChange={(e) => setPreferredArea(e.target.value)}
                    className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                  >
                    {BANGALORE_AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                    Budget Range <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Move-in Date */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                  Move-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={moveInDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                {errors.moveInDate && (
                  <p className="text-red-500 text-xs mt-1 font-semibold">{errors.moveInDate}</p>
                )}
              </div>

              {/* Optional Section Divider */}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-3">
                  Optional Fields
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                      Company / College
                    </label>
                    <input
                      type="text"
                      value={companyOrCollege}
                      onChange={(e) => setCompanyOrCollege(e.target.value)}
                      placeholder="Infosys / Christ College"
                      className="w-full text-sm font-semibold p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full mt-6 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending Verification OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP &amp; Verify</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {popupStep === "otp" && (
          <div className="p-6 md:p-8">
            <OTPVerification />
          </div>
        )}

        {popupStep === "thanks" && (
          <div className="p-6 md:p-8">
            <ThankYouScreen />
          </div>
        )}
      </div>
    </div>
  );
}
