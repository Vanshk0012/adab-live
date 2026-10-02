import React from "react";
import Link from "next/link";
import { Music2, Phone, Mail, MapPin, ShieldLock } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "./SocialIcons";
import siteData from "../data/site.json";

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/80 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & About */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Music2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              ADAB <span className="text-amber-600">LIVE</span>
            </span>
          </Link>
          <p className="text-sm text-slate-600 leading-relaxed">
            {siteData.tagline}. Bringing stage energy and acoustic excellence to your unforgettable events.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={siteData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-amber-600 hover:border-amber-500/40 shadow-xs transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={siteData.socials.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-amber-600 hover:border-amber-500/40 shadow-xs transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href={siteData.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-amber-600 hover:border-amber-500/40 shadow-xs transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 font-display">Navigation</h4>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-amber-600 transition-colors">Product Overview</Link>
            </li>
            <li>
              <Link href="/live-band" className="hover:text-amber-600 transition-colors">Live Band Lineups</Link>
            </li>
            <li>
              <Link href="/sound-setup" className="hover:text-amber-600 transition-colors">Sound Equipment Packages</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact & Booking</Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 font-display">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{siteData.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{siteData.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{siteData.address}</span>
            </li>
          </ul>
        </div>

        {/* Owner Portal & Copyright */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 font-display">Management</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Authorized management area for scheduling, booking confirmations, and blocked dates.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 text-xs text-amber-700 hover:text-amber-800 border border-amber-500/30 px-3 py-2 rounded-lg bg-amber-50 shadow-xs transition-colors"
          >
            <ShieldLock className="w-3.5 h-3.5" />
            <span>Band Owner Login</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© {new Date().getFullYear()} {siteData.bandName}. All rights reserved.</div>
        <div>Crafted for Live Music & Acoustic Sound Excellence.</div>
      </div>
    </footer>
  );
}
