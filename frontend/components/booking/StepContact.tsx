"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BookingFormData } from "./BookingModal";
import { User, Phone, Mail, MessageSquare, CheckSquare } from "lucide-react";

export interface StepContactProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export function StepContact({ register, errors }: StepContactProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 font-display">Step 5: Contact Information</h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Provide your contact details so the band owner can send your booking confirmation.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("contact.name")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
          {errors.contact?.name && (
            <p className="text-xs text-red-500 mt-1">{errors.contact.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Phone / WhatsApp Number *</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("contact.phone")}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
            />
            {errors.contact?.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.contact.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("contact.email")}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
            />
            {errors.contact?.email && (
              <p className="text-xs text-red-500 mt-1">{errors.contact.email.message}</p>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>Special Requests / Song Preferences / Notes (Optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about your event theme, song requests, or stage requirements..."
            {...register("contact.notes")}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Custom Quote Request Checkbox */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <input
            type="checkbox"
            id="customQuoteRequested"
            {...register("contact.customQuoteRequested")}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
          />
          <label htmlFor="customQuoteRequested" className="text-xs font-semibold text-slate-800 cursor-pointer">
            Request a custom quote for unlisted equipment or extended schedule requirements
          </label>
        </div>

        {/* Honeypot hidden input */}
        <input
          type="text"
          {...register("contact.hp")}
          className="hidden opacity-0 pointer-events-none w-0 h-0"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
