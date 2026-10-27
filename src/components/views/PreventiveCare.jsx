import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Syringe, 
  Smile, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Filter, 
  AlertCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Bell,
  Trash2,
  Edit2,
  X,
  RotateCcw,
  Info,
  Pill
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { mockPreventiveScreenings } from '../../data/mockData';

const DEFAULT_DEMO_REMINDERS = [
  {
    id: 'rem-1',
    title: 'Daily Hydration Goal (2.5L)',
    category: 'hydration',
    frequency: 'Daily (Morning to Evening)',
    time: '09:00 AM - 08:00 PM',
    completed: false,
    source: 'user',
    notes: 'Aim for 8-10 glasses evenly spaced throughout the workday.'
  },
  {
    id: 'rem-2',
    title: '30-Minute Brisk Walk / Zone 2 Cardio',
    category: 'wellness',
    frequency: 'Daily',
    time: '06:30 PM',
    completed: true,
    source: 'user',
    notes: 'Post-dinner brisk movement to blunt postprandial glucose spikes.'
  },
  {
    id: 'rem-3',
    title: 'Annual Comprehensive Lipid Profile Test',
    category: 'appointment',
    frequency: 'Annual',
    time: 'Nov 12, 2026 • 08:30 AM',
    completed: false,
    source: 'guideline',
    notes: 'Fasting 10-12 hours required. Dr. A. Sharma referral.'
  },
  {
    id: 'rem-4',
    title: 'Morning Vitamin D3 Supplement (Reminder Only)',
    category: 'medication',
    frequency: 'Daily with Breakfast',
    time: '08:30 AM',
    completed: false,
    source: 'user',
    notes: 'Reminder alarm only. Never alter physician-prescribed dosing.'
  }
];

