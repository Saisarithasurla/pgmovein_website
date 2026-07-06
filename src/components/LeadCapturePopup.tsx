"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { useLead, LeadData } from "../context/LeadContext";
import { BANGALORE_AREAS, BUDGET_RANGES } from "../data/mockData";
import ThankYouScreen from "@/components/ThankYouScreen";

export default function LeadCapturePopup() {
  const { isPopupOpen, popupStep, setStep, closePopup, leadData, setLeadData, openPopup, submitLead } = useLead();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [preferredArea, setPreferredArea] = useState("Koramangala");
  const [budget, setBudget] = useState("5000-8000");
  const [moveInDate, setMoveInDate] = useState("");
  const [email, setEmail] = useState("");
  const [companyOrCollege, setCompanyOrCollege] = useState("");

  const [errors, setErrors] = useState<Partial<Record<keyof LeadData | "global", string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Global 20-second auto-popup trigger
  useEffect(() => {
    const submitted = sessionStorage.getItem("leadSubmitted") === "true";
    if (submitted) return;

    const timer = setTimeout(() => {
      const stillSubmitted = sessionStorage.getItem("leadSubmitted") === "true";
      if (!stillSubmitted) {
        openPopup("auto-time");
      }
    }, 20000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync pre-filled values from context
  useEffect(() => {
    if (isPopupOpen && leadData.name) setName(leadData.name);
    if (isPopupOpen && leadData.mobile) setMobile(leadData.mobile);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    const finalData = { name, mobile, email, preferredArea, budget, moveInDate, companyOrCollege };
    setLeadData(finalData);

    try {
      await submitLead(finalData);
    } catch (err) {
      console.error("Error submitting lead:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = name.trim() && /^\d{10}$/.test(mobile) && moveInDate;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col relative transition-all duration-300 ${
          popupStep === "thanks" ? "md:max-w-md" : ""
        } max-h-[94vh] md:max-h-[88vh] animate-slide-up`}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors z-20"
        >
          <X className="h-4 w-4" />
        </button>

        {popupStep === "form" && (
          <>
            {/* Fixed Header */}
            <div className="px-5 pt-5 pb-3 pr-10 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-lg font-black text-gray-900 tracking-tight leading-tight">
                Get Best Price &amp; Check Availability
              </h2>
              <p className="text-[11px] text-purple-600 font-bold mt-1 uppercase tracking-wider flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-600 animate-ping" />
                Our team will contact you within 30 minutes
              </p>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0">
              <form id="lead-form" onSubmit={handleSubmit} className="space-y-3">
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
                    className="w-full text-sm font-semibold p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile number"
                      className="w-full text-sm font-semibold p-2.5 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobile}</p>}
                </div>

                {/* Area & Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                      Preferred Area <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={preferredArea}
                      onChange={(e) => setPreferredArea(e.target.value)}
                      className="w-full text-sm font-semibold p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                    >
                      {BANGALORE_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
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
                      className="w-full text-sm font-semibold p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                    >
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
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
                    className="w-full text-sm font-semibold p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.moveInDate && (
                    <p className="text-red-500 text-xs mt-1 font-semibold">{errors.moveInDate}</p>
                  )}
                </div>

                {/* Optional: Email + Company inline */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Optional"
                      className="w-full text-sm font-semibold p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Company / College</label>
                    <input
                      type="text"
                      value={companyOrCollege}
                      onChange={(e) => setCompanyOrCollege(e.target.value)}
                      placeholder="Optional"
                      className="w-full text-sm font-semibold p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Sticky Footer Button — always visible */}
            <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0 bg-white rounded-b-2xl">
              <button
                type="submit"
                form="lead-form"
                disabled={!isFormValid || isLoading}
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /><span>Contacting Owner...</span></>
                ) : (
                  <><span>Contact Owner</span><ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          </>
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
