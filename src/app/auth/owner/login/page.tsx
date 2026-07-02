"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";

export default function OwnerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Forgot password states
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setMessage("Login successful! Redirecting to owner dashboard...");
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!resetEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setMessage(`A password reset link has been sent to ${resetEmail}.`);
    setResetEmail("");
    setTimeout(() => {
      setIsResetMode(false);
      setMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-150 shadow-sm animate-scale-in">
        
        {isResetMode ? (
          <>
            {/* Header */}
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Password Reset
              </span>
              <h2 className="mt-4 text-3xl font-black text-gray-950 tracking-tight">
                Reset Host Password
              </h2>
              <p className="mt-2 text-sm text-gray-500 font-medium">
                Enter your email address to recover your account
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="mt-8 space-y-4">
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
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="suresh@example.com"
                    className="w-full text-sm font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                  />
                </div>
              </div>

              {/* Messages */}
              {error && <p className="p-3 bg-red-50 text-red-750 text-xs font-semibold rounded-xl">{error}</p>}
              {message && <p className="p-3 bg-green-50 text-green-750 text-xs font-semibold rounded-xl">{message}</p>}

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsResetMode(false);
                  setError("");
                  setMessage("");
                }}
                className="w-full text-center text-sm font-bold text-purple-600 flex items-center justify-center gap-1 hover:underline pt-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Log In
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                For PG Owners
              </span>
              <h2 className="mt-4 text-3xl font-black text-gray-950 tracking-tight">
                Owner Dashboard Login
              </h2>
              <p className="mt-2 text-sm text-gray-500 font-medium">
                Manage your listings and view incoming leads
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] uppercase font-bold text-gray-400">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setError("");
                      setMessage("");
                    }}
                    className="text-[10px] font-bold text-purple-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
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
                <span>Log In</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </form>

            <div className="text-center text-xs font-semibold text-gray-500 border-t border-gray-100 pt-4">
              New host?{" "}
              <Link href="/auth/owner/signup" className="text-purple-600 hover:underline">
                Register Here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
