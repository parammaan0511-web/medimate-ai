import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  FileSpreadsheet, 
  RotateCcw,
  ArrowRight,
  FileCheck,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';

export const ReportSimplifier = ({ t, language = 'en', onOpenPrivacy }) => {
  const [analyzedReport, setAnalyzedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSampleKey, setActiveSampleKey] = useState(null);

  // Load default CBC sample upon initial mount for immediate judge demonstration
  useEffect(() => {
    handleAnalyzeSample('cbc');
  }, []);

  const handleAnalyzeSample = async (sampleKey) => {
    setActiveSampleKey(sampleKey);
    setUploadedFile(null);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleKey, language })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze synthetic report');
      }

      setAnalyzedReport(data);
    } catch (err) {
      console.error('Report simplification error:', err);
      setError(err.message || 'Failed to analyze report.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('File Too Large: Uploaded file exceeds the 5 MB limit.');
      return;
    }

    setUploadedFile(file);
    setActiveSampleKey(null);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('reportFile', file);
    formData.append('language', language);

    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze uploaded report.');
      }

      setAnalyzedReport(data);
    } catch (err) {
      console.error('File upload analysis error:', err);
      setError(err.message || 'Error processing uploaded medical file.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setAnalyzedReport(null);
    setUploadedFile(null);
    setActiveSampleKey(null);
    setError(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.simplifier.title}
            </h1>
            <Badge color="blue" size="sm">
              Diagnostic Comprehension AI
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            {t.simplifier.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenPrivacy}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold transition-all cursor-pointer border border-teal-200"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Zero Document Retention • RAM Isolated</span>
        </button>
      </div>

      {/* 2. Drag-and-Drop Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 ${
          isDragging 
            ? 'border-teal-500 bg-teal-50/70 scale-[1.01]' 
            : 'border-slate-300 hover:border-teal-400 bg-white shadow-2xs'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <div className="space-y-1 max-w-md">
          <h3 className="text-base font-bold text-slate-900">
            {t.simplifier.uploadTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.simplifier.uploadSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1">
          <label className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer">
            <span>{t.simplifier.browseFiles}</span>
            <input 
              type="file" 
              accept=".pdf,.txt,.png,.jpg,.jpeg" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e.target.files?.[0])}
            />
          </label>

          <span className="text-xs text-slate-400 font-medium">or evaluate sample reports:</span>
        </div>

        {uploadedFile && (
          <div className="mt-2 p-2.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2 text-xs text-teal-900">
            <FileCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span className="font-semibold">{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
          </div>
        )}
      </div>

      {/* 3. Judge & Demo Sample Report Quick Triggers */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Instant Pre-Verified Synthetic Sample Reports (One-Click Testing)</span>
          </h3>
          {analyzedReport && (
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Sample 1: CBC */}
          <button
            onClick={() => handleAnalyzeSample('cbc')}
            disabled={loading}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
              activeSampleKey === 'cbc'
                ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge color="teal" size="sm">Hematology</Badge>
                {activeSampleKey === 'cbc' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
              </div>
              <p className="text-sm font-bold text-slate-900 mt-1">Complete Blood Count (CBC)</p>
              <p className="text-xs text-slate-500 mt-0.5">Hemoglobin, Platelets, Ferritin, WBC</p>
            </div>
            <span className="text-[11px] font-semibold text-teal-700">Analyze Sample →</span>
          </button>

          {/* Sample 2: Lipid */}
          <button
            onClick={() => handleAnalyzeSample('lipid')}
            disabled={loading}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
              activeSampleKey === 'lipid'
                ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge color="blue" size="sm">Cardiovascular</Badge>
                {activeSampleKey === 'lipid' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
              </div>
              <p className="text-sm font-bold text-slate-900 mt-1">Fasting Lipid Profile</p>
              <p className="text-xs text-slate-500 mt-0.5">Cholesterol, HDL, LDL, Triglycerides</p>
            </div>
            <span className="text-[11px] font-semibold text-teal-700">Analyze Sample →</span>
          </button>

          {/* Sample 3: Thyroid */}
          <button
            onClick={() => handleAnalyzeSample('thyroid')}
            disabled={loading}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
              activeSampleKey === 'thyroid'
                ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge color="emerald" size="sm">Endocrinology</Badge>
                {activeSampleKey === 'thyroid' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
              </div>
              <p className="text-sm font-bold text-slate-900 mt-1">Thyroid Hormone Panel</p>
              <p className="text-xs text-slate-500 mt-0.5">TSH, Free T4, Free T3 hormones</p>
            </div>
            <span className="text-[11px] font-semibold text-teal-700">Analyze Sample →</span>
          </button>
        </div>
      </div>

      {/* 4. Error Display */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Extraction or Upload Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* 5. Loading State */}
      {loading && (
        <div className="p-10 rounded-3xl bg-white border border-slate-200 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <h4 className="text-base font-bold text-slate-800">
            Analyzing Diagnostic Biomarkers...
          </h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Extracting analytes, standard reference intervals, and generating plain-language clinical explanations.
          </p>
        </div>
      )}

      {/* 6. Extracted Biomarkers & Plain-Language Results */}
      {!loading && analyzedReport && analyzedReport.data && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {analyzedReport.data.reportTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {analyzedReport.data.labProvider} • Synthetic Clinical Demonstration
                </p>
              </div>
            </div>

            {analyzedReport.isDemo ? (
              <Badge color="amber" size="sm">
                Synthetic Standard Report
              </Badge>
            ) : (
              <Badge color="emerald" size="sm">
                Live Gemini Analysis
              </Badge>
            )}
          </div>

          {/* Biomarkers Table with Reference Range Indicators */}
          {analyzedReport.data.biomarkers?.length > 0 && (
            <Card className="p-0 overflow-hidden border-slate-200">
              <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Extracted Biomarkers & Reference Ranges
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Original units preserved
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/60 text-slate-600 text-xs font-semibold">
                    <tr>
                      <th className="py-3 px-4">Test / Biomarker</th>
                      <th className="py-3 px-4">Result Value</th>
                      <th className="py-3 px-4">Units</th>
                      <th className="py-3 px-4">Standard Reference Interval</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {analyzedReport.data.biomarkers.map((b, i) => {
                      const isNormal = b.status === 'Normal';
                      const isLow = b.status === 'Low';
                      const isHigh = b.status === 'Elevated' || b.status === 'High';
                      return (
                        <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900">{b.name}</span>
                            {b.clinicalMeaning && (
                              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                {b.clinicalMeaning}
                              </p>
                            )}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800">{b.value}</td>
                          <td className="py-3 px-4 text-slate-500">{b.unit}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono text-xs">{b.referenceRange}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isNormal
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : isLow
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : isHigh
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Plain-Language Summary Card */}
          <Card className="p-5 border-teal-200 bg-gradient-to-br from-white via-teal-50/20 to-white space-y-2">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Plain-Language Patient Translation</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              {analyzedReport.data.overallSummary}
            </p>
          </Card>

          {/* Questions for Clinician Card */}
          {analyzedReport.data.questionsForDoctor?.length > 0 && (
            <Card className="p-5 bg-slate-50 border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Questions to Ask Your Prescribing Clinician</span>
              </div>
              <ul className="space-y-2">
                {analyzedReport.data.questionsForDoctor.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {idx + 1}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Educational Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong>Clinical Advisory:</strong> {analyzedReport.data.disclaimer} Laboratory test interpretations must always be correlated with your clinical history, physical exam, and symptoms by a licensed medical provider.
            </p>
          </div>
        </div>
      )}

      {/* 7. Empty State (if no report chosen) */}
      {!loading && !analyzedReport && (
        <EmptyState
          icon={FileText}
          title="Ready to Simplify Diagnostic Results"
          description="Drop an anonymized PDF lab report above or click one of the pre-verified synthetic samples to inspect extracted biomarkers and plain-language insights."
          actionText="Load Sample Blood Test (CBC)"
          onAction={() => handleAnalyzeSample('cbc')}
        />
      )}
    </div>
  );
};

export default ReportSimplifier;
