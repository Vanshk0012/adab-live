"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  ShieldCheck,
  Calendar,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  User,
  Phone,
  Mail,
  MapPin,
  Trash2,
  PlusCircle,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import { FirestoreBookingDoc } from "@/lib/bookingsService";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"bookings" | "blocked-dates">("bookings");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookings, setBookings] = useState<FirestoreBookingDoc[]>([]);
  const [blockedDates, setBlockedDates] = useState<{ date: string; reason: string }[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingBlocked, setLoadingBlocked] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<FirestoreBookingDoc | null>(null);

  // New blocked date form state
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");
  const [blockError, setBlockError] = useState<string | null>(null);

  // Check auth cookie on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCookie = document.cookie.includes("adab_admin_authenticated=true");
      if (!hasCookie) {
        router.push("/admin/login");
      }
    }
  }, [router]);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`/api/admin/bookings?status=${statusFilter}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch admin bookings:", err);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Fetch blocked dates
  const fetchBlockedDates = async () => {
    setLoadingBlocked(true);
    try {
      const res = await fetch("/api/blocked-dates");
      const data = await res.json();
      setBlockedDates(data.blockedDates || []);
    } catch (err) {
      console.error("Failed to fetch blocked dates:", err);
    } finally {
      setLoadingBlocked(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "confirmed" | "declined") => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking status");
      }

      // Refresh list & blocked dates
      await fetchBookings();
      await fetchBlockedDates();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message || "Error updating status");
    }
  };

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlockError(null);

    if (!newBlockedDate || !newBlockedReason) {
      setBlockError("Please select a date and enter a reason.");
      return;
    }

    try {
      const res = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newBlockedDate, reason: newBlockedReason }),
      });

      if (!res.ok) throw new Error("Failed to block date");

      setNewBlockedDate("");
      setNewBlockedReason("");
      await fetchBlockedDates();
    } catch (err: any) {
      setBlockError(err.message || "Error blocking date");
    }
  };

  const handleRemoveBlockedDate = async (dateStr: string) => {
    try {
      const res = await fetch(`/api/admin/blocked-dates?date=${dateStr}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to unblock date");

      await fetchBlockedDates();
    } catch (err: any) {
      alert(err.message || "Error unblocking date");
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth).catch(() => {});
    }
    document.cookie = "adab_admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const declinedCount = bookings.filter((b) => b.status === "declined").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Owner Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">Booking Requests & Availability</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 border border-slate-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Requests</div>
          <div className="text-2xl font-extrabold text-slate-900 font-display">{bookings.length}</div>
        </div>

        <div className="glass-panel bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/50 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending Review</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-display">{pendingCount}</div>
        </div>

        <div className="glass-panel bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmed</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-display">{confirmedCount}</div>
        </div>

        <div className="glass-panel bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Declined</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-600 font-display">{declinedCount}</div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 gap-4">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === "bookings"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Booking Requests
          </button>
          <button
            onClick={() => setActiveTab("blocked-dates")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "blocked-dates"
                ? "border-amber-600 text-amber-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Blocked Dates Manager ({blockedDates.length})</span>
          </button>
        </div>

        {activeTab === "bookings" ? (
          /* TAB 1: BOOKINGS TABLE */
          <div className="space-y-4">
            {/* Status Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Status Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-amber-500 shadow-xs"
                >
                  <option value="all">All Statuses ({bookings.length})</option>
                  <option value="pending">Pending ({pendingCount})</option>
                  <option value="confirmed">Confirmed ({confirmedCount})</option>
                  <option value="declined">Declined ({declinedCount})</option>
                </select>
              </div>
            </div>

            {loadingBookings ? (
              <div className="p-12 text-center text-slate-500 text-xs">Loading booking requests...</div>
            ) : bookings.length === 0 ? (
              <div className="p-12 glass-panel bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                No booking requests found for the selected filter.
              </div>
            ) : (
              <div className="glass-panel bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Event Type</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Estimate</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 text-slate-900">
                            <div className="font-bold">{booking.event.date}</div>
                            <div className="text-[11px] text-slate-500">{booking.event.time} ({booking.event.durationHours} hrs)</div>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-slate-900">{booking.contact.name}</div>
                            <div className="text-[11px] text-slate-500">{booking.contact.phone}</div>
                          </td>

                          <td className="p-4 text-slate-700">
                            <div>{booking.event.eventType}</div>
                            <div className="text-[11px] text-slate-400">{booking.event.venue}, {booking.event.city}</div>
                          </td>

                          <td className="p-4">
                            <span className="capitalize font-semibold text-slate-800">
                              {booking.serviceType}
                            </span>
                          </td>

                          <td className="p-4 font-bold text-amber-600">
                            ${booking.estimateTotal}
                          </td>

                          <td className="p-4">
                            {booking.status === "confirmed" && (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase text-[10px]">
                                Confirmed
                              </span>
                            )}
                            {booking.status === "declined" && (
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-bold uppercase text-[10px]">
                                Declined
                              </span>
                            )}
                            {booking.status === "pending" && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold uppercase text-[10px]">
                                Pending Review
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {booking.status !== "confirmed" && (
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-xs transition-colors"
                              >
                                Confirm
                              </button>
                            )}

                            {booking.status !== "declined" && (
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "declined")}
                                className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-red-500 hover:text-white text-slate-700 font-bold text-[11px] transition-colors"
                              >
                                Decline
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* TAB 2: BLOCKED DATES MANAGER */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add Blocked Date Form */}
            <div className="glass-panel bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs h-fit">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-600" />
                <span>Block a Date</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Manually block dates for personal holidays, private rehearsals, or external bookings.
              </p>

              {blockError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {blockError}
                </div>
              )}

              <form onSubmit={handleAddBlockedDate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    value={newBlockedDate}
                    onChange={(e) => setNewBlockedDate(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Reason / Note *
                  </label>
                  <input
                    type="text"
                    value={newBlockedReason}
                    onChange={(e) => setNewBlockedReason(e.target.value)}
                    placeholder="e.g. Private Holiday Off"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
                >
                  Block This Date
                </button>
              </form>
            </div>

            {/* Blocked Dates List */}
            <div className="md:col-span-2 glass-panel bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 font-display">Unavailable & Blocked Dates</h3>

              {loadingBlocked ? (
                <div className="p-8 text-center text-xs text-slate-500">Loading blocked dates...</div>
              ) : blockedDates.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">No blocked dates currently recorded.</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {blockedDates.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>{item.date}</span>
                        </div>
                        <div className="text-slate-500 text-[11px]">{item.reason}</div>
                      </div>

                      <button
                        onClick={() => handleRemoveBlockedDate(item.date)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Unblock Date"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-900 space-y-6 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Booking Details</span>
                <h3 className="text-2xl font-bold font-display text-slate-900">{selectedBooking.id}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Estimate Total</span>
                <span className="text-2xl font-extrabold text-amber-600">${selectedBooking.estimateTotal}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-2">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Customer Contact</span>
                </div>
                <div>• Name: <span className="font-semibold text-slate-900">{selectedBooking.contact.name}</span></div>
                <div>• Phone: <span className="font-semibold text-slate-900">{selectedBooking.contact.phone}</span></div>
                <div>• Email: <span className="font-semibold text-slate-900">{selectedBooking.contact.email}</span></div>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Event Logistics</span>
                </div>
                <div>• Date: <span className="font-semibold text-slate-900">{selectedBooking.event.date}</span> at {selectedBooking.event.time}</div>
                <div>• Duration: <span className="font-semibold text-slate-900">{selectedBooking.event.durationHours} hours</span></div>
                <div>• Type: <span className="font-semibold text-slate-900">{selectedBooking.event.eventType}</span></div>
                <div>• Location: <span className="font-semibold text-slate-900">{selectedBooking.event.venue}, {selectedBooking.event.city}</span></div>
              </div>
            </div>

            {selectedBooking.contact.notes && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-900 uppercase text-[10px]">Customer Notes & Requests:</div>
                <div className="text-slate-800 leading-relaxed">{selectedBooking.contact.notes}</div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              {selectedBooking.status !== "confirmed" && (
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, "confirmed")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Confirm Request
                </button>
              )}

              {selectedBooking.status !== "declined" && (
                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, "declined")}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-red-500 hover:text-white text-slate-700 font-bold text-xs transition-all"
                >
                  Decline Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
