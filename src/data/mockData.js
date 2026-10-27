// Rich synthetic medical data for MediGuide AI

export const mockRecentActivities = [
  {
    id: "act-1",
    type: "report",
    title: "Complete Blood Count (CBC) with Differential",
    summary: "RBC and WBC levels normal. Ferritin slightly low (18 ng/mL). Platelets optimal.",
    category: "Hematology Lab",
    timeAgo: "2 hours ago",
    date: "Oct 27, 2026 • 03:45 PM",
    badgeColor: "teal",
    details: {
      patient: "Anonymous Profile #9142",
      provider: "Metro Diagnostics Laboratory",
      findings: [
        { parameter: "Hemoglobin", value: "13.2 g/dL", range: "12.0 - 15.5 g/dL", status: "Normal" },
        { parameter: "WBC Count", value: "6,800 /mcL", range: "4,500 - 11,000 /mcL", status: "Normal" },
        { parameter: "Platelet Count", value: "245,000 /mcL", range: "150,000 - 450,000 /mcL", status: "Normal" },
        { parameter: "Serum Ferritin", value: "18 ng/mL", range: "24 - 307 ng/mL", status: "Low" }
      ],
      aiExplanation: "Your overall blood counts are healthy. Your ferritin (iron storage protein) is marginally below the normal reference range, which can sometimes correspond to early iron deficiency or dietary variations.",
      questionsForDoctor: [
        "Would you recommend an oral iron supplement or dietary iron adjustments?",
        "Should we repeat ferritin and iron panel in 3 months?"
      ]
    }
  },
  {
    id: "act-2",
    type: "symptom",
    title: "Tension Headache vs. Migraine Query",
    summary: "Mild unilateral temporal throbbing with screen sensitivity after prolonged work.",
    category: "Neurological & Triage",
    timeAgo: "Yesterday at 6:30 PM",
    date: "Oct 26, 2026 • 06:30 PM",
    badgeColor: "blue",
    details: {
      patient: "Anonymous Profile #9142",
      findings: [
        { parameter: "Reported Severity", value: "4/10 Moderate", status: "Stable" },
        { parameter: "Duration", value: "4 hours", status: "Monitored" },
        { parameter: "Red Flag Screen", value: "No sudden onset / No fever / No neurological deficit", status: "Clear" }
      ],
      aiExplanation: "Inquiry centered on screen-induced tension headaches vs early migraine aura. General ergonomic 20-20-20 rule, hydration, and blue-light moderation were highlighted.",
      questionsForDoctor: [
        "If headaches recur more than twice weekly, could an ophthalmology screen be helpful?",
        "Are over-the-counter NSAIDs appropriate for sporadic relief?"
      ]
    }
  },
  {
    id: "act-3",
    type: "screening",
    title: "Annual Preventive Lipid Profile Reminder",
    summary: "Routine cardiovascular risk screening due based on age demographic.",
    category: "Preventive Care",
    timeAgo: "3 days ago",
    date: "Oct 24, 2026 • 11:15 AM",
    badgeColor: "emerald",
    details: {
      patient: "Anonymous Profile #9142",
      findings: [
        { parameter: "Prior Total Cholesterol", value: "192 mg/dL", range: "< 200 mg/dL", status: "Desirable" },
        { parameter: "Prior LDL", value: "110 mg/dL", range: "< 100 mg/dL", status: "Borderline" },
        { parameter: "Target Test Date", value: "November 12, 2026", status: "Upcoming" }
      ],
      aiExplanation: "Annual screening keeps an eye on lipid metrics to maintain cardiovascular health. Fasting for 10-12 hours prior to the test is typically required.",
      questionsForDoctor: [
        "Do I need fasting blood sugar drawn simultaneously with my lipid profile?",
        "Are dietary fiber increases sufficient to optimize borderline LDL?"
      ]
    }
  },
  {
    id: "act-4",
    type: "medication",
    title: "Medication Co-administration: Paracetamol & Ibuprofen",
    summary: "Guidance on therapeutic interval spacing and gastric protection.",
    category: "Pharmacology Info",
    timeAgo: "4 days ago",
    date: "Oct 23, 2026 • 02:20 PM",
    badgeColor: "amber",
    details: {
      patient: "Anonymous Profile #9142",
      findings: [
        { parameter: "Interaction Level", value: "Low / Safe when alternated", status: "Informational" },
        { parameter: "Maximum Paracetamol", value: "3,000 - 4,000 mg/day adult max", status: "Caution" },
        { parameter: "Food Requirement", value: "Take Ibuprofen with meals", status: "Advisory" }
      ],
      aiExplanation: "Both medications operate via distinct pathways (acetaminophen centrally; ibuprofen peripherally via COX inhibition). Staggering by 3-4 hours avoids overlapping peak doses.",
      questionsForDoctor: [
        "Is there any liver or kidney history that contraindicates dual use?",
        "What is the maximum consecutive duration I should take these without a clinical checkup?"
      ]
    }
  }
];

