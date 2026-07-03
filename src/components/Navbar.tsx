"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Heart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      if (typeof window !== "undefined") {
        const wishlist = JSON.parse(localStorage.getItem("pgmove_wishlist") || "[]");
        setWishlistCount(wishlist.length);
      }
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    const interval = setInterval(updateCount, 1000);
    return () => {
      window.removeEventListener("storage", updateCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Areas", href: "/#popular-areas", id: "popular-areas" },
    { label: "How It Works", href: "/#how-it-works", id: "how-it-works" },
    { label: "FAQ", href: "/#faq", id: "faq" },
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks.filter(l => l.id).map(l => l.id as string);
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the upper-middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe the top/hero area to clear active sections when at the top of the home page
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-1.5 border-b border-purple-50"
          : "bg-white py-2 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-3 group">
              <div className="h-16 w-16 overflow-hidden relative flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="PGMove Icon"
                  className="absolute top-0 left-0 w-full h-auto object-cover"
                  style={{ transform: "scale(1.8)", transformOrigin: "50% 6%" }}
                />
              </div>
              <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#1E1B2E] flex items-baseline">
                PG<span className="text-purple-600">MOVE</span><span className="text-purple-600 text-sm font-bold ml-0.5">.in</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              // Highlight based on scroll section if we're on the home page
              const isSectionActive = 
                pathname === "/" && 
                ((link.id && activeSection === link.id) || (link.href === "/" && activeSection === "home"));
              
              // Fallback to pathname check for standard pages
              const isActive = isSectionActive || (pathname === link.href && !link.id);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#") && pathname === "/") {
                      e.preventDefault();
                      const id = link.href.replace("/#", "");
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={`font-display text-sm font-semibold tracking-wide transition-colors hover:text-purple-600 ${
                    isActive ? "text-purple-600 font-bold" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Wishlist Heart Icon Badge */}
            <Link
              href="/saved"
              className="relative h-10 w-10 bg-[#F5F3FF] hover:bg-[#EDE6FF] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group shrink-0"
              title="Wishlist"
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${
                  wishlistCount > 0 || pathname === "/saved"
                    ? "fill-[#7C3AED] text-[#7C3AED] scale-110"
                    : "text-[#7C3AED] group-hover:scale-105"
                }`}
                strokeWidth={2}
              />
              {/* Count badge */}
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-[18px] w-[18px] bg-[#7C3AED] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/auth/owner/signup"
              className="text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-purple-100 hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              List Your PG <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[81px] bottom-0 bg-white z-50 overflow-y-auto animate-fade-in border-t border-gray-100 shadow-xl">
          <div className="px-4 pt-4 pb-12 space-y-1">
            {navLinks.map((link) => {
              const isSectionActive = 
                pathname === "/" && 
                ((link.id && activeSection === link.id) || (link.href === "/" && activeSection === "home"));
              const isActive = isSectionActive || (pathname === link.href && !link.id);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (link.href.startsWith("/#") && pathname === "/") {
                      e.preventDefault();
                      const id = link.href.replace("/#", "");
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={`block px-3 py-2.5 rounded-xl text-base font-semibold transition-all ${
                    isActive 
                      ? "text-purple-650 bg-purple-50/70 font-bold" 
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Mobile Drawer Heart Icon */}
            <Link
              href="/saved"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:text-red-500 hover:bg-red-55 transition-all"
            >
              <Heart className={`h-5 w-5 shrink-0 ${pathname === "/saved" ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              <span>Saved Properties</span>
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-100 px-3 flex flex-col gap-3">
              <Link
                href="/auth/owner/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center font-semibold text-white bg-purple-600 px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                List Your PG <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
