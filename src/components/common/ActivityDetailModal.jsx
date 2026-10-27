import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle, HelpCircle, Shield, Calendar, Clock, User } from 'lucide-react';
import Badge from './Badge';

export const ActivityDetailModal = ({ activity, onClose, t }) => {
  if (!activity) return null;

  const { title, category, date, timeAgo, details } = activity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-teal-50/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge color="teal" size="sm">
                {category}
              </Badge>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {timeAgo}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {date}
              {details?.provider && (
                <>
                  <span>•</span>
                  <span>{details.provider}</span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Findings Table or Metrics */}
          {details?.findings && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Key Recorded Biomarkers & Observations
              </h4>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100/70 text-slate-600 text-xs font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Observation</th>
                      <th className="py-2.5 px-3">Result</th>
                      {details.findings[0]?.range && <th className="py-2.5 px-3">Reference</th>}
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {details.findings.map((f, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{f.parameter}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{f.value}</td>
                        {f.range && <td className="py-2.5 px-3 text-xs text-slate-500">{f.range}</td>}
                        <td className="py-2.5 px-3 text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            f.status === 'Normal' || f.status === 'Optimal' || f.status === 'Clear'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : f.status === 'Low' || f.status === 'Elevated' || f.status === 'Attention'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AI Simplified Summary */}
          {details?.aiExplanation && (
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
              <div className="flex items-center gap-2 mb-2 text-teal-900 font-semibold text-sm">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Plain-Language Interpretation</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {details.aiExplanation}
              </p>
            </div>
          )}

          {/* Questions for Doctor */}
          {details?.questionsForDoctor && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-slate-800 font-semibold text-sm">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Questions to Ask Your Doctor</span>
              </div>
              <ul className="space-y-2">
                {details.questionsForDoctor.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {idx + 1}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medical Disclaimer Banner inside modal */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              {t.disclaimerAlert} {t.disclaimerSub}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Record ID: {activity.id} • Synthetic Demo
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;
