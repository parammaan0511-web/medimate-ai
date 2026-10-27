import React, { useState } from 'react';
import { 
  HelpCircle, 
  FileText, 
  Heart, 
  BookOpen, 
  ArrowRight, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Droplets, 
  Footprints, 
  Moon, 
  Lightbulb, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Filter
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { mockRecentActivities, mockDailyWellness, mockHealthGuides } from '../../data/mockData';

export const Overview = ({
  t,
  setActiveTab,
  onSelectActivity,
  onOpenPrivacy
}) => {
  const [activities, setActivities] = useState(mockRecentActivities);
  const [filterType, setFilterType] = useState('all');

  const filteredActivities = filterType === 'all'
    ? activities
    : activities.filter(a => a.type === filterType);

  const handleClearActivities = () => {
    setActivities([]);
  };

  const handleRestoreActivities = () => {
    setActivities(mockRecentActivities);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome & Quick Stats */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-teal-600/30">
        {/* Subtle decorative circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Based Healthcare AI Assistant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {t.overview.greeting}
            </h1>
            <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
              {t.overview.subGreeting}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('symptoms')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 active:bg-teal-500 text-slate-950 font-extrabold text-xs shadow-xs transition-all cursor-pointer"
              >
                <span>🩺 Start Guided Symptom Triage Questionnaire →</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
            <div className="text-left">
              <p className="text-[11px] text-teal-200 font-medium">{t.overview.quickStats.lastCheck}</p>
              <p className="text-base font-bold text-white mt-0.5">{t.overview.quickStats.lastCheckVal}</p>
            </div>
            <div className="text-left border-l border-white/10 pl-3">
              <p className="text-[11px] text-teal-200 font-medium">{t.overview.quickStats.reportsAnalyzed}</p>
              <p className="text-base font-bold text-white mt-0.5">{t.overview.quickStats.reportsAnalyzedVal}</p>
            </div>
            <div className="text-left border-l border-white/10 pl-3">
              <p className="text-[11px] text-teal-200 font-medium">{t.overview.quickStats.wellnessScore}</p>
              <p className="text-base font-bold text-emerald-300 mt-0.5">{t.overview.quickStats.wellnessScoreVal}</p>
            </div>
            <div className="text-left border-l border-white/10 pl-3">
              <p className="text-[11px] text-teal-200 font-medium">{t.overview.quickStats.nextScreening}</p>
              <p className="text-base font-bold text-teal-200 mt-0.5">{t.overview.quickStats.nextScreeningVal}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Primary Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Healthcare Exploration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a core capability to initiate private, clinical-grade information assistance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Ask a Health Question */}
          <Card 
            hoverable 
            onClick={() => setActiveTab('assistant')}
            className="flex flex-col justify-between group border-teal-100 hover:border-teal-300 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <Badge color="teal" size="sm">
                  {t.overview.cards.ask.badge}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {t.overview.cards.ask.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {t.overview.cards.ask.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{t.overview.cards.ask.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          {/* 2. Understand a Lab Report */}
          <Card 
            hoverable 
            onClick={() => setActiveTab('simplifier')}
            className="flex flex-col justify-between group border-sky-100 hover:border-sky-300 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge color="blue" size="sm">
                  {t.overview.cards.report.badge}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {t.overview.cards.report.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {t.overview.cards.report.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>{t.overview.cards.report.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          {/* 3. Daily Wellness */}
          <Card 
            hoverable 
            onClick={() => setActiveTab('preventive')}
            className="flex flex-col justify-between group border-emerald-100 hover:border-emerald-300 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                  <Heart className="w-6 h-6" />
                </div>
                <Badge color="emerald" size="sm">
                  {t.overview.cards.wellness.badge}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t.overview.cards.wellness.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {t.overview.cards.wellness.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{t.overview.cards.wellness.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          {/* 4. Health Education */}
          <Card 
            hoverable 
            onClick={() => {
              const el = document.getElementById('education-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col justify-between group border-indigo-100 hover:border-indigo-300 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Badge color="indigo" size="sm">
                  {t.overview.cards.education.badge}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {t.overview.cards.education.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {t.overview.cards.education.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>{t.overview.cards.education.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </div>
      </div>

      {/* Two Column Section: Recent Activity & Daily Wellness Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Synthetic Activity with View Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {t.overview.recentActivityTitle}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {filteredActivities.length} logs
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {t.overview.recentActivitySub}
              </p>
            </div>

            {/* Filter Chips & Empty state toggle */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('report')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'report'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.overview.typeReport}
              </button>
              <button
                onClick={() => setFilterType('symptom')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'symptom'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.overview.typeSymptom}
              </button>
              <button
                onClick={() => setFilterType('screening')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'screening'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.overview.typeScreening}
              </button>
            </div>
          </div>

          {/* Activities List or Empty State */}
          {filteredActivities.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No Activity Logs Found"
              description="No synthetic interactions match the current filter criteria. You can reset filters or restore default demo data."
              actionText="Reset Filter"
              onAction={() => setFilterType('all')}
              secondaryActionText={activities.length === 0 ? "Restore Demo Data" : undefined}
              onSecondaryAction={handleRestoreActivities}
            />
          ) : (
            <div className="space-y-3">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-200 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge color={act.badgeColor} size="sm">
                        {act.category}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {act.timeAgo}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                      {act.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {act.summary}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <button
                      onClick={() => onSelectActivity(act)}
                      className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs rounded-xl border border-teal-200/70 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>{t.overview.viewDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-1 text-xs text-slate-400 px-1">
                <span>Showing {filteredActivities.length} simulated records</span>
                {activities.length > 0 && (
                  <button
                    onClick={handleClearActivities}
                    className="hover:text-rose-600 transition-colors underline cursor-pointer"
                  >
                    Clear Demo History (Show Empty State)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Daily Wellness & Habits Card */}
        <div className="space-y-6">
          <Card className="border-teal-100 bg-gradient-to-br from-white to-teal-50/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Daily Wellness Tracker
                  </h3>
                  <p className="text-[11px] text-slate-500">Live healthy metrics</p>
                </div>
              </div>
              <Badge color="teal" size="sm">
                Today
              </Badge>
            </div>

            {/* Vitals Progress Bars */}
            <div className="space-y-4">
              {/* Hydration */}
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1 text-sky-800">
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    Hydration Goal
                  </span>
                  <span>{mockDailyWellness.waterGlasses} / {mockDailyWellness.targetWater} glasses</span>
                </div>
                <div className="w-full bg-sky-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(mockDailyWellness.waterGlasses / mockDailyWellness.targetWater) * 100}%` }}
                  />
                </div>
              </div>

              {/* Movement */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1 text-emerald-800">
                    <Footprints className="w-3.5 h-3.5 text-emerald-600" />
                    Step Activity
                  </span>
                  <span>{mockDailyWellness.stepCount.toLocaleString()} / {mockDailyWellness.targetSteps.toLocaleString()}</span>
                </div>
                <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(mockDailyWellness.stepCount / mockDailyWellness.targetSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Sleep Score */}
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1 text-indigo-800">
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    Sleep Recovery
                  </span>
                  <span>{mockDailyWellness.sleepHours} hrs (Restorative)</span>
                </div>
                <div className="w-full bg-indigo-200/60 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[85%]" />
                </div>
              </div>
            </div>

            {/* Daily Evidence-Based Tip */}
            <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900">
              <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Physician Tip of the Day</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                {mockDailyWellness.dailyTip}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Health Education Guides Section */}
      <div id="education-section" className="pt-4 border-t border-slate-200/90">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Physician-Reviewed Health Guides
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Plain-language medical fundamentals verified against clinical guidelines
            </p>
          </div>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
            Updated Oct 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockHealthGuides.map((guide) => (
            <Card 
              key={guide.id} 
              hoverable
              className="flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge color="slate" size="sm">
                    {guide.tag}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {guide.readTime}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {guide.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {guide.snippet}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Read Full Article</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
