"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BookingFormData } from "./BookingModal";
import { Calendar, Clock, MapPin, Users, Building } from "lucide-react";

export interface StepEventProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export function StepEvent({ register, errors }: StepEventProps) {
  const eventTypes = [
    "Wedding Reception",
    "Wedding Ceremony & Cocktail",
    "Corporate Gala",
    "Private Dinner / Party",
    "Birthday Celebration",
    "Festival / Public Concert",
    "Other Special Event",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 font-display">Step 4: Event Details</h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Specify your event logistics so we can verify schedule availability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Event Type */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Event Type *
          </label>
          <select
            {...register("event.eventType")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.event?.eventType && (
            <p className="text-xs text-red-500 mt-1">{errors.event.eventType.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Event Date *</span>
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("event.date")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
          {errors.event?.date && (
            <p className="text-xs text-red-500 mt-1">{errors.event.date.message}</p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Start Time *</span>
          </label>
          <input
            type="time"
            {...register("event.time")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
          {errors.event?.time && (
            <p className="text-xs text-red-500 mt-1">{errors.event.time.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Performance Duration (Hours) *
          </label>
          <select
            {...register("event.durationHours", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          >
            <option value={2}>2 Hours</option>
            <option value={3}>3 Hours (Standard Base)</option>
            <option value={4}>4 Hours (+15% extra hour charge)</option>
            <option value={5}>5 Hours (+30% extra hour charge)</option>
            <option value={6}>6 Hours (+45% extra hour charge)</option>
          </select>
          {errors.event?.durationHours && (
            <p className="text-xs text-red-500 mt-1">{errors.event.durationHours.message}</p>
          )}
        </div>

        {/* Expected Guests */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>Expected Guests *</span>
          </label>
          <input
            type="number"
            min={1}
            placeholder="e.g. 150"
            {...register("event.expectedGuests", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
          {errors.event?.expectedGuests && (
            <p className="text-xs text-red-500 mt-1">{errors.event.expectedGuests.message}</p>
          )}
        </div>

        {/* Venue Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-amber-600" />
            <span>Venue / Location Name *</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Grand Horizon Ballroom"
            {...register("event.venue")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
          {errors.event?.venue && (
            <p className="text-xs text-red-500 mt-1">{errors.event.venue.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>City / Region *</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Music City, CA"
            {...register("event.city")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
          {errors.event?.city && (
            <p className="text-xs text-red-500 mt-1">{errors.event.city.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
