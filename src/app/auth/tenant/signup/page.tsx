"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff, IndianRupee, Lock, Mail, MapPin, Phone, User, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, Field } from "@/components/AuthShell";
import { cn } from "@/lib/utils";

export default function TenantSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const passwordStrength = password.length === 0 ? "w-0" : password.length < 6 ? "w-1/3" : password.length < 10 ? "w-2/3" : "w-full";
  const passwordStrengthColor = password.length >= 10 ? "bg-green-600" : "bg-saffron";
  const passwordRules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /\d/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];
  const isPasswordValid = passwordRules.every((rule) => rule.valid);

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.sessionStorage.setItem("gharstayTenantAuth", JSON.stringify({ method: "signup", loggedInAt: new Date().toISOString() }));
    setMessage("Account created successfully. Taking you to home...");
    window.setTimeout(() => router.push("/"), 900);
  };

  const handleNext = () => {
    if (!isPasswordValid) {
      setPasswordError("Password must meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setStep(2);
  };

  return (
    <AuthShell role="tenant">
      <div className="mb-6">
        <p className="text-sm font-bold text-saffron">Step {step} of 2</p>
        <div className="mt-3 flex gap-2">{[1, 2].map((item) => <span key={item} className={cn("h-2 flex-1 rounded-full", item <= step ? "bg-saffron" : "bg-slate-200")} />)}</div>
      </div>
      <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">Create Account</h1>
      <form onSubmit={handleSignup} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
        {step === 1 ? (
          <>
            <Field id="name" label="Full Name" icon={User} />
            <Field id="mobile" label="Mobile" icon={Phone} placeholder="+91" />
            <Field id="email" label="Email" icon={Mail} type="email" />
            <Field id="password" label="Password" icon={Lock} type={show ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setPasswordError(""); }} suffix={<button aria-label="Toggle password visibility" type="button" onClick={() => setShow(!show)}>{show ? <EyeOff className="h-5 w-5 text-slate-500" /> : <Eye className="h-5 w-5 text-slate-500" />}</button>} />
            <Field id="confirm" label="Confirm Password" icon={Lock} type={show ? "text" : "password"} value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); setPasswordError(""); }} />
            {passwordError && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{passwordError}</p>}
            <div><span className="text-sm font-bold text-slate-700">Password strength</span><div className="mt-2 h-2 rounded-full bg-slate-200"><div className={cn("h-2 rounded-full transition-all duration-200", passwordStrength, passwordStrengthColor)} /></div></div>
            <div className="grid gap-1 text-xs font-semibold">
              {passwordRules.map((rule) => (
                <span key={rule.label} className={rule.valid ? "text-green-700" : "text-slate-500"}>
                  {rule.label}
                </span>
              ))}
            </div>
            <fieldset><legend className="mb-2 text-sm font-bold text-slate-700">Gender</legend><div className="flex flex-wrap gap-4 text-sm">{["Male", "Female", "Other"].map((item) => <label key={item} className="flex items-center gap-2"><input name="gender" type="radio" />{item}</label>)}</div></fieldset>
            <button type="button" onClick={handleNext} className="inline-flex items-center justify-center gap-2 rounded-md bg-saffron py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5">Next <ArrowRight className="h-5 w-5" /></button>
          </>
        ) : (
          <>
            <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">City</span><span className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-3"><MapPin className="h-5 w-5 text-saffron" /><select className="w-full outline-none">{["Hyderabad", "Bangalore", "Mumbai", "Pune", "Chennai"].map((city) => <option key={city}>{city}</option>)}</select></span></label>
            <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Looking for</span><select className="w-full rounded-md border border-slate-200 px-3 py-3 outline-none">{["PG", "Flat", "Hostel", "Room"].map((type) => <option key={type}>{type}</option>)}</select></label>
            <Field id="budget" label="Budget Range" icon={IndianRupee} placeholder="Rs. 5k-10k" />
            {message && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{message}</p>}
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-saffron py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5"><UserPlus className="h-5 w-5" />Create Account</button>
            <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-slate-600">Back</button>
          </>
        )}
        <p className="text-center text-sm text-slate-600">Already have account? <Link href="/auth/tenant/login" className="font-bold text-saffron">Login</Link></p>
      </form>
    </AuthShell>
  );
}
