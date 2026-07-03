"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "slideUp",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable reveal animation on mobile screens to prevent items being hidden until scrolled
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Map variants to CSS initial and active classes
  const getVariantStyles = () => {
    switch (variant) {
      case "fade":
        return isVisible ? "opacity-100" : "opacity-0 pointer-events-none";
      case "slideLeft":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-12 pointer-events-none";
      case "slideRight":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-12 pointer-events-none";
      case "scale":
        return isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none";
      case "slideUp":
      default:
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
