/**
 * Independent Clinical Safety & Emergency Red-Flag Detection Service
 * Evaluates patient queries for acute, life-threatening symptoms BEFORE/ALONGSIDE LLM inference.
 */

const EMERGENCY_PATTERNS = [
  {
    category: 'cardiac',
    regex: /\b(chest pain|chest pressure|chest tightness|crushing chest|heart attack|radiating to (my )?(left arm|jaw|neck|back)|cardiac arrest)\b/i,
    title: '🚨 CRITICAL: Potential Cardiac Emergency Detected',
    guidance: 'Chest pain or pressure radiating to the arm, jaw, or neck can indicate acute myocardial infarction (heart attack). Every minute matters.',
    actions: [
      'Call emergency medical services immediately: 112 / 108 (India) or 911 (US).',
      'Do not attempt to drive yourself to the hospital.',
      'Chew an adult aspirin (325mg) if advised by emergency dispatchers and you have no aspirin allergy.',
      'Rest in a comfortable seated position with knees bent.'
    ]
  },
  {
    category: 'respiratory',
    regex: /\b(can't breathe|cannot breathe|struggling to breathe|severe shortness of breath|gasping for air|blue (lips|face|fingernails)|choking|suffocating)\b/i,
    title: '🚨 CRITICAL: Severe Respiratory Distress Detected',
    guidance: 'Severe shortness of breath, cyanosis (blue lips/skin), or inability to speak full sentences is a medical emergency requiring immediate oxygenation support.',
    actions: [
      'Call emergency services immediately: 112 / 108 (India) or 911 (US).',
      'Sit upright and loosen any restrictive clothing around the neck and chest.',
      'Use prescribed rescue inhaler (e.g., Albuterol) if you have asthma/COPD.',
      'Do not lie flat.'
    ]
  },
  {
    category: 'neurological',
    regex: /\b(face drooping|arm weakness|slurred speech|sudden numbness|one side of (my )?body|stroke|thunderclap headache|sudden paralysis|loss of vision in one eye)\b/i,
    title: '🚨 CRITICAL: Potential Acute Stroke or Neurological Emergency',
    guidance: 'Sudden facial droop, one-sided body weakness, or slurred speech (F.A.S.T.) are hallmark indicators of acute stroke. Immediate clot-dissolving treatment requires rapid ER arrival.',
    actions: [
      'Call emergency services immediately: 112 / 108 (India) or 911 (US).',
      'Note the exact time symptoms first started (critical for hospital treatment eligibility).',
      'Do not eat, drink, or take any medication.',
      'Keep the person lying flat with head slightly elevated if comfortable.'
    ]
  },
  {
    category: 'anaphylaxis',
    regex: /\b(throat swelling|tongue swelling|airway closing|severe allergic reaction|anaphylaxis|throat is closing)\b/i,
    title: '🚨 CRITICAL: Potential Anaphylaxis (Severe Allergic Reaction)',
    guidance: 'Airway swelling accompanied by difficulty breathing is a life-threatening allergic emergency requiring immediate epinephrine.',
    actions: [
      'Administer an Epinephrine Auto-Injector (EpiPen) into the outer thigh immediately if available.',
      'Call emergency services: 112 / 108 (India) or 911 (US) right away.',
      'Lie flat with legs elevated unless breathing is easier sitting up.',
      'Stay away from the suspected allergen.'
    ]
  },
  {
    category: 'trauma',
    regex: /\b(spurting blood|uncontrolled bleeding|severe bleeding|stab wound|gunshot|head trauma and vomiting|passed out and won't wake up)\b/i,
    title: '🚨 CRITICAL: Severe Hemorrhage or Major Trauma',
    guidance: 'Severe arterial bleeding, unconsciousness following trauma, or severe injury requires immediate paramedic intervention.',
    actions: [
      'Call emergency services immediately: 112 / 108 (India) or 911 (US).',
      'Apply firm, continuous direct pressure to the bleeding wound using a clean cloth.',
      'Do not remove impaled objects.',
      'Keep the patient warm and still to prevent shock.'
    ]
  },
  {
    category: 'crisis',
    regex: /\b(want to kill myself|suicide|end my life|want to die|harming myself|hang myself|overdose on pills)\b/i,
    title: '❤️ URGENT: Crisis Support & Mental Health Lifeline',
    guidance: 'You are not alone, and compassionate, confidential help is available 24/7. Please connect with crisis professionals immediately.',
    actions: [
      'Call National Tele-MANAS (India): 14416 or 1800-891-4416 (Toll-Free, 24/7).',
      'Call 988 Suicide & Crisis Lifeline (US & Canada): Dial 988 (24/7, Call or Text).',
      'Call Vandrevala Foundation (India): +91 9999 666 555.',
      'Reach out to a trusted loved one, family member, or healthcare professional right now.'
    ]
  }
];

/**
 * Scans text for life-threatening emergency warning signs
 * @param {string} text - User input string
 * @returns {object} Safety evaluation result
 */
export function checkEmergencyRedFlags(text) {
  if (!text || typeof text !== 'string') {
    return { isEmergency: false };
  }

  for (const pattern of EMERGENCY_PATTERNS) {
    if (pattern.regex.test(text)) {
      return {
        isEmergency: true,
        category: pattern.category,
        title: pattern.title,
        guidance: pattern.guidance,
        actions: pattern.actions,
        disclaimer: 'MediMate AI does not contact emergency services for you. Please dial 112 / 108 / 911 directly.'
      };
    }
  }

  return { isEmergency: false };
}
