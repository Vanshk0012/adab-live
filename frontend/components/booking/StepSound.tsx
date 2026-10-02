"use client";

import React from "react";
import { Speaker, CheckCircle2, Wrench } from "lucide-react";
import soundCatalog from "../../data/sound.json";

export interface StepSoundProps {
  soundPackageId?: string;
  soundAddonIds: string[];
  onSelectPackage: (id: string) => void;
  onToggleAddon: (id: string) => void;
}

export function StepSound({
  soundPackageId,
  soundAddonIds,
  onSelectPackage,
  onToggleAddon,
}: StepSoundProps) {
  const paPackages = soundCatalog.filter((s) => s.category.toLowerCase() === "speakers");
  const addons = soundCatalog.filter((s) => s.category.toLowerCase() !== "speakers");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 font-display">Step 3: Sound & Stage Setup</h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Choose a primary PA system package and optional audio engineering add-ons.
        </p>
      </div>

      {/* PA Packages */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Primary PA System Package:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paPackages.map((pkg) => {
            const isSelected = soundPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-amber-50/80 border-amber-500 shadow-md shadow-amber-500/10"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 font-display">{pkg.name}</span>
                    <span className="text-xs font-bold text-amber-600">${pkg.price}</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audio & Stage Add-ons */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Sound Equipment & Technician Add-ons:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {addons.map((addon) => {
            const isSelected = soundAddonIds.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddon(addon.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? "bg-amber-50/80 border-amber-500 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{addon.name}</span>
                    <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {addon.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{addon.description}</p>
                  <div className="text-xs font-extrabold text-amber-600 pt-1">+${addon.price}</div>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                    isSelected ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
