"use client";

import React from "react";
import { CalendarCheck } from "lucide-react";
import { useBooking } from "../../../context/BookingContext";

export function BookNowButton({ slug, name }: { slug: string; name: string }) {
  const { openBookingModal } = useBooking();

  return (
    <button
      onClick={() =>
        openBookingModal({
          serviceType: "live-band",
          presetLineupId: slug,
        })
      }
      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 text-sm transition-all transform hover:-translate-y-0.5"
    >
      <CalendarCheck className="w-4 h-4" />
      <span>Customize & Book {name}</span>
    </button>
  );
}