export const mockSampleReports = [
  {
    id: "sample-cbc",
    name: "Complete Blood Count (CBC)",
    badge: "Most Common",
    desc: "Hemoglobin, White Blood Cells, Platelets, Hematocrit",
    highlights: [
      { metric: "Hemoglobin", value: "13.8 g/dL", status: "Optimal", badge: "Normal" },
      { metric: "White Blood Cells", value: "7,200 /uL", status: "Optimal", badge: "Normal" },
      { metric: "Platelets", value: "145,000 /uL", status: "Marginal", badge: "Slightly Low" }
    ],
    plainLanguageSummary: "This sample shows normal oxygen-carrying capacity (Hemoglobin) and good infection-fighting response (WBC). Platelet levels are just below standard threshold, worth checking with your doctor for confirmation.",
    sampleDoctorQuestions: [
      "Could mild dehydration or a recent viral illness account for the mild platelet drop?",
      "Do I need a repeat peripheral smear test?"
    ]
  },
  {
    id: "sample-lipid",
    name: "Comprehensive Lipid Panel",
    badge: "Cardiovascular",
    desc: "Total Cholesterol, HDL, LDL, Triglycerides",
    highlights: [
      { metric: "Total Cholesterol", value: "215 mg/dL", status: "Borderline High", badge: "Attention" },
      { metric: "LDL (Bad Cholesterol)", value: "135 mg/dL", status: "Elevated", badge: "Attention" },
      { metric: "HDL (Good Cholesterol)", value: "54 mg/dL", status: "Protective", badge: "Normal" },
      { metric: "Triglycerides", value: "130 mg/dL", status: "Desirable", badge: "Normal" }
    ],
    plainLanguageSummary: "Your protective HDL and triglycerides look healthy. Total and LDL cholesterol are slightly above the optimal line, which can often be addressed with heart-healthy dietary swaps (olive oil, oats, nuts) and regular brisk walks.",
    sampleDoctorQuestions: [
      "What is my 10-year ASCVD cardiovascular risk estimate?",
      "Should we trial 3-6 months of Mediterranean dietary adjustments before considering medication?"
    ]
  },
  {
    id: "sample-thyroid",
    name: "Thyroid Function Test (TSH, Free T4)",
    badge: "Endocrine",
    desc: "Thyroid Stimulating Hormone & Thyroxine",
    highlights: [
      { metric: "TSH (Thyroid Stimulating)", value: "4.85 uIU/mL", status: "Mildly Elevated", badge: "Borderline High" },
      { metric: "Free T4 (Thyroxine)", value: "1.1 ng/dL", status: "Normal", badge: "Normal" }
    ],
    plainLanguageSummary: "Free T4 is in the normal zone, while pituitary TSH is marginally elevated. This pattern often represents subclinical hypothyroidism, which clinicians monitor over time rather than rushing to treat unless symptoms are present.",
    sampleDoctorQuestions: [
      "Does this borderline TSH warrant testing for Anti-TPO thyroid antibodies?",
      "Could fatigue or cold sensitivity be connected to this reading?"
    ]
  }
];

export const mockStarterPrompts = [
  {
    category: "symptoms",
    categoryLabel: "Symptoms",
    text: "I have had a mild dry cough and slight scratchy throat for 3 days without fever. What home care is recommended?",
    badge: "Respiratory"
  },
  {
    category: "symptoms",
    categoryLabel: "Symptoms",
    text: "What are the common differences between tension headaches and sinus pressure?",
    badge: "ENT / Head"
  },
  {
    category: "medications",
    categoryLabel: "Medications",
    text: "Can I take Vitamin D3 supplements alongside Calcium, and is it better with fatty meals?",
    badge: "Vitamins"
  },
  {
    category: "medications",
    categoryLabel: "Medications",
    text: "What should someone do if they accidentally missed a dose of blood pressure medication?",
    badge: "Cardiology"
  },
  {
    category: "nutrition",
    categoryLabel: "Nutrition",
    text: "What are practical low-glycemic breakfast options for managing prediabetes?",
    badge: "Metabolic"
  },
  {
    category: "firstaid",
    categoryLabel: "First Aid",
    text: "What is the correct immediate first-aid response for a minor first-degree kitchen burn?",
    badge: "Urgent Care"
  }
];

