import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Music, Speaker, ArrowRight } from "lucide-react";
import lineups from "../../data/lineups.json";
import soundCatalog from "../../data/sound.json";

export const metadata: Metadata = {
  title: "Bookable Offerings Overview | Adab Live",
  description: "Browse Adab Live's complete catalog of live band lineups (solos, duets, trios, full band) and professional PA sound equipment packages.",
};

export default function ProductOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display">Bookable Offerings</h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Browse our live musical band lineups and professional acoustic sound packages. Select items individually or combine both in a single booking request.
        </p>
      </div>

      {/* Live Band Overview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <Music className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900 font-display">Live Band Lineups</h2>
          </div>
          <Link href="/live-band" className="text-sm font-semibold text-amber-600 hover:underline flex items-center gap-1">
            <span>View All Lineups</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lineups.map((lineup) => (
            <div key={lineup.slug} className="glass-panel bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-amber-500/40 flex flex-col justify-between space-y-4 transition-all">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">{lineup.name}</h3>
                <p className="text-xs text-amber-600 font-medium mt-1">{lineup.tagline}</p>
                <p className="text-slate-600 text-xs mt-3 line-clamp-3 leading-relaxed">{lineup.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starting From</span>
                  <span className="text-lg font-bold text-amber-600">${lineup.basePrice}</span>
                </div>
                <Link
                  href={`/live-band/${lineup.slug}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sound Equipment Overview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <Speaker className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900 font-display">Sound Setup Packages</h2>
          </div>
          <Link href="/sound-setup" className="text-sm font-semibold text-amber-600 hover:underline flex items-center gap-1">
            <span>View Sound Equipment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {soundCatalog.slice(0, 3).map((item) => (
            <div key={item.id} className="glass-panel bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-amber-500/40 flex flex-col justify-between space-y-4 transition-all">
              <div>
                <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display mt-3">{item.name}</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">{item.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Fee</span>
                  <span className="text-lg font-bold text-amber-600">${item.price}</span>
                </div>
                <Link
                  href="/sound-setup"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
