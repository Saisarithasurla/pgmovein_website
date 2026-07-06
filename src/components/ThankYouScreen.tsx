"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLead } from "../context/LeadContext";

export default function ThankYouScreen() {
  const router = useRouter();
  const { leadData, activeProperty, closePopup } = useLead();
  const [countdown, setCountdown] = useState(6);

  // Extract first name
  const firstName = leadData.name.split(" ")[0] || "there";

  // Mask mobile digits for safety
  const maskedMobile = leadData.mobile
    ? `+91 ******${leadData.mobile.slice(-4)}`
    : "";

  const propertyName = activeProperty?.name || "General Enquiry";

  // Handle immediate navigation
  const handleRedirect = () => {
    closePopup();
    router.push("/properties");
  };

  // Countdown timer — only decrements state, no side-effects
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Redirect when countdown reaches 0 — runs as a proper effect, not during render
  useEffect(() => {
    if (countdown === 0) {
      handleRedirect();
    }
  }, [countdown]);

  return (
    <div className="text-center py-6 space-y-6 flex flex-col items-center">
      {/* Animated Checkmark Wrapper */}
      <div className="relative">
        <div className="absolute inset-0 bg-green-100 rounded-full scale-125 opacity-25 animate-ping"></div>
        <CheckCircle2 className="h-16 w-16 text-green-500 fill-green-50/50 relative z-10 animate-scale-in" />
      </div>

      {/* Greeting */}
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight">
          Thank You, {firstName}! 🎉
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
          Our team will contact you shortly on <span className="font-bold text-gray-900">{maskedMobile}</span>
        </p>
      </div>

      {/* Context info box */}
      <div className="bg-purple-50/50 border border-purple-100/50 rounded-xl p-4 w-full max-w-sm text-left text-xs font-semibold space-y-2">
        <div className="flex justify-between text-gray-500">
          <span>Enquiry for:</span>
          <span className="text-purple-700 truncate max-w-[200px] text-right font-bold">
            {propertyName}
          </span>
        </div>
        <div className="flex justify-between text-gray-500 border-t border-purple-100/30 pt-2">
          <span>Expected response:</span>
          <span className="text-green-600 font-bold">Within 30 minutes</span>
        </div>
      </div>

      {/* Button & Countdown */}
      <div className="w-full space-y-4 pt-2">
        <button
          onClick={handleRedirect}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
        >
          <span>Browse More PGs</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </button>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Redirecting in {countdown}...
        </p>
      </div>
    </div>
  );
}
