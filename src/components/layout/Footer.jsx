import React from 'react';
import { Shield, Heart, Lock, AlertCircle } from 'lucide-react';

export const Footer = ({ t, onOpenPrivacy }) => {
  return (
    <footer className="mt-12 border-t border-slate-200/80 bg-white/60 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="space-y-1">
          <p className="font-semibold text-slate-700">
            MediGuide AI — Clinical Healthcare Information Assistant
          </p>
          <p className="text-slate-500 max-w-xl">
            {t.disclaimerAlert} {t.disclaimerSub}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium">
          <button 
            onClick={onOpenPrivacy}
            className="hover:text-teal-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Privacy Architecture</span>
          </button>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-600">
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            <span>WHO & DPDP Aligned</span>
          </span>
          <span>•</span>
          <span className="text-slate-400">© 2026 MediGuide AI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
