import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, ChevronRight, X, ShieldAlert } from 'lucide-react';

export const DisclaimerBanner = ({ t, onEmergencyClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 flex items-center justify-between text-xs text-amber-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-semibold">{t.disclaimerAlert}</span>
        </div>
        <button 
          onClick={() => setCollapsed(false)}
          className="text-amber-700 hover:text-amber-900 underline text-xs font-medium cursor-pointer"
        >
          Expand Notice
        </button>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Medical Disclaimer" 
      className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-50 border-b border-amber-200/90 text-amber-900 px-4 py-2.5 shadow-2xs transition-all relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <span className="font-bold text-amber-950">
              {t.disclaimerAlert}
            </span>{' '}
            <span className="text-amber-800/90 hidden md:inline">
              {t.disclaimerSub}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <a
            href="tel:112"
            onClick={(e) => {
              if (onEmergencyClick) {
                e.preventDefault();
                onEmergencyClick();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg shadow-xs hover:shadow transition-all"
          >
            <PhoneCall className="w-3 h-3 animate-pulse" />
            <span>{t.emergencyBtn}</span>
          </a>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md text-amber-700 hover:text-amber-950 hover:bg-amber-100/70 transition-colors cursor-pointer"
            title="Minimize disclaimer banner"
            aria-label="Minimize disclaimer banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DisclaimerBanner;
