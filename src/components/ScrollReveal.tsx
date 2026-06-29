"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { easeOutQuart } from "@/lib/animations";

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.55, delay, ease: easeOutQuart }}
    >
      {children}
    </motion.div>
  );
}
