"use client";

import React from "react";
import Image from "next/image";
import { Speaker, Mic, Sliders, Sun, Wrench, CalendarCheck } from "lucide-react";
import { useBooking } from "../context/BookingContext";

export interface SoundCardProps {
  id: string;
  name: string;
  description: string;
  photos: string[];
  price: number;
  category: string;
}

export function SoundCard({ id, name, description, photos, price, category }: SoundCardProps) {
  const { openBookingModal } = useBooking();

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "speakers":
        return <Speaker className="w-5 h-5 text-amber-600" />;
      case "mics":
        return <Mic className="w-5 h-5 text-amber-600" />;
      case "mixer":
        return <Sliders className="w-5 h-5 text-amber-600" />;
      case "lighting":
        return <Sun className="w-5 h-5 text-amber-600" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-600" />;
    }
  };

  const primaryPhoto = photos && photos.length > 0 ? photos[0] : "/images/hero.jpg";

  return (
    <div className="glass-panel bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-amber-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={primaryPhoto}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[10px] font-bold uppercase tracking-wider shadow-xs">
              {getCategoryIcon(category)}
              <span>{category}</span>
            </span>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="p-6 pt-0 space-y-3">
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Equipment Fee</span>
            <span className="text-2xl font-extrabold text-amber-600">${price}</span>
          </div>

          <button
            onClick={() =>
              openBookingModal({
                serviceType: "sound-setup",
                soundPackageId: id,
              })
            }
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all transform active:scale-95"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Select & Book</span>
          </button>
        </div>
      </div>
    </div>
  );
}
