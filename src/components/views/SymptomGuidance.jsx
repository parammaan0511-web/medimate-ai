import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert, 
  PhoneCall, 
  Activity, 
  Calendar, 
  RotateCcw, 
  ArrowRight,
  Info,
  Clock,
  Thermometer,
  HeartPulse
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { detectEmergency } from '../../services/safetyEngine';

export const SymptomGuidance = ({ t, language = 'en', onOpenPrivacy }) => {
  const [concern, setConcern] = useState('');
  const [duration, setDuration] = useState('1-3-days');
  const [severity, setSeverity] = useState(4);
  const [hasFever, setHasFever] = useState(false);
  const [hasChronicCondition, setHasChronicCondition] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [guidanceResult, setGuidanceResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Instant emergency check
  const emergencyAlert = detectEmergency(concern);

  const durationOptions = [
    { id: 'acute', label: '< 24 Hours (Recent Onset)' },
    { id: '1-3-days', label: '1 - 3 Days' },
    { id: '1-2-weeks', label: '1 - 2 Weeks' },
    { id: 'chronic', label: '1+ Month (Persistent / Recurrent)' }
  ];

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!concern.trim() || concern.trim().length < 3) {
      alert('Please enter at least 3 characters describing your main health concern.');
      return;
    }

    setIsSubmitting(true);

    // If emergency detected, formulate immediate priority emergency response
    if (emergencyAlert) {
      setGuidanceResult({
        isEmergency: true,
        emergencyData: emergencyAlert
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Query backend with structured clinical context
      const contextualMessage = `Clinical Symptom Review:
Primary Concern: "${concern}"
Duration: ${duration}
Reported Severity: ${severity}/10
Associated Context: ${hasFever ? 'Fever present; ' : ''}${hasChronicCondition ? 'Preexisting chronic illness; ' : ''}${isPregnant ? 'Pregnancy; ' : ''}

Please evaluate potential non-definitive physiological causes, home monitoring protocols, and questions to ask a doctor.`;

      const res = await fetch('/api/health-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: contextualMessage,
          language,
          category: 'symptom-triage'
        })
      });

      const data = await res.json();
      setGuidanceResult({
        isEmergency: false,
        aiData: data.data,
        isDemo: data.isDemo
      });
    } catch (err) {
      console.error('Symptom guidance error:', err);
      // Fallback synthetic guidance
      setGuidanceResult({
        isEmergency: false,
        isDemo: true,
        aiData: {
          summary: `Regarding "${concern}" lasting ${duration} with moderate severity (${severity}/10): Symptoms of this duration frequently correlate with transient inflammatory, ergonomic, or viral responses. Because digital assessments cannot perform stethoscope auscultation, palpation, or blood work, this guidance is strictly educational.`,
          keyPoints: [
            'Symptom trajectory over the next 48 hours is the most informative indicator.',
            'Maintaining adequate fluid balance and rest supports baseline physiological resilience.'
          ],
          clarifyingQuestions: [
            'Has the discomfort remained steady, or does it come in sharp waves?',
            'Have you started any new supplements, foods, or medications recently?'
          ],
          recommendedActions: [
            'Record daily symptom intensity morning and night.',
            'Schedule a non-emergency consultation with your primary physician if symptoms persist beyond 5-7 days.'
          ],
          whenToSeekCare: 'Consult emergency services immediately if you develop sudden shortness of breath, chest tightness, severe pain, or loss of consciousness.',
          disclaimer: 'MediMate AI provides educational guidance, not a medical diagnosis. Never change medications without clinical consultation.'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConcern('');
    setSeverity(4);
    setDuration('1-3-days');
    setHasFever(false);
    setHasChronicCondition(false);
    setIsPregnant(false);
    setGuidanceResult(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Symptom Guidance & Clinical Triage
            </h1>
            <Badge color="teal" size="sm">
              Conservative Triage Rules
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Structured health symptom questionnaire with rule-based emergency safety checks
          </p>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form</span>
        </button>
      </div>

      {/* Emergency Red-Flag Warning (Instant Rule-Based Match) */}
      {emergencyAlert && (
        <div className="p-5 rounded-3xl bg-red-600 text-white shadow-lg space-y-3 animate-in shake duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-black text-base sm:text-lg">
              <span>🚨</span>
              <span>{emergencyAlert.title}</span>
            </div>
            <a
              href="tel:112"
              className="px-4 py-1.5 bg-white text-red-700 font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-red-50 flex items-center gap-2 shrink-0"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Call 112 / 108 Now</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed">
            {emergencyAlert.guidance}
          </p>

          <div className="p-3 bg-red-700/60 rounded-2xl text-xs space-y-1">
            <p className="font-bold uppercase tracking-wider text-red-200">
              Immediate Critical Steps:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-white">
              {emergencyAlert.actions.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] text-red-200 italic font-semibold">
            Emergency Notice: MediMate AI prioritizes acute safety above all else and cannot dispatch emergency responders. Please contact emergency services directly.
          </p>
        </div>
      )}

      {/* Guided Symptom Form */}
      <Card className="p-5 sm:p-7 space-y-5 border-teal-200/90 shadow-sm">
        <form onSubmit={handleEvaluate} className="space-y-5">
          {/* 1. Main Concern */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>1. What is your primary symptom or health concern?</span>
              <span className="text-[11px] text-slate-400 font-medium">Required</span>
            </label>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              placeholder="E.g., Dull throbbing headache with neck tension after working on the computer, no visual blurriness..."
              rows={3}
              required
              className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* 2. Duration Selector */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>2. How long have you experienced this concern?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {durationOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setDuration(opt.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    duration === opt.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Severity Scale (1 - 10) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>3. Discomfort / Severity Scale</span>
              </span>
              <span className="text-teal-700 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-black">
                {severity} / 10 ({severity <= 3 ? 'Mild' : severity <= 6 ? 'Moderate' : 'Severe'})
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 (Barely noticeable)</span>
              <span>5 (Interferes with routine)</span>
              <span>10 (Debilitating / Severe)</span>
            </div>
          </div>

          {/* 4. Relevant Optional Context */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-900">
              4. Relevant Clinical Context (Select any that apply)
            </label>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setHasFever(!hasFever)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  hasFever
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                <span>Fever (&gt; 100.4°F / 38°C)</span>
              </button>

              <button
                type="button"
                onClick={() => setHasChronicCondition(!hasChronicCondition)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  hasChronicCondition
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Known Chronic Condition (Hypertension, Diabetes)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPregnant(!isPregnant)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isPregnant
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Currently Pregnant</span>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium">
              No probability or diagnostic risk scores are presented as clinical measurements.
            </span>

            <button
              type="submit"
              disabled={isSubmitting || !concern.trim()}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                concern.trim() && !isSubmitting
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{isSubmitting ? 'Evaluating...' : 'Evaluate Symptoms'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Card>

      {/* 5. Guidance Synthesis Results */}
      {guidanceResult && !guidanceResult.isEmergency && guidanceResult.aiData && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Clinical Overview */}
          <Card className="p-5 border-teal-200 bg-gradient-to-br from-white via-teal-50/20 to-white space-y-2">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Potential Non-Definitive Considerations</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
              {guidanceResult.aiData.summary}
            </p>
          </Card>

          {/* Questions to Prepare for Doctor */}
          {guidanceResult.aiData.clarifyingQuestions?.length > 0 && (
            <Card className="p-5 bg-sky-50/50 border-sky-200 space-y-2.5">
              <div className="flex items-center gap-2 text-sky-950 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Questions to Discuss With Your Doctor</span>
              </div>
              <ul className="space-y-1.5">
                {guidanceResult.aiData.clarifyingQuestions.map((q, i) => (
                  <li key={i} className="text-xs sm:text-sm text-sky-900 flex items-start gap-2">
                    <span className="font-bold text-sky-700">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Recommended Monitoring & Safe Steps */}
          {guidanceResult.aiData.recommendedActions?.length > 0 && (
            <Card className="p-5 bg-slate-50 border-slate-200 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Evidence-Based Self-Monitoring Protocols</span>
              </div>
              <ul className="space-y-1.5">
                {guidanceResult.aiData.recommendedActions.map((act, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Red Flag Warning */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>When to Seek Immediate Emergency Attention:</span>
            </p>
            <p className="leading-relaxed">{guidanceResult.aiData.whenToSeekCare}</p>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Clinical Safety Standard:</strong> MediMate AI does not provide definitive medical diagnoses, numerical probability scores, or clinical prescriptions. Always review persisting symptoms with a licensed healthcare physician.
        </p>
      </div>
    </div>
  );
};

export default SymptomGuidance;
