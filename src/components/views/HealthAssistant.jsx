import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  Sparkles, 
  HelpCircle, 
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Loader2,
  AlertTriangle,
  Info,
  Activity,
  Trash2,
  PhoneCall,
  User,
  Bot,
  ExternalLink
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { detectEmergency } from '../../services/safetyEngine';
import { mockStarterPrompts } from '../../data/mockData';

export const HealthAssistant = ({ t, language = 'en', onOpenPrivacy }) => {
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: language === 'hi' 
        ? "नमस्ते! मैं मेडीमेट एआई (MediMate AI) स्वास्थ्य सूचना सहायक हूँ। आप मुझसे सामान्य स्वास्थ्य प्रश्न, दवाओं के उपयोग के सिद्धांत या लक्षणों के बारे में पूछ सकते हैं। मैं स्पष्टीकरण के लिए प्रश्न पूछूँगा और नैदानिक मार्गदर्शन प्रदान करूँगा।"
        : language === 'mr'
        ? "नमस्कार! मी मेडीमेट एआई (MediMate AI) आरोग्य माहिती सहाय्यक आहे. आपण मला सामान्य आरोग्य प्रश्न, औषधांचे नियम किंवा लक्षणांविषयी विचारू शकता."
        : "Hello! I am your MediMate AI Clinical Information Assistant. You can ask about general symptoms, laboratory test concepts, or medication safety principles. I provide evidence-based context, ask clarifying questions, and highlight when to consult a licensed clinician.",
      structuredData: null,
      isDemo: false
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeEmergencyAlert, setActiveEmergencyAlert] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeEmergencyAlert]);

  // Check backend server status
  useEffect(() => {
    let isMounted = true;
    async function checkServer() {
      try {
        const res = await fetch('/api/health-status');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setServerStatus(data);
        }
      } catch (err) {
        console.warn('Backend status check failed:', err);
      }
    }
    checkServer();
    return () => { isMounted = false; };
  }, []);

  // Handle message submission
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    if (query.length < 3) {
      alert('Please enter at least 3 characters for your health question.');
      return;
    }

    if (query.length > 1500) {
      alert('Inquiry exceeds maximum permitted length of 1,500 characters.');
      return;
    }

    // 1. Independent Client-Side Emergency Detection
    const emergencyCheck = detectEmergency(query);
    if (emergencyCheck) {
      setActiveEmergencyAlert(emergencyCheck);
    } else {
      setActiveEmergencyAlert(null);
    }

    const userMessageId = `user-${Date.now()}`;
    const userMsg = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    setLastFailedMessage(null);

    try {
      const response = await fetch('/api/health-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          category: 'clinical-assistant'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      // Check if server safety check also detected an emergency
      if (data.emergencyAlert) {
        setActiveEmergencyAlert(data.emergencyAlert);
      }

      const aiMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.data?.summary || 'Response generated.',
        structuredData: data.data,
        isDemo: data.isDemo,
        demoNotice: data.demoNotice,
        model: data.model || serverStatus?.model || 'gemini-2.5-flash',
        emergencyAlert: data.emergencyAlert || emergencyCheck
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setLastFailedMessage(query);

      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        text: `Network or Service Error: ${err.message || 'Failed to connect to MediMate AI server.'}`,
        canRetry: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history? This cannot be undone.')) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "Chat cleared. What health topic or symptom would you like to explore next?",
          structuredData: null,
          isDemo: false
        }
      ]);
      setActiveEmergencyAlert(null);
      setLastFailedMessage(null);
    }
  };

  const suggestedFollowUps = [
    "What specific clarifying questions should I ask my doctor?",
    "What lifestyle or dietary adjustments are evidence-based for this?",
    "What red flag symptoms should prompt emergency care?"
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header with Status Pill and Clear Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.assistant.title}
            </h1>
            {serverStatus?.isLiveGeminiEnabled ? (
              <Badge color="emerald" size="sm">
                Live Gemini API ({serverStatus.model})
              </Badge>
            ) : (
              <Badge color="amber" size="sm">
                Demo Mode (API Key Required)
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {t.assistant.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Clear current conversation"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Clear Chat</span>
          </button>

          <button
            onClick={onOpenPrivacy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold transition-all cursor-pointer border border-teal-200"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">HIPAA Privacy Protocol</span>
            <span className="sm:hidden">Privacy</span>
          </button>
        </div>
      </div>

      {/* 2. Independent Emergency Warning Banner (Appears if emergency red flag detected) */}
      {activeEmergencyAlert && (
        <div className="p-4 rounded-2xl bg-red-600 text-white shadow-md animate-in slide-in-from-top duration-300 space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base">
              <span className="text-xl">🚨</span>
              <span>{activeEmergencyAlert.title}</span>
            </div>
            <a
              href="tel:112"
              className="px-3.5 py-1 bg-white text-red-700 font-extrabold text-xs rounded-xl shadow-xs hover:bg-red-50 flex items-center gap-1.5 shrink-0"
            >
              <PhoneCall className="w-3 h-3 animate-pulse" />
              <span>Call 112 / 108</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-red-100 leading-relaxed font-medium">
            {activeEmergencyAlert.guidance}
          </p>

          <div className="p-3 bg-red-700/60 rounded-xl space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-red-200">
              Immediate Critical Actions:
            </p>
            <ul className="text-xs text-white space-y-1 list-disc list-inside">
              {activeEmergencyAlert.actions.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] text-red-200 font-semibold italic">
            Notice: MediMate AI cannot and does not contact emergency medical services or dispatch ambulances. Please contact local emergency services immediately.
          </p>
        </div>
      )}

      {/* 3. Main Chat Scroll Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
        {/* Chat History Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 space-y-3 ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-tr-xs shadow-xs'
                      : msg.isError
                      ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {/* Sender & Timestamp */}
                  <div className="flex items-center justify-between gap-3 text-[11px] opacity-75 font-medium border-b pb-1.5 border-current/15">
                    <span>{isUser ? 'You (Patient)' : 'MediMate Clinical Assistant'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Demo Mode Notice Badge */}
                  {msg.isDemo && (
                    <div className="p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{msg.demoNotice || 'Demo Mode: Synthetic demonstration response.'}</span>
                    </div>
                  )}

                  {/* Main Text Content */}
                  <div className={`text-sm leading-relaxed whitespace-pre-line ${isUser ? 'text-white' : 'text-slate-800'}`}>
                    {msg.text}
                  </div>

                  {/* Structured Clinical Sections (If Assistant Structured Data exists) */}
                  {msg.structuredData && (
                    <div className="space-y-3 pt-2 text-slate-800">
                      {/* Key Points */}
                      {msg.structuredData.keyPoints?.length > 0 && (
                        <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5">
                          <p className="text-xs font-bold text-teal-800 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-teal-600" />
                            <span>Key Clinical Considerations</span>
                          </p>
                          <ul className="text-xs text-slate-700 space-y-1">
                            {msg.structuredData.keyPoints.map((pt, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Clarifying Questions */}
                      {msg.structuredData.clarifyingQuestions?.length > 0 && (
                        <div className="p-3 bg-sky-50 rounded-xl border border-sky-200/70 space-y-1.5">
                          <p className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                            <span>Clarifying Questions for Context</span>
                          </p>
                          <ul className="text-xs text-sky-900 space-y-1">
                            {msg.structuredData.clarifyingQuestions.map((q, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="font-bold text-sky-700">{i + 1}.</span>
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommended Safe Next Steps */}
                      {msg.structuredData.recommendedActions?.length > 0 && (
                        <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/70 space-y-1.5">
                          <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Safe Next Steps</span>
                          </p>
                          <ul className="text-xs text-emerald-900 space-y-1">
                            {msg.structuredData.recommendedActions.map((act, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-700 font-bold">✓</span>
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* When to Seek Immediate Care */}
                      {msg.structuredData.whenToSeekCare && (
                        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-950 text-xs space-y-1">
                          <p className="font-bold flex items-center gap-1.5 text-rose-800">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>When to Seek Immediate Care</span>
                          </p>
                          <p className="leading-relaxed">{msg.structuredData.whenToSeekCare}</p>
                        </div>
                      )}

                      {/* Educational Disclaimer */}
                      <p className="text-[11px] text-slate-500 italic pt-1">
                        {msg.structuredData.disclaimer || 'MediMate AI provides health information, not a medical diagnosis.'}
                      </p>
                    </div>
                  )}

                  {/* Retry Button on Error */}
                  {msg.canRetry && (
                    <button
                      onClick={handleRetry}
                      className="mt-2 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retry Request</span>
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                <span>Formulating clinical synthesis & safety checks...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Follow-Up Prompt Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            Suggestions:
          </span>
          {suggestedFollowUps.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isTyping}
              className="text-xs px-2.5 py-1 bg-white hover:bg-teal-50 hover:text-teal-800 text-slate-600 rounded-lg border border-slate-200/90 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t.assistant.inputPlaceholder}
              disabled={isTyping}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all disabled:opacity-60"
            />

            <span className="text-[11px] text-slate-400 font-medium px-1 hidden sm:inline">
              {inputMessage.length}/1500
            </span>

            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                inputMessage.trim() && !isTyping
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 4. Persistent Educational Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          <strong>Educational Use Only:</strong> MediMate AI provides health information to assist patient understanding, not a medical diagnosis or treatment plan. If you suspect an acute emergency, dial 112 / 108 / 911 immediately.
        </p>
      </div>

      {/* 5. Recommended Starter Prompts Grid */}
      <div className="pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Or Select a Medically Formulated Clinical Starter Prompt
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {mockStarterPrompts.map((p, idx) => (
            <div
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between gap-2 text-left"
            >
              <div>
                <Badge color="slate" size="sm">
                  {p.badge}
                </Badge>
                <p className="text-xs text-slate-800 font-medium mt-1.5 leading-snug group-hover:text-teal-900">
                  "{p.text}"
                </p>
              </div>
              <span className="text-[11px] font-bold text-teal-700 flex items-center gap-1">
                Ask AI →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthAssistant;
