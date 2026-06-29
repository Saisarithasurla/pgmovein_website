"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";
import { easeOutQuart } from "@/lib/animations";

export type ToastItem = {
  id: string;
  message: string;
  type?: "success" | "info";
};

export default function Toast({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toast.type === "info" ? Info : CheckCircle;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: easeOutQuart }}
              className="mt-2 flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy shadow-[0_8px_24px_rgba(26,60,94,0.10)]"
            >
              <Icon className="h-5 w-5 text-saffron" />
              {toast.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
