"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music2, Menu, X, CalendarCheck } from "lucide-react";
import { NavDropdown } from "./NavDropdown";
import { useBooking } from "../context/BookingContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBookingModal } = useBooking();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product Overview" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 backdrop-blur-xl bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Music2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors font-display">
              ADAB <span className="text-amber-600">LIVE</span>
            </span>
            <span className="block text-[10px] text-slate-500 tracking-widest uppercase font-sans">
              Music & Sound Production
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/" ? "text-amber-600 font-bold" : "text-slate-600 hover:text-amber-600"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/about" ? "text-amber-600 font-bold" : "text-slate-600 hover:text-amber-600"
            }`}
          >
            About
          </Link>

          {/* Product Dropdown */}
          <NavDropdown />

          <Link
            href="/contact"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/contact" ? "text-amber-600 font-bold" : "text-slate-600 hover:text-amber-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openBookingModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-full text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Book Now</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dropdown border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                pathname === link.href ? "bg-amber-500/10 text-amber-700 font-semibold" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="text-xs uppercase text-amber-700 px-4 font-semibold tracking-wider">Services</div>
            <Link
              href="/live-band"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-amber-600"
            >
              • Live Music Band
            </Link>
            <Link
              href="/sound-setup"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm text-slate-600 hover:text-amber-600"
            >
              • Sound Setup & Audio Engineering
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
