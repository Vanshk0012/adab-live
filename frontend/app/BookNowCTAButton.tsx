"use client";

import React from "react";
import { CalendarCheck } from "lucide-react";
import { useBooking } from "../context/BookingContext";

export function BookNowCTAButton({ secondary = false }: { secondary?: boolean }) {
  const { openBookingModal } = useBooking();

  if (secondary) {
    return (
      <button
        onClick={() => openBookingModal()}
        className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-base shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
      >
        <CalendarCheck className="w-5 h-5 text-amber-400 stroke-[2.5]" />
        <span>Book Your Event Now</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => openBookingModal()}
      className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
    >
      <CalendarCheck className="w-5 h-5 stroke-[2.5]" />
      <span>Book Now - Request Quote</span>
    </button>
  );
}
