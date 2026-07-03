"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLead } from "../context/LeadContext";
import { ArrowLeft, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

export default function OTPVerification() {
  const { leadData, setStep, submitLead } = useLead();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 1. Resend Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Mask mobile number for display (e.g., +91 ******4321)
  const maskedMobile = leadData.mobile
    ? `+91 ******${leadData.mobile.slice(-4)}`
    : "";

  const handleInputChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Get last typed character
    setOtp(newOtp);
    setErrorMsg("");

    // Move focus to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      // If current input is empty, clear previous and move focus back
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setErrorMsg("");
    setOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
    // TODO: Integrate real SMS OTP provider (MSG91 / Fast2SMS / Twilio) here to trigger OTP dispatch
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length < 4) {
      setErrorMsg("Please enter a valid OTP code");
      return;
    }

    if (attempts >= 3) {
      setErrorMsg("Too many attempts. Please try again later.");
      return;
    }

    setIsValidating(true);

    setTimeout(() => {
      setIsValidating(false);

      // Mock OTP Validation rule
      // Accept "1234", "123456", or "000000" as valid
      const isValidOtp =
        otpValue === "123400" || // if they filled 1234 followed by empty zeros
        otpValue.startsWith("1234") ||
        otpValue === "000000" ||
        otpValue === "123456";

      if (isValidOtp) {
        // Success: Submit lead data to context and advance to thank you screen
        submitLead(leadData);
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        if (nextAttempts >= 3) {
          setErrorMsg("Too many attempts. Please try again later.");
        } else {
          setErrorMsg("Incorrect OTP. Please try again.");
        }
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Back button to form */}
      <button
        onClick={() => setStep("form")}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-purple-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to details
      </button>

      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="mx-auto h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-black text-gray-900">OTP Code Verification</h3>
        <p className="text-sm text-gray-500">
          We have sent a verification code to <span className="font-semibold text-gray-700">{maskedMobile}</span>
        </p>
        <div className="pt-2">
          <span className="inline-block text-[11px] text-purple-750 font-bold bg-[#F5F3FF] border border-purple-100 px-3 py-1.5 rounded-xl">
            Demo Mode: Static OTP <span className="underline font-black">123456</span> is pre-filled.
          </span>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-lg font-black text-purple-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={otp.filter(Boolean).length < 4 || attempts >= 3 || isValidating}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isValidating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Verifying OTP...</span>
            </>
          ) : (
            <span>Verify &amp; Submit</span>
          )}
        </button>

        {/* Resend code option */}
        <div className="text-center text-xs font-semibold">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-purple-600 hover:text-purple-800 underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-400">Resend OTP in {timer}s</span>
          )}
        </div>
      </form>
    </div>
  );
}
