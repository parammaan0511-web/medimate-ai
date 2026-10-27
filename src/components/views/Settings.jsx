import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export const Settings = ({
  language,
  setLanguage,
  t,
  onOpenPrivacy,
  onResetSession
}) => {
  const [zeroRetention, setZeroRetention] = useState(true);
  const [diagnostics, setDiagnostics] = useState(false);
  const [localEncryption, setLocalEncryption] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportData = () => {
    const dataToExport = {
      app: "MediGuide AI",
      timestamp: new Date().toISOString(),
      disclaimer: "Health information only, not a medical diagnosis.",
      session: {
        language,
        zeroRetention,
        diagnostics
      }
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mediguide_session_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Health session configuration exported successfully.");
  };

  const handleReset = () => {
    if (onResetSession) {
      onResetSession();
    }
    showToast("Demo session data cleared and restored to defaults.");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/90">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {t.settings.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Language Section */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t.settings.languageSection}
            </h3>
            <p className="text-xs text-slate-500">
              Choose the primary language for labels, disclaimers, and clinical explanations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => { setLanguage('en'); showToast("Language updated to English"); }}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              language === 'en'
                ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <p className="text-sm font-bold text-slate-900">English</p>
              <p className="text-xs text-slate-500 mt-0.5">Clinical English medical terms</p>
            </div>
            {language === 'en' && <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />}
          </button>

          <button
            onClick={() => { setLanguage('hi'); showToast("भाषा बदलकर हिन्दी कर दी गई है"); }}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              language === 'hi'
                ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <p className="text-sm font-bold text-slate-900">हिन्दी (Hindi)</p>
              <p className="text-xs text-slate-500 mt-0.5">सत्यापित नैदानिक शब्दावली</p>
            </div>
            {language === 'hi' && <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />}
          </button>

          <button
            onClick={() => { setLanguage('mr'); showToast("भाषा बदलून मराठी करण्यात आली आहे"); }}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
              language === 'mr'
                ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <p className="text-sm font-bold text-slate-900">मराठी (Marathi)</p>
              <p className="text-xs text-slate-500 mt-0.5">स्थानिक प्रादेशिक आरोग्य मार्गदर्शक</p>
            </div>
            {language === 'mr' && <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />}
          </button>
        </div>
      </Card>

      {/* Privacy & Security Section */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.settings.privacySection}
              </h3>
              <p className="text-xs text-slate-500">
                Zero data persistence and client-side isolation controls
              </p>
            </div>
          </div>
          <button
            onClick={onOpenPrivacy}
            className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline cursor-pointer"
          >
            View Architecture
          </button>
        </div>

        <div className="space-y-3.5 divide-y divide-slate-100">
          {/* Zero Retention Toggle */}
          <div className="flex items-center justify-between pt-1 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {t.settings.zeroDataToggle}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.settings.zeroDataDesc}
              </p>
            </div>
            <button
              onClick={() => setZeroRetention(!zeroRetention)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                zeroRetention ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  zeroRetention ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Local Client-Side Encryption */}
          <div className="flex items-center justify-between pt-3 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Local RAM Ephemeral Storage
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep all file parsers and prompt tokens isolated to browser memory.
              </p>
            </div>
            <button
              onClick={() => setLocalEncryption(!localEncryption)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                localEncryption ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  localEncryption ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Diagnostics Toggle */}
          <div className="flex items-center justify-between pt-3 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {t.settings.telemetryToggle}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.settings.telemetryDesc}
              </p>
            </div>
            <button
              onClick={() => setDiagnostics(!diagnostics)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                diagnostics ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  diagnostics ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Session Management */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t.settings.sessionSection}
            </h3>
            <p className="text-xs text-slate-500">
              Export and purge local demo state
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{t.settings.exportDataBtn}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>{t.settings.clearDataBtn}</span>
          </button>
        </div>
      </Card>

      {/* Regulatory Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed font-medium">
          <p className="font-bold mb-0.5">Clinical Responsibility Protocol</p>
          {t.settings.disclaimerNotice} {t.disclaimerAlert}
        </div>
      </div>
    </div>
  );
};

export default Settings;