export const mockPreventiveScreenings = [
  {
    id: "prev-1",
    title: "Blood Pressure Monitoring",
    category: "cardio",
    frequency: "Every 6-12 Months",
    recommendation: "Target < 120/80 mmHg. Screen regularly to detect silent hypertension early.",
    status: "completed",
    lastDate: "Sep 15, 2026",
    nextDue: "March 2027",
    icon: "HeartPulse"
  },
  {
    id: "prev-2",
    title: "Fasting Blood Glucose / HbA1c",
    category: "metabolic",
    frequency: "Annually",
    recommendation: "Early detection of prediabetes. Recommended for adults 25+ or with family history.",
    status: "completed",
    lastDate: "July 10, 2026",
    nextDue: "July 2027",
    icon: "Activity"
  },
  {
    id: "prev-3",
    title: "Lipid Profile (Cholesterol & Triglycerides)",
    category: "cardio",
    frequency: "Annually",
    recommendation: "Evaluates cardiovascular plaque risk. Fasting blood draw required.",
    status: "pending",
    lastDate: "Nov 15, 2025",
    nextDue: "Nov 12, 2026 (Due in 16 days)",
    icon: "ShieldAlert"
  },
  {
    id: "prev-4",
    title: "Annual Seasonal Influenza Vaccination",
    category: "immunization",
    frequency: "Annually (Pre-Monsoon / Pre-Winter)",
    recommendation: "Protects against seasonal circulating flu strains (H1N1 / H3N2).",
    status: "pending",
    lastDate: "Oct 2025",
    nextDue: "November 2026",
    icon: "Syringe"
  },
  {
    id: "prev-5",
    title: "Comprehensive Dental Prophylaxis & Exam",
    category: "vision",
    frequency: "Every 6 Months",
    recommendation: "Prevent gum inflammation, tartar accumulation, and oral cavity screening.",
    status: "recommended",
    lastDate: "Jan 2026",
    nextDue: "Recommended this month",
    icon: "Smile"
  },
  {
    id: "prev-6",
    title: "Comprehensive Eye Exam & Visual Acuity",
    category: "vision",
    frequency: "Every 1-2 Years",
    recommendation: "Refractive check, intraocular pressure (glaucoma), and digital eye strain review.",
    status: "recommended",
    lastDate: "May 2025",
    nextDue: "Due for renewal",
    icon: "Eye"
  }
];

export const mockHealthGuides = [
  {
    id: "guide-1",
    title: "Demystifying HbA1c: The 90-Day Blood Sugar Window",
    category: "Metabolic Health",
    readTime: "4 min read",
    snippet: "Why daily glucose fluctuates, how red blood cell hemoglobin binds sugar, and what 5.7% vs 6.5% actually means for your metabolic wellness.",
    tag: "Diabetes Prevention"
  },
  {
    id: "guide-2",
    title: "Understanding Blood Pressure: Systolic vs. Diastolic",
    category: "Cardiovascular",
    readTime: "5 min read",
    snippet: "The difference between arterial pressure when your heart pumps versus when it rests, plus lifestyle sodium guidelines.",
    tag: "Heart Health"
  },
  {
    id: "guide-3",
    title: "Safe Over-The-Counter Medicine Essentials",
    category: "Pharmacology",
    readTime: "3 min read",
    snippet: "Understanding active ingredients in cold & flu remedies to avoid unintentional double dosing of acetaminophen.",
    tag: "Medication Safety"
  }
];

export const mockDailyWellness = {
  quote: "Small consistent daily habits build resilient lifelong cardiovascular and metabolic health.",
  waterGlasses: 6,
  targetWater: 8,
  stepCount: 7420,
  targetSteps: 10000,
  sleepHours: 7.5,
  dailyTip: "Taking a 10-minute gentle walk immediately after meals helps blunt postprandial glucose spikes by up to 22%."
};
