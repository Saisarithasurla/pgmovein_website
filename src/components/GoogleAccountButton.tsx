"use client";

import { Globe, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const demoAccounts = [
  { name: "GharStay User", email: "user@gmail.com" },
  { name: "Surla Kumar", email: "surla@gmail.com" },
  { name: "Add another account", email: "Use another Google account" },
];

export function GoogleAccountButton({ role }: { role: "tenant" | "owner" }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const chooseAccount = (account: (typeof demoAccounts)[number]) => {
    const storageKey = role === "tenant" ? "gharstayTenantAuth" : "gharstayOwnerAuth";
    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        method: "google",
        account: account.email,
        loggedInAt: new Date().toISOString(),
      }),
    );
    router.push("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 py-3 font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50"
      >
        <Globe className="h-5 w-5" />
        Continue with Google
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/40 px-4" role="dialog" aria-modal="true" aria-labelledby="google-account-title">
          <div className="w-full max-w-sm rounded-md bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-saffron">Google</p>
                <h2 id="google-account-title" className="mt-1 font-display text-2xl font-bold text-navy">
                  Choose an account
                </h2>
              </div>
              <button type="button" aria-label="Close Google account chooser" onClick={() => setOpen(false)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 divide-y divide-slate-100 rounded-md border border-slate-200">
              {demoAccounts.map((account) => (
                <button key={account.email} type="button" onClick={() => chooseAccount(account)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-slate-50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-navy">
                    <User className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-navy">{account.name}</span>
                    <span className="block text-sm text-slate-500">{account.email}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
