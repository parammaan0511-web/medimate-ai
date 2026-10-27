// Comprehensive bilingual dictionary for English and Hindi
export const translations = {
  en: {
    appName: "MediGuide AI",
    appTagline: "AI-Powered Healthcare Information Assistant",
    disclaimerAlert: "MediGuide AI provides health information, not a medical diagnosis.",
    disclaimerSub: "Always consult a qualified medical professional or contact emergency services for acute medical situations.",
    emergencyBtn: "Emergency: 108 / 112",
    nav: {
      overview: "Overview",
      assistant: "AI Health Assistant",
      symptoms: "Symptom Guidance",
      simplifier: "Report Simplifier",
      preventive: "Preventive Care",
      settings: "Settings",
    },
    privacy: {
      badge: "HIPAA-Aligned • End-to-End Encrypted",
      tooltipTitle: "Your Health Privacy Is Guaranteed",
      zeroRetention: "Zero Data Retention",
      zeroRetentionDesc: "Conversations and uploaded test reports are never stored or used to train third-party AI models.",
      encryption: "AES-256 Client-Side Encryption",
      encryptionDesc: "Your sensitive health inquiries are processed securely through isolated, encrypted channels.",
      compliance: "Clinical AI Safety Standard",
      complianceDesc: "Built according to WHO and Indian Health Data Privacy Framework guidelines.",
      close: "Close Privacy Details"
    },
    topbar: {
      searchPlaceholder: "Search symptoms, tests, medications...",
      notifications: "Notifications",
      profileName: "Dr. A. Sharma (Guest Patient)",
      onlineStatus: "Private Session Active",
    },
    overview: {
      greeting: "Hello, Guest Patient",
      subGreeting: "Here is your personal healthcare companion dashboard. What would you like to explore today?",
      quickStats: {
        lastCheck: "Last Health Inquiry",
        lastCheckVal: "2 hours ago",
        reportsAnalyzed: "Reports Simplified",
        reportsAnalyzedVal: "4 Completed",
        wellnessScore: "Wellness Check",
        wellnessScoreVal: "On Track",
        nextScreening: "Upcoming Screen",
        nextScreeningVal: "Lipid Panel (14d)"
      },
      cards: {
        ask: {
          title: "Ask a Health Question",
          desc: "Explore symptoms, medication usage, side effects, and clinical guidance in plain language.",
          cta: "Start Health Inquiry",
          badge: "Triage & Info"
        },
        report: {
          title: "Understand a Lab Report",
          desc: "Upload or select blood tests, lipid panels, or radiology summaries for patient-friendly breakdowns.",
          cta: "Simplify a Report",
          badge: "OCR & Document AI"
        },
        wellness: {
          title: "Daily Wellness",
          desc: "Track daily hydration, step targets, mental calmness, and evidence-based lifestyle tips.",
          cta: "View Daily Habits",
          badge: "Lifestyle Vitals"
        },
        education: {
          title: "Health Education",
          desc: "Bite-sized, physician-verified guides on chronic diseases, nutrition, and first-aid protocols.",
          cta: "Browse Medical Guides",
          badge: "Verified Knowledge"
        }
      },
      recentActivityTitle: "Recent Activity",
      recentActivitySub: "Synthetic patient interactions and historical inquiry logs",
      viewAll: "View All Logs",
      viewDetails: "View Summary",
      typeReport: "Lab Report",
      typeSymptom: "Symptom Query",
      typeScreening: "Preventive Care",
      typeMedication: "Medication Review"
    },
    assistant: {
      title: "AI Health Assistant",
      subtitle: "Ask any medical question, check medication interactions, or understand health symptoms.",
      inputPlaceholder: "Describe your symptoms or ask a health question (e.g., 'What causes persistent dry cough at night?')...",
      askBtn: "Submit Inquiry",
      emptyStateTitle: "Your Private AI Health Assistant is Ready",
      emptyStateDesc: "Enter your health query or select one of the medically reviewed starter prompts below. No fake responses are active in this preview mode.",
      samplePromptsTitle: "Recommended Starter Prompts",
      disclaimerNote: "Note: In this preview MVP, queries prepare prompts for clinical model integration.",
      topics: {
        all: "All Topics",
        symptoms: "Symptoms & Illness",
        medications: "Prescriptions & Dosing",
        nutrition: "Diet & Nutrition",
        firstaid: "First Aid & Triage"
      }
    },
    simplifier: {
      title: "Report Simplifier",
      subtitle: "Translate dense diagnostic lab results into straightforward, actionable insights.",
      uploadTitle: "Drag & Drop your Lab Report or Prescription",
      uploadSubtitle: "Supported formats: PDF, JPG, PNG (Max 15MB). Client-side anonymized before processing.",
      browseFiles: "Browse Files",
      sampleReportsTitle: "Or Try a Synthetic Sample Report",
      emptyPreviewTitle: "Ready to Simplify Diagnostic Reports",
      emptyPreviewDesc: "Select one of the sample reports above or drop an anonymized PDF to inspect key biomarker ranges, clinical interpretations, and doctor consultation questions.",
      keyBiomarkers: "Biomarker Highlights",
      doctorQuestions: "Questions for Your Physician",
      privacyGuarantee: "All lab reports are processed in ephemeral memory without cloud retention."
    },
    preventive: {
      title: "Preventive Care & Screenings",
      subtitle: "Stay proactive with evidence-based health checklists tailored to your demographic.",
      recommendedTitle: "Recommended Health Screenings",
      filterAll: "All Screenings",
      filterCardio: "Cardiovascular",
      filterMetabolic: "Metabolic / Diabetes",
      filterImmunization: "Vaccinations",
      filterVision: "Vision & Dental",
      scheduleStatus: "Due in 14 days",
      statusCompleted: "Up to Date",
      statusPending: "Scheduled",
      statusRecommended: "Recommended"
    },
    settings: {
      title: "Settings & Preferences",
      subtitle: "Manage your language preferences, security protocols, and demo session data.",
      languageSection: "Language & Localization",
      preferredLanguage: "Preferred Interface Language",
      privacySection: "Privacy & Data Protection",
      zeroDataToggle: "Strict Zero-Data Retention",
      zeroDataDesc: "Immediately purge chat and document tokens upon session termination.",
      telemetryToggle: "Anonymous Performance Diagnostics",
      telemetryDesc: "Allow strictly anonymized performance metrics to enhance latency.",
      sessionSection: "Session Storage & Reset",
      clearDataBtn: "Reset Demo Session",
      exportDataBtn: "Export Health Activity Log",
      disclaimerNotice: "MediGuide AI follows ethical healthcare AI standards with clear physician-first disclaimers."
    }
  },
  hi: {
    appName: "मेडीगाइड एआई (MediGuide AI)",
    appTagline: "एआई-संचालित स्वास्थ्य सूचना सहायक",
    disclaimerAlert: "मेडीगाइड एआई केवल स्वास्थ्य जानकारी प्रदान करता है, कोई चिकित्सकीय निदान नहीं।",
    disclaimerSub: "गंभीर चिकित्सकीय स्थिति के लिए हमेशा किसी योग्य डॉक्टर से परामर्श लें या आपातकालीन सेवाओं से संपर्क करें।",
    emergencyBtn: "आपातकाल: 108 / 112",
    nav: {
      overview: "अवलोकन (Overview)",
      assistant: "एआई स्वास्थ्य सहायक (AI Assistant)",
      symptoms: "लक्षण मार्गदर्शन (Symptom Guidance)",
      simplifier: "रिपोर्ट सरल बनाएं (Report Simplifier)",
      preventive: "निवारक देखभाल (Preventive Care)",
      settings: "सेटिंग्स (Settings)",
    },
    privacy: {
      badge: "HIPAA-अनुरूप • एंड-टू-एंड एन्क्रिप्टेड",
      tooltipTitle: "आपकी स्वास्थ्य गोपनीयता सुरक्षित है",
      zeroRetention: "शून्य डेटा प्रतिधारण (Zero Retention)",
      zeroRetentionDesc: "आपकी बातचीत या अपलोड की गई मेडिकल रिपोर्ट कभी भी किसी तीसरे पक्ष के एआई को प्रशिक्षित करने के लिए सहेजी नहीं जाती है।",
      encryption: "AES-256 क्लाइंट-साइड एन्क्रिप्शन",
      encryptionDesc: "आपकी संवेदनशील स्वास्थ्य पूछताछ सुरक्षित, अलग और एन्क्रिप्टेड चैनलों के माध्यम से संसाधित होती है।",
      compliance: "क्लिनिकल एआई सुरक्षा मानक",
      complianceDesc: "विश्व स्वास्थ्य संगठन (WHO) और भारत के डिजिटल स्वास्थ्य दिशानिर्देशों के अनुरूप तैयार।",
      close: "गोपनीयता विवरण बंद करें"
    },
    topbar: {
      searchPlaceholder: "लक्षण, परीक्षण, दवाएं खोजें...",
      notifications: "सूचनाएं",
      profileName: "डॉ. ए. शर्मा (अतिथि रोगी)",
      onlineStatus: "सुरक्षित निजी सत्र सक्रिय",
    },
    overview: {
      greeting: "नमस्ते, अतिथि रोगी",
      subGreeting: "यह आपका व्यक्तिगत स्वास्थ्य सहायक डैशबोर्ड है। आज आप क्या जानना चाहते हैं?",
      quickStats: {
        lastCheck: "अंतिम स्वास्थ्य पूछताछ",
        lastCheckVal: "2 घंटे पहले",
        reportsAnalyzed: "सरल की गई रिपोर्ट",
        reportsAnalyzedVal: "4 पूर्ण",
        wellnessScore: "दैनिक स्वास्थ्य स्थिति",
        wellnessScoreVal: "सही स्थिति में",
        nextScreening: "आगामी स्वास्थ्य जांच",
        nextScreeningVal: "लिपिड प्रोफाइल (14 दिन)"
      },
      cards: {
        ask: {
          title: "स्वास्थ्य प्रश्न पूछें",
          desc: "सरल भाषा में लक्षणों, दवाओं के उपयोग, दुष्प्रभावों और नैदानिक मार्गदर्शन को समझें।",
          cta: "पूछताछ शुरू करें",
          badge: "लक्षण और सलाह"
        },
        report: {
          title: "लैब रिपोर्ट को समझें",
          desc: "रक्त परीक्षण, सीबीसी, लिपिड पैनल या थायरॉयड रिपोर्ट अपलोड करें और सरल विवरण प्राप्त करें।",
          cta: "रिपोर्ट को सरल बनाएं",
          badge: "दस्तावेज़ एआई"
        },
        wellness: {
          title: "दैनिक स्वास्थ्य (Wellness)",
          desc: "दैनिक पानी का सेवन, चलने के लक्ष्य, मानसिक शांति और जीवनशैली के सुझाव ट्रैक करें।",
          cta: "दैनिक आदतें देखें",
          badge: "जीवनशैली विटल्स"
        },
        education: {
          title: "स्वास्थ्य शिक्षा",
          desc: "मधुमेह, उच्च रक्तचाप, पोषण और प्राथमिक चिकित्सा पर डॉक्टरों द्वारा सत्यापित मार्गदर्शिकाएं।",
          cta: "मार्गदर्शिकाएं पढ़ें",
          badge: "सत्यापित ज्ञान"
        }
      },
      recentActivityTitle: "हाल की गतिविधि",
      recentActivitySub: "सिंथेटिक रोगी बातचीत और ऐतिहासिक पूछताछ लॉग",
      viewAll: "सभी लॉग देखें",
      viewDetails: "विवरण देखें",
      typeReport: "लैब रिपोर्ट",
      typeSymptom: "लक्षण पूछताछ",
      typeScreening: "निवारक जांच",
      typeMedication: "दवा समीक्षा"
    },
    assistant: {
      title: "एआई स्वास्थ्य सहायक (AI Health Assistant)",
      subtitle: "कोई भी चिकित्सकीय प्रश्न पूछें, दवाओं के परस्पर प्रभाव की जांच करें या लक्षणों को समझें।",
      inputPlaceholder: "अपने लक्षण लिखें या कोई स्वास्थ्य प्रश्न पूछें (उदा. 'रात में लगातार सूखी खांसी के क्या कारण हैं?')...",
      askBtn: "पूछताछ भेजें",
      emptyStateTitle: "आपका निजी एआई स्वास्थ्य सहायक तैयार है",
      emptyStateDesc: "अपना प्रश्न दर्ज करें या नीचे दिए गए चिकित्सकीय रूप से सत्यापित संकेतों में से किसी एक को चुनें। इस पूर्वावलोकन मोड में कोई फर्जी उत्तर नहीं हैं।",
      samplePromptsTitle: "अनुशंसित शुरुआती प्रश्न",
      disclaimerNote: "नोट: इस पूर्वावलोकन में प्रश्न वास्तविक क्लिनिकल मॉडल एकीकरण के लिए तैयार हैं।",
      topics: {
        all: "सभी विषय",
        symptoms: "लक्षण और बीमारी",
        medications: "दवाएं और खुराक",
        nutrition: "आहार और पोषण",
        firstaid: "प्राथमिक चिकित्सा"
      }
    },
    simplifier: {
      title: "रिपोर्ट सरल बनाएं (Report Simplifier)",
      subtitle: "कठिन लैब रिपोर्ट और परीक्षण परिणामों को आसान, समझने योग्य भाषा में बदलें।",
      uploadTitle: "अपनी लैब रिपोर्ट या प्रिस्क्रिप्शन यहां ड्रैग व ड्रॉप करें",
      uploadSubtitle: "समर्थित प्रारूप: PDF, JPG, PNG (अधिकतम 15MB)। अपलोड से पहले क्लाइंट-साइड अज्ञात किया जाता है।",
      browseFiles: "फाइलें चुनें",
      sampleReportsTitle: "या एक सिंथेटिक नमूना रिपोर्ट आज़माएं",
      emptyPreviewTitle: "नैदानिक रिपोर्ट का विश्लेषण करने के लिए तैयार",
      emptyPreviewDesc: "बायोमार्कर रेंज, चिकित्सकीय व्याख्या और डॉक्टर से पूछने योग्य प्रश्नों को देखने के लिए ऊपर दिए गए नमूने चुनें।",
      keyBiomarkers: "बायोमार्कर मुख्य बिंदु",
      doctorQuestions: "अपने चिकित्सक से पूछने योग्य प्रश्न",
      privacyGuarantee: "सभी लैब रिपोर्ट बिना क्लाउड स्टोरेज के अस्थायी मेमोरी में प्रोसेस की जाती हैं।"
    },
    preventive: {
      title: "निवारक देखभाल और जांच (Preventive Care)",
      subtitle: "अपनी उम्र और प्रोफ़ाइल के अनुसार अनुशंसित स्वास्थ्य जांच के साथ आगे रहें।",
      recommendedTitle: "अनुशंसित स्वास्थ्य जांच सूची",
      filterAll: "सभी जांच",
      filterCardio: "हृदय स्वास्थ्य",
      filterMetabolic: "मधुमेह और चयापचय",
      filterImmunization: "टीकाकरण",
      filterVision: "आंख और दांत",
      scheduleStatus: "14 दिनों में देय",
      statusCompleted: "अप टू डेट",
      statusPending: "निर्धारित",
      statusRecommended: "अनुशंसित"
    },
    settings: {
      title: "सेटिंग्स और प्राथमिकताएं (Settings)",
      subtitle: "अपनी भाषा प्राथमिकताएं, सुरक्षा प्रोटोकॉल और डेमो सत्र डेटा प्रबंधित करें।",
      languageSection: "भाषा और स्थानीयकरण",
      preferredLanguage: "पसंदीदा इंटरफ़ेस भाषा",
      privacySection: "गोपनीयता और डेटा सुरक्षा",
      zeroDataToggle: "कठोर शून्य-डेटा प्रतिधारण (Zero Data Retention)",
      zeroDataDesc: "सत्र समाप्त होने पर सभी चैट और दस्तावेज़ टोकन तुरंत हटा दिए जाते हैं।",
      telemetryToggle: "अनाम प्रदर्शन विश्लेषण",
      telemetryDesc: "लेटेंसी सुधारने के लिए केवल अनाम प्रदर्शन मेट्रिक्स की अनुमति दें।",
      sessionSection: "सत्र संग्रहण और रीसेट",
      clearDataBtn: "डेमो सत्र रीसेट करें",
      exportDataBtn: "स्वास्थ्य गतिविधि लॉग निर्यात करें",
      disclaimerNotice: "मेडीमेट एआई स्पष्ट डॉक्टर-प्रथम अस्वीकरणों के साथ नैतिक स्वास्थ्य देखभाल मानकों का पालन करता है।"
    }
  },
  mr: {
    appName: "मेडीमेट एआई (MediMate AI)",
    appTagline: "एआय-चालित आरोग्य माहिती सहाय्यक",
    disclaimerAlert: "मेडीमेट एआई केवळ आरोग्य माहिती पुरवते, कोणताही वैद्यकीय सल्ला किंवा निदान देत नाही.",
    disclaimerSub: "गंभीर वैद्यकीय आणीबाणीसाठी नेहमी पात्र डॉक्टरांचा सल्ला घ्या किंवा आपत्कालीन क्रमांकावर संपर्क साधा.",
    emergencyBtn: "आपत्कालीन: 108 / 112",
    nav: {
      overview: "आढावा (Overview)",
      assistant: "एआय आरोग्य सहाय्यक (AI Assistant)",
      symptoms: "लक्षण मार्गदर्शन (Symptom Guidance)",
      simplifier: "अहवाल सोपा करा (Report Simplifier)",
      preventive: "प्रतिबंधात्मक काळजी (Preventive Care)",
      settings: "सेटिंग्ज (Settings)",
    },
    privacy: {
      badge: "HIPAA-सुसंगत • सुरक्षित एन्क्रिप्शन",
      tooltipTitle: "तुमची आरोग्य गोपनीयता सुरक्षित आहे",
      zeroRetention: "शून्य डेटा धारणा (Zero Retention)",
      zeroRetentionDesc: "तुमच्या आरोग्य चौकशी किंवा अहवाल कधीही बाह्य एआय मॉडेल प्रशिक्षणासाठी साठवले जात नाहीत.",
      encryption: "AES-256 क्लायंट-साइड एन्क्रिप्शन",
      encryptionDesc: "तुमच्या सर्व चौकशी सुरक्षित आणि एन्क्रिप्टेड चॅनेल्सद्वारे प्रक्रिया केल्या जातात.",
      compliance: "क्लिनिकल एआय सुरक्षा मानके",
      complianceDesc: "डब्ल्यूएचओ आणि भारतीय डिजिटल आरोग्य नियमावलीनुसार रचना केलेली.",
      close: "गोपनीयता तपशील बंद करा"
    },
    topbar: {
      searchPlaceholder: "लक्षणे, चाचण्या, औषधे शोधा...",
      notifications: "सूचना",
      profileName: "डॉ. ए. शर्मा (अतिथी रुग्ण)",
      onlineStatus: "सुरक्षित खाजगी सत्र सक्रिय",
    },
    overview: {
      greeting: "नमस्कार, अतिथी रुग्ण",
      subGreeting: "हा तुमचा वैयक्तिक आरोग्य सहाय्यक डॅशबोर्ड आहे. आज तुम्हाला काय जाणून घ्यायचे आहे?",
      quickStats: {
        lastCheck: "शेवटची चौकशी",
        lastCheckVal: "२ तासांपूर्वी",
        reportsAnalyzed: "सोपे केलेले अहवाल",
        reportsAnalyzedVal: "४ पूर्ण",
        wellnessScore: "दैनिक आरोग्य स्थिती",
        wellnessScoreVal: "उत्तम",
        nextScreening: "पुढील तपासणी",
        nextScreeningVal: "लिपिड प्रोफाइल (१४ दिवस)"
      },
      cards: {
        ask: {
          title: "आरोग्य प्रश्न विचारा",
          desc: "सोप्या भाषेत लक्षणे, औषधांचे दुष्परिणाम आणि क्लिनिकल मार्गदर्शन समजून घ्या.",
          cta: "चौकशी सुरू करा",
          badge: "लक्षणे व सल्ला"
        },
        report: {
          title: "लॅब अहवाल समजून घ्या",
          desc: "रक्त चाचणी, सीबीसी किंवा थायरॉईड अहवाल अपलोड करा आणि सोपे विश्लेषण मिळवा.",
          cta: "अहवाल सोपा करा",
          badge: "दस्तऐवज एआय"
        },
        wellness: {
          title: "दैनिक निरोगी जीवन",
          desc: "दैनिक पाणी, चालण्याचे ध्येय आणि जीवनशैलीच्या सवयी ट्रॅक करा.",
          cta: "सवयी पहा",
          badge: "जीवनशैली विटल्स"
        },
        education: {
          title: "आरोग्य शिक्षण",
          desc: "मधुमेह, रक्तदाब आणि पोषणावर डॉक्टरांनी तपासलेली माहिती.",
          cta: "मार्गदर्शक वाचा",
          badge: "सत्यापित माहिती"
        }
      },
      recentActivityTitle: "अलीकडील क्रियाकलाप",
      recentActivitySub: "सिंथेटिक रुग्ण संवाद आणि आरोग्य लॉग",
      viewAll: "सर्व नोंदी पहा",
      viewDetails: "तपशील पहा",
      typeReport: "लॅब अहवाल",
      typeSymptom: "लक्षण चौकशी",
      typeScreening: "प्रतिबंधात्मक तपासणी",
      typeMedication: "औषध पुनरावलोकन"
    },
    assistant: {
      title: "एआय आरोग्य सहाय्यक (AI Health Assistant)",
      subtitle: "कोणताही वैद्यकीय प्रश्न विचारा, औषधांचे परस्परसंवाद तपासा किंवा लक्षणे समजून घ्या.",
      inputPlaceholder: "तुमची लक्षणे वर्णन करा किंवा प्रश्न विचारा (उदा. 'रात्री सतत कोरडा खोकला का येतो?')...",
      askBtn: "चौकशी पाठवा",
      emptyStateTitle: "तुमचा खाजगी एआय सहाय्यक सज्ज आहे",
      emptyStateDesc: "खालीलपैकी एक प्रश्न निवडा किंवा स्वतःचा प्रश्न विचारा. जेमिनी एआय सुरक्षित उत्तरासाठी तयार आहे.",
      samplePromptsTitle: "शिफारस केलेले सुरुवातीचे प्रश्न",
      disclaimerNote: "टीप: मेडीमेट एआय माहिती पुरवते, प्रत्यक्ष डॉक्टरांची जागा घेत नाही.",
      topics: {
        all: "सर्व विषय",
        symptoms: "लक्षणे व आजार",
        medications: "औषधे व डोस",
        nutrition: "आहार व पोषण",
        firstaid: "प्रथमोपचार"
      }
    },
    simplifier: {
      title: "अहवाल सोपा करा (Report Simplifier)",
      subtitle: "कठीण लॅब चाचणी निकाल समजण्यास सोप्या भाषेत रूपांतरित करा.",
      uploadTitle: "लॅब अहवाल किंवा प्रिस्क्रिप्शन येथे ड्रॅग व ड्रॉप करा",
      uploadSubtitle: "समर्थित फॉरमॅट: PDF, JPG, PNG (कमाल 15MB).",
      browseFiles: "फाइल निवडा",
      sampleReportsTitle: "किंवा नमुना अहवाल वापरून पहा",
      emptyPreviewTitle: "अहवाल विश्लेषणासाठी तयार",
      emptyPreviewDesc: "बायोमार्कर आणि डॉक्टरांना विचारण्यासाठी प्रश्न पाहण्यासाठी वरून नमुना निवडा.",
      keyBiomarkers: "बायोमार्कर ठळक मुद्दे",
      doctorQuestions: "डॉक्टरांना विचारण्यासाठी प्रश्न",
      privacyGuarantee: "सर्व अहवाल तात्पुरत्या मेमरीमध्ये प्रक्रिया केले जातात."
    },
    preventive: {
      title: "प्रतिबंधात्मक काळजी (Preventive Care)",
      subtitle: "तुमच्या वयानुसार शिफारस केलेल्या आरोग्य तपासण्यांसह सजग राहा.",
      recommendedTitle: "आरोग्य तपासणी सूची",
      filterAll: "सर्व तपासण्या",
      filterCardio: "हृदय आरोग्य",
      filterMetabolic: "मधुमेह व चयापचय",
      filterImmunization: "लसीकरण",
      filterVision: "डोळे व दात",
      scheduleStatus: "१४ दिवसांत देय",
      statusCompleted: "पूर्ण",
      statusPending: "नियोजित",
      statusRecommended: "शिफारस केलेले"
    },
    settings: {
      title: "सेटिंग्ज आणि प्राधान्ये (Settings)",
      subtitle: "तुमची भाषा प्राधान्ये, सुरक्षा आणि सत्र डेटा व्यवस्थापित करा.",
      languageSection: "भाषा आणि स्थानिकीकरण",
      preferredLanguage: "पसंतीची भाषा",
      privacySection: "गोपनीयता आणि डेटा संरक्षण",
      zeroDataToggle: "कडक शून्य-डेटा धारणा",
      zeroDataDesc: "सत्र संपल्यावर सर्व डेटा तात्काळ हटवला जातो.",
      telemetryToggle: "अनामित कामगिरी विश्लेषण",
      telemetryDesc: "केवळ कामगिरी सुधारण्यासाठी आवश्यक मेट्रिक्स.",
      sessionSection: "सत्र स्टोरेज आणि रीसेट",
      clearDataBtn: "डेमो सत्र रीसेट करा",
      exportDataBtn: "आरोग्य लॉग निर्यात करा",
      disclaimerNotice: "मेडीमेट एआय स्पष्ट नैतिक आरोग्य मानकांचे पालन करते."
    }
  }
};
