import React from 'react';
import { 
  ShieldCheck, 
  Menu, 
  Globe, 
  Search, 
  UserCheck, 
  HelpCircle,
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Topbar = ({
  language,
  setLanguage,
  t,
  onOpenPrivacy,
  onToggleMobileMenu,
  onOpenAssistantSearch
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & search shortcut */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Trigger */}
          <div 
            onClick={onOpenAssistantSearch}
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-100 border border-slate-200/80 text-slate-500 hover:text-slate-700 text-xs sm:text-sm cursor-pointer transition-colors max-w-xs md:max-w-sm lg:w-72"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="truncate">{t.topbar.searchPlaceholder}</span>
            <kbd className="hidden md:inline-block ml-auto text-[10px] font-semibold bg-white border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Privacy Indicator, Language Toggle, and Patient Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Privacy Indicator Pill */}
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200/70 text-teal-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs group"
            title="Click to view security and HIPAA compliance details"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium tracking-tight">
              {language === 'hi' ? 'गोपनीय और सुरक्षित' : 'HIPAA-Aligned • Encrypted'}
            </span>
            <span className="sm:hidden font-medium">Private</span>
          </button>

          {/* Language Switcher (EN / HI) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/90">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English"
            >
              <Globe className="w-3 h-3 text-slate-500" />
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="हिन्दी (Hindi)"
            >
              <span>हिन्दी</span>
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'mr'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="मराठी (Marathi Regional)"
            >
              <span>मराठी</span>
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-teal-50">
              MG
            </div>
            <div className="hidden xl:block text-left leading-tight">
              <p className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                {t.topbar.profileName}
              </p>
              <p className="text-[10px] text-teal-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {t.topbar.onlineStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