export const PreventiveCare = ({ t, onOpenPrivacy }) => {
  const [activeTab, setActiveTab] = useState('reminders'); // 'reminders' | 'screenings'
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('medimate_reminders');
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_REMINDERS;
    } catch {
      return DEFAULT_DEMO_REMINDERS;
    }
  });

  const [screenings, setScreenings] = useState(mockPreventiveScreenings);
  const [filterCategory, setFilterCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('wellness');
  const [formFrequency, setFormFrequency] = useState('Daily');
  const [formTime, setFormTime] = useState('09:00 AM');
  const [formNotes, setFormNotes] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('medimate_reminders', JSON.stringify(reminders));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [reminders]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingReminder(null);
    setFormTitle('');
    setFormCategory('wellness');
    setFormFrequency('Daily');
    setFormTime('09:00 AM');
    setFormNotes('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (rem) => {
    setEditingReminder(rem);
    setFormTitle(rem.title);
    setFormCategory(rem.category);
    setFormFrequency(rem.frequency);
    setFormTime(rem.time);
    setFormNotes(rem.notes || '');
    setModalOpen(true);
  };

  const handleSaveReminder = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter a reminder title.');
      return;
    }

    if (editingReminder) {
      setReminders(prev => prev.map(r => {
        if (r.id === editingReminder.id) {
          return {
            ...r,
            title: formTitle.trim(),
            category: formCategory,
            frequency: formFrequency,
            time: formTime,
            notes: formNotes.trim()
          };
        }
        return r;
      }));
      showToast('Reminder updated successfully.');
    } else {
      const newReminder = {
        id: `rem-${Date.now()}`,
        title: formTitle.trim(),
        category: formCategory,
        frequency: formFrequency,
        time: formTime,
        notes: formNotes.trim(),
        completed: false,
        source: 'user'
      };
      setReminders(prev => [newReminder, ...prev]);
      showToast('New reminder created.');
    }

    setModalOpen(false);
  };

  const handleDeleteReminder = (id) => {
    if (window.confirm('Delete this reminder?')) {
      setReminders(prev => prev.filter(r => r.id !== id));
      showToast('Reminder removed.');
    }
  };

  const handleToggleComplete = (id) => {
    setReminders(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, completed: !r.completed };
      }
      return r;
    }));
  };

  const handleRestoreDefaults = () => {
    setReminders(DEFAULT_DEMO_REMINDERS);
    showToast('Default synthetic reminders restored.');
  };

  // Filtered Reminders
  const filteredReminders = filterCategory === 'all'
    ? reminders
    : reminders.filter(r => r.category === filterCategory);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'hydration': return Droplets;
      case 'wellness': return Activity;
      case 'appointment': return Calendar;
      case 'medication': return Pill;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.preventive.title}
            </h1>
            <Badge color="emerald" size="sm">
              USPSTF & ICMR Guidelines
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            {t.preventive.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reminders'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Personal Reminders ({reminders.length})
          </button>
          <button
            onClick={() => setActiveTab('screenings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'screenings'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinical Screenings ({screenings.length})
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* VIEW A: Configurable Reminders (CRUD) */}
      {activeTab === 'reminders' && (
        <div className="space-y-5">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterCategory('hydration')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'hydration'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Droplets className="w-3 h-3" />
                <span>Hydration</span>
              </button>
              <button
                onClick={() => setFilterCategory('wellness')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'wellness'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-3 h-3" />
                <span>Wellness</span>
              </button>
              <button
                onClick={() => setFilterCategory('appointment')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'appointment'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>Appointments</span>
              </button>
              <button
                onClick={() => setFilterCategory('medication')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  filterCategory === 'medication'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Pill className="w-3 h-3" />
                <span>Medication Alarms</span>
              </button>
            </div>

            {/* Create Reminder Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Reminder</span>
              </button>
            </div>
          </div>

          {/* Reminders List or Empty State */}
          {filteredReminders.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No Reminders Found in this Category"
              description="You have not created any reminders for this category yet. Click below to add a reminder or restore default synthetic reminders."
              actionText="Add New Reminder"
              onAction={handleOpenAddModal}
              secondaryActionText="Restore Demo Reminders"
              onSecondaryAction={handleRestoreDefaults}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredReminders.map((rem) => {
                const Icon = getCategoryIcon(rem.category);
                const isUserSource = rem.source === 'user';
                return (
                  <Card
                    key={rem.id}
                    className={`flex flex-col justify-between transition-all ${
                      rem.completed
                        ? 'border-slate-200/80 bg-slate-50/70 opacity-80'
                        : 'border-teal-200/90 bg-white shadow-xs hover:border-teal-300'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            rem.completed 
                              ? 'bg-slate-200 text-slate-600' 
                              : rem.category === 'hydration'
                              ? 'bg-sky-100 text-sky-700'
                              : rem.category === 'medication'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-teal-100 text-teal-700'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className={`text-sm font-bold ${rem.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {rem.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{rem.frequency} • {rem.time}</span>
                            </p>
                          </div>
                        </div>

                        {/* Source Badge (Clearly Distinguishing User vs AI) */}
                        <Badge color={isUserSource ? 'blue' : 'emerald'} size="sm">
                          {isUserSource ? 'User Reminder' : 'Clinical Guideline'}
                        </Badge>
                      </div>

                      {rem.notes && (
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          {rem.notes}
                        </p>
                      )}
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleToggleComplete(rem.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                          rem.completed
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{rem.completed ? 'Completed' : 'Mark Complete'}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(rem)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit reminder"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReminder(rem.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete reminder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Local Storage Disclosure */}
          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">Local Browser Storage Disclosure</p>
              <p className="text-slate-500 mt-0.5">
                Reminders are stored locally in your browser (LocalStorage) for private, zero-cloud demonstration. They do not transmit sensitive health schedules to external servers. Clearing your browser cache will reset reminders to default demo values.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW B: Clinical Screening Guidelines */}
      {activeTab === 'screenings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {screenings.map((item) => (
            <Card key={item.id} className="p-5 flex flex-col justify-between border-slate-200">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge color="emerald" size="sm">
                    {item.category.toUpperCase()}
                  </Badge>
                  <span className="text-[11px] font-bold text-slate-500">
                    {item.frequency}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.recommendation}</p>
                <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-500 flex justify-between">
                  <span>Last Checked: {item.lastDate}</span>
                  <span className="font-bold text-teal-800">Due: {item.nextDue}</span>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recommended Screening
                </span>
                <button
                  onClick={() => {
                    const newRem = {
                      id: `rem-from-screen-${Date.now()}`,
                      title: `Appointment: ${item.title}`,
                      category: 'appointment',
                      frequency: item.frequency,
                      time: item.nextDue,
                      notes: item.recommendation,
                      completed: false,
                      source: 'guideline'
                    };
                    setReminders(prev => [newRem, ...prev]);
                    setActiveTab('reminders');
                    showToast('Added to your personal reminders!');
                  }}
                  className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg font-bold border border-teal-200 transition-colors cursor-pointer"
                >
                  Schedule Reminder →
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal: Add / Edit Reminder */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingReminder ? 'Edit Reminder' : 'Add New Health Reminder'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Reminder Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="E.g., Drink 500ml water after waking up"
                  required
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="hydration">💧 Hydration</option>
                    <option value="wellness">🧘 Wellness / Fitness</option>
                    <option value="appointment">🩺 Doctor Appointment</option>
                    <option value="medication">💊 Medication Schedule</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Frequency
                  </label>
                  <select
                    value={formFrequency}
                    onChange={(e) => setFormFrequency(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="One-Time">One-Time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Scheduled Time / Target
                </label>
                <input
                  type="text"
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  placeholder="E.g., 08:30 AM / Before Breakfast"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Notes (No medical dosages or changes)
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Optional reminder details or physician check notes..."
                  rows={2}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                Notice: Medication reminders are simple time-based alarms. MediMate AI never calculates or alters prescribed doses.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreventiveCare;
