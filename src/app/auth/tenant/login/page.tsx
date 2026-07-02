"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Phone, ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, Field } from "@/components/AuthShell";
import { GoogleAccountButton } from "@/components/GoogleAccountButton";

export default function TenantLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Forgot password states
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const finishLogin = (method: "mobile" | "email") => {
    window.sessionStorage.setItem("gharstayTenantAuth", JSON.stringify({ method, loggedInAt: new Date().toISOString() }));
    setMessage("Login successful. Taking you to home...");
    router.push("/");
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const digits = mobile.replace(/\D/g, "");
    if (digits.length >= 10) {
      finishLogin("mobile");
      return;
    }

    if (email.trim() && password.trim()) {
      finishLogin("email");
      return;
    }

    setError("Enter a 10 digit mobile number, or use email and password.");
  };

  const handleResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!resetEmail.trim()) {
      setError("Please enter your registered email address.");
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
    <AuthShell role="tenant">
      {isResetMode ? (
        <>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">Reset Password</h1>
          <p className="mt-2 text-slate-600">Enter your email to receive a password reset link</p>
          
          <form onSubmit={handleResetPassword} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
            <Field 
              id="resetEmail" 
              label="Email Address" 
              icon={Mail} 
              type="email" 
              placeholder="you@example.com" 
              required
              value={resetEmail} 
              onChange={(event) => setResetEmail(event.target.value)} 
            />

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
            {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{message}</p>}

            <button 
              type="submit" 
              className="rounded-md bg-saffron py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Send Reset Link
            </button>

            <button 
              type="button" 
              onClick={() => {
                setIsResetMode(false);
                setError("");
                setMessage("");
              }}
              className="text-center text-sm font-bold text-navy flex items-center justify-center gap-1.5 hover:text-purple-650 transition-colors mt-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">Welcome Back</h1>
          <p className="mt-2 text-slate-600">Login to continue your home search</p>
          <form onSubmit={handleLogin} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
            <Field
              id="mobile"
              label="Mobile Number"
              icon={Phone}
              placeholder="+91 98765 43210"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR<span className="h-px flex-1 bg-slate-200" /></div>
            <Field id="email" label="Email" icon={Mail} type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Field
              id="password"
              label="Password"
              icon={Lock}
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              suffix={<button aria-label="Toggle password visibility" type="button" onClick={() => setShow(!show)}>{show ? <EyeOff className="h-5 w-5 text-slate-500" /> : <Eye className="h-5 w-5 text-slate-500" />}</button>}
            />
            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
            {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{message}</p>}
            <button type="submit" className="rounded-md bg-saffron py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5">Login</button>
            <button 
              type="button" 
              onClick={() => {
                setIsResetMode(true);
                setError("");
                setMessage("");
              }}
              className="text-center text-sm font-bold text-navy hover:text-purple-650 transition-colors"
            >
              Forgot Password?
            </button>
            <GoogleAccountButton role="tenant" />
            <p className="text-center text-sm text-slate-600">New here? <Link href="/auth/tenant/signup" className="font-bold text-saffron">Sign Up</Link></p>
          </form>
        </>
      )}
    </AuthShell>
  );
}
