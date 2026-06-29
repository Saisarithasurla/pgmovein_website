"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Heart, Home, LogIn, Menu, UserPlus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeOutQuart, slideInRightFull, staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/areas/hyderabad", label: "Areas" },
  { href: "/saved", label: "Saved" },
  { href: "/bookings", label: "Bookings" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]));

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-200", scrolled ? "bg-white/90 shadow backdrop-blur-md" : "bg-white")}>
      <motion.nav
        role="navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutQuart }}
      >
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy sm:text-xl" onClick={() => setOpen(false)}>
            <Home className="h-6 w-6 text-saffron sm:h-7 sm:w-7" />
            GharStay
          </Link>
        </motion.div>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link py-6 text-sm font-semibold text-navy transition-all duration-200 hover:text-saffron",
                isActive(link.href) && "active text-saffron",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
          <Link href="/auth/tenant/signup" className="inline-flex items-center gap-2 rounded-md border border-saffron px-4 py-2 text-sm font-semibold text-saffron transition-all duration-200 hover:bg-saffron/10">
            <UserPlus className="h-4 w-4" />
            Create Account
          </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
          <Link href="/auth/tenant/login" className="inline-flex items-center gap-2 rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-md">
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          </motion.div>
        </div>

        <button aria-label="Open menu" className="rounded-md p-2 text-navy md:hidden" onClick={() => setOpen(true)}>
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="block">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-navy/30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
      <motion.aside
        className="fixed right-0 top-0 z-50 h-full w-[min(100vw,22rem)] overflow-y-auto bg-white p-5 shadow-2xl md:hidden"
        variants={slideInRightFull}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy" onClick={() => setOpen(false)}>
            <Home className="h-6 w-6 text-saffron" />
            GharStay
          </Link>
          <button aria-label="Close menu" className="rounded-md p-2 text-navy" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <motion.div className="flex flex-col gap-2" variants={staggerContainer} initial="hidden" animate="visible">
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={staggerItem}>
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={cn("block rounded-md px-3 py-3 font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100", isActive(link.href) && "bg-saffron/15 text-navy")}>
              {link.href === "/saved" && <Heart className="mr-2 inline h-4 w-4" />}
              {link.href === "/bookings" && <CalendarDays className="mr-2 inline h-4 w-4" />}
              {link.label}
            </Link>
            </motion.div>
          ))}
          <motion.div variants={staggerItem}>
          <Link href="/auth/tenant/login" onClick={() => setOpen(false)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-saffron px-4 py-3 font-semibold text-white transition-all duration-200">
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          </motion.div>
          <motion.div variants={staggerItem}>
          <Link href="/auth/tenant/signup" onClick={() => setOpen(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-saffron px-4 py-3 font-semibold text-saffron transition-all duration-200 hover:bg-saffron/10">
            <UserPlus className="h-4 w-4" />
            Create Account
          </Link>
          </motion.div>
        </motion.div>
      </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
