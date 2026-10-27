import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, X } from 'lucide-react';

export const PrivacyModal = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {t.privacy.tooltipTitle}
              </h3>
              <p className="text-xs text-teal-100 font-medium">
                {t.privacy.badge}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Zero Data Retention */}
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-teal-100/70 text-teal-700 shrink-0 mt-0.5">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {t.privacy.zeroRetention}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.privacy.zeroRetentionDesc}
              </p>
            </div>
          </div>

          {/* Client-Side Encryption */}
          <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-sky-100/70 text-sky-700 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {t.privacy.encryption}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.privacy.encryptionDesc}
              </p>
            </div>
          </div>

          {/* Clinical Compliance */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-slate-200/80 text-slate-700 shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {t.privacy.compliance}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.privacy.complianceDesc}
              </p>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No user tracking cookies or third-party advertising pixels</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full compliance with Digital Personal Data Protection Act (DPDP)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automatic session timeout and RAM scrub on page exit</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            MediGuide AI Security v2.4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all"
          >
            {t.privacy.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
