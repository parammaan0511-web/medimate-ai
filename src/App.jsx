import React, { useState, useEffect } from 'react';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Overview } from './components/views/Overview';
import { HealthAssistant } from './components/views/HealthAssistant';
import { SymptomGuidance } from './components/views/SymptomGuidance';
import { ReportSimplifier } from './components/views/ReportSimplifier';
import { PreventiveCare } from './components/views/PreventiveCare';
import { Settings } from './components/views/Settings';
import { PrivacyModal } from './components/common/PrivacyModal';
import { ActivityDetailModal } from './components/common/ActivityDetailModal';
import { translations } from './data/translations';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('en');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [emergencyAlertOpen, setEmergencyAlertOpen] = useState(false);

  // Sync translation dictionary
  const t = translations[language] || translations.en;

  // Scroll to top upon tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenPrivacy = () => {
    setPrivacyModalOpen(true);
  };

  const handleClosePrivacy = () => {
    setPrivacyModalOpen(false);
  };

  const handleEmergencyTrigger = () => {
    setEmergencyAlertOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Overview
            t={t}
            setActiveTab={setActiveTab}
            onSelectActivity={(act) => setSelectedActivity(act)}
            onOpenPrivacy={handleOpenPrivacy}
          />
        );
      case 'assistant':
        return (
          <HealthAssistant
            t={t}
            language={language}
            onOpenPrivacy={handleOpenPrivacy}
          />
        );
      case 'symptoms':
        return (
          <SymptomGuidance
            t={t}
            language={language}
            onOpenPrivacy={handleOpenPrivacy}
          />
        );
      case 'simplifier':
        return (
          <ReportSimplifier
            t={t}
            language={language}
            onOpenPrivacy={handleOpenPrivacy}
          />
        );
      case 'preventive':
        return (
          <PreventiveCare
            t={t}
            onOpenPrivacy={handleOpenPrivacy}
          />
        );
      case 'settings':
        return (
          <Settings
            language={language}
            setLanguage={setLanguage}
            t={t}
            onOpenPrivacy={handleOpenPrivacy}
            onResetSession={() => {
              setActiveTab('overview');
            }}
          />
        );
      default:
        return (
          <Overview
            t={t}
            setActiveTab={setActiveTab}
            onSelectActivity={(act) => setSelectedActivity(act)}
            onOpenPrivacy={handleOpenPrivacy}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Prominent Medical Disclaimer Banner */}
      <DisclaimerBanner 
        t={t} 
        onEmergencyClick={handleEmergencyTrigger} 
      />

      {/* 2. Main App Layout (Sidebar + Content Workspace) */}
      <div className="flex-1 flex w-full">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          t={t}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          onOpenPrivacy={handleOpenPrivacy}
        />

        {/* Workspace Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar with Language Selector & Privacy Indicator */}
          <Topbar
            language={language}
            setLanguage={setLanguage}
            t={t}
            onOpenPrivacy={handleOpenPrivacy}
            onToggleMobileMenu={() => setIsMobileOpen(prev => !prev)}
            onOpenAssistantSearch={() => setActiveTab('assistant')}
          />

          {/* Main View Area */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>

          {/* Footer */}
          <Footer 
            t={t} 
            onOpenPrivacy={handleOpenPrivacy} 
          />
        </div>
      </div>

      {/* 3. Global Modals */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={handleClosePrivacy}
        t={t}
      />

      <ActivityDetailModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        t={t}
      />

      {/* Emergency Modal Alert if clicked */}
      {emergencyAlertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              🚨
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Emergency Medical Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                If you or someone around you is experiencing chest pain, difficulty breathing, sudden paralysis, or severe injury, please call emergency services immediately:
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <a 
                href="tel:112"
                className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                Call 112 (National Emergency Helpline)
              </a>
              <a 
                href="tel:108"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-2 transition-all"
              >
                Call 108 (Ambulance Helpline)
              </a>
            </div>
            <button
              onClick={() => setEmergencyAlertOpen(false)}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
            >
              Return to MediGuide AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
