"use client";

import React, { useState } from "react";
import { Speaker, Mic, Sliders, Sun, Wrench, CalendarCheck, ShieldCheck, Zap } from "lucide-react";
import soundCatalog from "../../data/sound.json";
import { SoundCard } from "../../components/SoundCard";
import { useBooking } from "../../context/BookingContext";

export default function SoundSetupPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { openBookingModal } = useBooking();

  const filteredItems = soundCatalog.filter((item) => {
    if (categoryFilter === "all") return true;
    return item.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider">
          <Speaker className="w-3.5 h-3.5 text-amber-600" />
          <span>Pro Audio & Stage Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display">Sound Setup & Equipment</h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Concert PA systems, wireless microphone packages, digital mixers, ambient stage lights, and dedicated on-site sound engineers. Available as standalone rentals or paired with live music lineups.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              categoryFilter === "all"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Equipment ({soundCatalog.length})
          </button>

          <button
            onClick={() => setCategoryFilter("speakers")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              categoryFilter === "speakers"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            PA Speakers & Subs
          </button>

          <button
            onClick={() => setCategoryFilter("mics")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              categoryFilter === "mics"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Wireless Microphones
          </button>

          <button
            onClick={() => setCategoryFilter("mixer")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              categoryFilter === "mixer"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Digital Mixers
          </button>

          <button
            onClick={() => setCategoryFilter("lighting")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              categoryFilter === "lighting"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Stage Lighting
          </button>

          <button
            onClick={() => setCategoryFilter("sound engineer")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              categoryFilter === "sound engineer"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Sound Engineer
          </button>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <SoundCard key={item.id} {...item} />
        ))}
      </div>

      {/* Technical Guarantee & CTA Banner */}
      <section className="glass-panel bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Delivery & Setup Included</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">Need Full Audio Coverage?</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              All sound setups include professional transportation, cabling, speaker positioning, and live sound check.
            </p>
          </div>

          <button
            onClick={() =>
              openBookingModal({
                serviceType: "sound-setup",
              })
            }
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Customize Sound Setup</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Acoustic tuning tailored to indoor & outdoor venues</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Multi-channel digital mixing & iPad remote control</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>On-site technician available throughout event duration</span>
          </div>
        </div>
      </section>
    </div>
  );
}
