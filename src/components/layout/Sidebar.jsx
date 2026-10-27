import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquareHeart, 
  FileText, 
  HeartPulse, 
  Settings as SettingsIcon,
  X,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  t,
  isMobileOpen,
  setIsMobileOpen,
  onOpenPrivacy
}) => {
  const navItems = [
    {
      id: 'overview',
      label: t.nav.overview,
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'assistant',
      label: t.nav.assistant,
      icon: MessageSquareHeart,
      badge: 'Chat AI'
    },
    {
      id: 'symptoms',
      label: t.nav.symptoms,
      icon: Stethoscope,
      badge: 'Triage'
    },
    {
      id: 'simplifier',
      label: t.nav.simplifier,
      icon: FileText,
      badge: 'OCR AI'
    },
    {
      id: 'preventive',
      label: t.nav.preventive,
      icon: HeartPulse,
      badge: 'Care 360'
    },
    {
      id: 'settings',
      label: t.nav.settings,
      icon: SettingsIcon,
      badge: null
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/90 w-64 lg:w-72">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-700 to-cyan-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                MediMate
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-800 rounded-md">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Clinical Info Companion
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer group ${
                isActive
                  ? 'bg-teal-50 text-teal-800 shadow-xs border border-teal-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-teal-700'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-teal-200/60 text-teal-900 font-bold'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/70'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Privacy Card */}
      <div className="p-3.5 border-t border-slate-100">
        <div 
          onClick={onOpenPrivacy}
          className="p-3 rounded-2xl bg-gradient-to-br from-teal-50/70 via-cyan-50/40 to-slate-50 border border-teal-100 text-left cursor-pointer hover:border-teal-200 transition-all group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Privacy Shield
            </span>
            <span className="text-[10px] font-medium text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-100 shadow-2xs">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Zero health telemetry. Local session encryption.
          </p>
          <span className="text-[11px] text-teal-700 font-semibold mt-1.5 flex items-center gap-1 group-hover:underline">
            Security Details →
          </span>
        </div>

        <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>MediGuide v1.0 MVP</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Systems Operational
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation with backdrop overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
