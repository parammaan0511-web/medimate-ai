/**
 * Client-Side Emergency Red-Flag Triage Engine
 * Performs instantaneous rule-based safety screening for life-threatening symptoms
 */

const EMERGENCY_RULES = [
  {
    category: 'cardiac',
    regex: /\b(chest pain|chest pressure|chest tightness|crushing chest|heart attack|radiating to (my )?(left arm|jaw|neck|back)|cardiac arrest)\b/i,
    title: '🚨 CRITICAL: Potential Cardiac Emergency Detected',
    guidance: 'Chest pain or pressure radiating to the arm, jaw, or neck may indicate an acute myocardial infarction (heart attack). Every second counts.',
    actions: [
      'Call emergency medical services immediately: 112 / 108 (India) or 911 (US).',
      'Do not attempt to drive yourself to the hospital.',
      'Chew an adult aspirin (325mg) if advised by emergency dispatchers and you have no aspirin allergy.',
      'Sit comfortably and rest while awaiting paramedics.'
    ]
  },
  {
    category: 'respiratory',
    regex: /\b(can't breathe|cannot breathe|struggling to breathe|severe shortness of breath|gasping for air|blue (lips|face|fingernails)|choking|suffocating)\b/i,
    title: '🚨 CRITICAL: Severe Respiratory Distress Detected',
    guidance: 'Inability to breathe comfortably, gasping, or blue-tinted lips/skin indicates severe oxygen deprivation requiring urgent paramedics.',
    actions: [
      'Call emergency services immediately: 112 / 108 (India) or 911 (US).',
      'Sit upright and loosen all tight collar/chest clothing.',
      'Use prescribed rescue bronchodilator (e.g. Albuterol) if you have an asthma or COPD diagnosis.',
      'Do not lie flat.'
    ]
  },
  {
    category: 'neurological',
    regex: /\b(face drooping|arm weakness|slurred speech|sudden numbness|one side of (my )?body|stroke|thunderclap headache|sudden paralysis|loss of vision in one eye)\b/i,
    title: '🚨 CRITICAL: Potential Acute Stroke (F.A.S.T.) Detected',
    guidance: 'Sudden facial droop, arm weakness, or slurred speech are acute stroke signs requiring immediate emergency room arrival for time-sensitive thrombolytic therapy.',
    actions: [
      'Call emergency services immediately: 112 / 108 (India) or 911 (US).',
      'Record the exact time symptoms first began (critical for ER treatment eligibility).',
      'Do not eat, drink, or ingest medications (risk of choking).',
      'Keep the person calm and supported.'
    ]
  },
  {
    category: 'anaphylaxis',
    regex: /\b(throat swelling|tongue swelling|airway closing|severe allergic reaction|anaphylaxis|throat is closing)\b/i,
    title: '🚨 CRITICAL: Potential Anaphylaxis (Severe Allergic Reaction)',
    guidance: 'Airway constriction or tongue/throat swelling following a sting, food, or medication requires immediate epinephrine injection.',
    actions: [
      'Use an Epinephrine Auto-Injector (EpiPen) into outer mid-thigh if available.',
      'Call emergency services: 112 / 108 (India) or 911 (US) immediately.',
      'Lie flat with legs elevated unless breathing is easier sitting up.'
    ]
  },
  {
    category: 'crisis',
    regex: /\b(want to kill myself|suicide|end my life|want to die|harming myself|hang myself|overdose on pills)\b/i,
    title: '❤️ URGENT: Crisis Support & Mental Health Lifeline',
    guidance: 'You are valuable and help is available right now. Connect with trained, compassionate crisis counselors 24/7.',
    actions: [
      'National Tele-MANAS (India): Call 14416 or 1800-891-4416 (Toll-Free, 24/7).',
      '988 Suicide & Crisis Lifeline (US & Canada): Dial 988 (Call or Text, 24/7).',
      'Vandrevala Foundation (India): +91 9999 666 555 (24/7 Free Counseling).'
    ]
  }
];

export function detectEmergency(text) {
  if (!text || typeof text !== 'string') return null;

  for (const rule of EMERGENCY_RULES) {
    if (rule.regex.test(text)) {
      return {
        isEmergency: true,
        category: rule.category,
        title: rule.title,
        guidance: rule.guidance,
        actions: rule.actions,
        disclaimer: 'MediMate AI cannot and does not contact emergency services for you. Please dial 112 / 108 / 911 directly.'
      };
    }
  }

  return null;
}
