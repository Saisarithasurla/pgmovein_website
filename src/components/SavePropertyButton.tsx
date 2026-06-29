"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const savedKey = "gharstay_saved_properties";

function readSaved() {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(savedKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export default function SavePropertyButton({
  propertyId,
  className,
  compact = false,
}: {
  propertyId: string;
  className?: string;
  compact?: boolean;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(propertyId));
  }, [propertyId]);

  const toggleSaved = () => {
    const current = readSaved();
    const next = current.includes(propertyId) ? current.filter((id) => id !== propertyId) : [...current, propertyId];
    window.localStorage.setItem(savedKey, JSON.stringify(next));
    setSaved(next.includes(propertyId));
    window.dispatchEvent(new Event("gharstay:saved-updated"));
  };

  return (
    <motion.button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved properties" : "Save property"}
      onClick={toggleSaved}
      whileTap={{ scale: 0.75 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border font-bold transition-all duration-200 hover:-translate-y-0.5",
        saved ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white text-navy hover:border-saffron hover:text-saffron",
        compact ? "h-10 w-10" : "px-4 py-3",
        className,
      )}
    >
      <motion.span animate={saved ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.4 }}>
        <Heart className={cn("h-5 w-5", saved && "fill-current")} />
      </motion.span>
      {!compact && <span>{saved ? "Saved" : "Save"}</span>}
    </motion.button>
  );
}
