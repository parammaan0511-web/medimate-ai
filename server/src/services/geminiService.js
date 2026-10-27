import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';

/**
 * Builds the clinical system instruction according to healthcare safety guidelines
 */
function buildSystemInstruction(targetLanguage) {
  const languageNames = {
    en: 'English',
    hi: 'Hindi (हिन्दी)',
    mr: 'Marathi (मराठी)',
    ta: 'Tamil (தமிழ்)',
    te: 'Telugu (తెలుగు)',
    bn: 'Bengali (বাংলা)',
    kn: 'Kannada (ಕನ್ನಡ)',
    gu: 'Gujarati (ગુજરાતી)'
  };

  const selectedLangName = languageNames[targetLanguage] || languageNames[config.regionalLanguage] || 'English';

  return `You are MediMate AI, a compassionate, accurate, and evidence-based clinical healthcare information assistant.

CORE CLINICAL COMMUNICATION MANDATES:
1. EXPLAIN IN SIMPLE LANGUAGE: Break down complex medical concepts, laboratory biomarkers, and physiological processes into clear, empathetic, plain-language explanations that anyone can understand.
2. ASK CLARIFYING QUESTIONS: Always formulate 2-3 relevant clinical clarifying questions that help contextualize the user's situation (e.g., symptom onset, duration, severity from 1-10, triggers, prior medical history, current medications).
3. AVOID DEFINITIVE DIAGNOSES: Never state "You have [Condition]". Instead, explain potential causes, differential possibilities, or physiological mechanisms using phrasing like "Symptoms like this can sometimes be associated with...".
4. AVOID PRESCRIPTION DECISIONS: Never prescribe specific dosages, change existing prescriptions, or recommend new prescription pharmaceuticals. You may discuss general over-the-counter principles and when to speak with a pharmacist.
5. EXPLAIN UNCERTAINTY: Explicitly state the limitations of digital health information and why clinical laboratory tests, physical examinations, and physician evaluation are necessary.
6. RECOMMEND QUALIFIED CARE: Clearly highlight when and how the user should consult a physician, and specify emergency red-flag symptoms that necessitate immediate care (112 / 108 / 911).
7. LANGUAGE REQUIREMENT: You MUST formulate the response ENTIRELY in ${selectedLangName}. If using Hindi or a regional language, use natural, culturally respectful terminology, and write medical terms in parentheses if helpful (e.g., "रक्तचाप (Blood Pressure)").

OUTPUT FORMAT:
You MUST respond with a valid JSON object matching the following structure:
{
  "summary": "Clear, compassionate plain-language explanation of the health query (1-2 paragraphs)",
  "keyPoints": [
    "Key medical or physiological insight 1",
    "Key medical or physiological insight 2",
    "Key medical or physiological insight 3"
  ],
  "clarifyingQuestions": [
    "Clarifying question about duration, onset, or severity",
    "Clarifying question about associated symptoms or medical history"
  ],
  "recommendedActions": [
    "Safe, evidence-based lifestyle or monitoring step",
    "Preparation for doctor visit or symptom diary step"
  ],
  "whenToSeekCare": "Specific warning signs and red flags that require immediate emergency triage or prompt physician consult.",
  "disclaimer": "MediMate AI provides health information, not a medical diagnosis. Always consult a licensed healthcare professional for clinical advice."
}`;
}

/**
 * Returns structured demonstration data for demo mode or API fallback.
 * Strictly labeled so it is never misrepresented as a real API response.
 */
function getSyntheticDemoResponse(userQuery, targetLanguage, reason) {
  const isHindi = targetLanguage === 'hi';
  const isRegional = targetLanguage === config.regionalLanguage && targetLanguage !== 'en' && targetLanguage !== 'hi';

  if (isHindi) {
    return {
      success: true,
      mode: 'demo',
      isDemo: true,
      demoNotice: '⚠️ प्रदर्शन मोड (Demo Mode): यह एक सिंथेटिक नमूना प्रतिक्रिया है क्योंकि जेमिनी एपीआई की (GEMINI_API_KEY) कॉन्फ़िगर नहीं है या अनुपलब्ध है। इसे वास्तविक लाइव एआई प्रतिक्रिया न समझें।',
      demoReason: reason,
      model: `${config.geminiModel} [Simulated Demo]`,
      language: 'hi',
      data: {
        summary: `आपके प्रश्न ("${userQuery.slice(0, 80)}...") के संबंध में: स्वास्थ्य संबंधी लक्षण विभिन्न शारीरिक कारकों से जुड़े हो सकते हैं। यह जानकारी सामान्य शैक्षिक उद्देश्यों के लिए है।`,
        keyPoints: [
          'लक्षणों की शुरुआत, अवधि और तीव्रता को ट्रैक करना डॉक्टर के लिए सबसे सहायक होता है।',
          'पर्याप्त जलपान (हाइड्रेशन), संतुलित आहार और पर्याप्त नींद स्वास्थ्य सुधार में महत्वपूर्ण भूमिका निभाते हैं।',
          'स्वयं से कोई नई प्रिस्क्रिप्शन दवा शुरू न करें; हमेशा योग्य डॉक्टर से परामर्श लें।'
        ],
        clarifyingQuestions: [
          'यह लक्षण कितने समय से बना हुआ है (दिन या सप्ताह)?',
          'क्या इस लक्षण के साथ बुखार, चक्कर आना या अत्यधिक कमजोरी भी महसूस हो रही है?',
          'क्या आप वर्तमान में कोई नियमित दवा ले रहे हैं?'
        ],
        recommendedActions: [
          'एक दैनिक लक्षण डायरी रखें जिसमें समय और तीव्रता नोट करें।',
          'गंभीर या बढ़ते लक्षणों के मामले में प्राथमिक स्वास्थ्य केंद्र या चिकित्सक से मिलें।'
        ],
        whenToSeekCare: 'यदि अचानक तेज दर्द, सांस लेने में तकलीफ, बोलने या चलने में असमर्थता, या 102°F से अधिक बुखार हो, तो तत्काल आपातकालीन सहायता (108 / 112) लें।',
        disclaimer: 'अस्वीकरण: मेडीमेट एआई केवल स्वास्थ्य जानकारी प्रदान करता है, कोई चिकित्सकीय निदान नहीं।'
      }
    };
  }

  if (isRegional) {
    return {
      success: true,
      mode: 'demo',
      isDemo: true,
      demoNotice: `⚠️ प्रादेशिक प्रात्यक्षिक मोड (Demo Mode - ${config.regionalLanguageName}): ही एक सिम्युलेटेड डेमो प्रतिक्रिया आहे. लाइव्ह जेमिनी API की कॉन्फिगर केलेली नाही.`,
      demoReason: reason,
      model: `${config.geminiModel} [Simulated Demo]`,
      language: config.regionalLanguage,
      data: {
        summary: `आपल्या प्रश्नासंदर्भात ("${userQuery.slice(0, 80)}..."): ही माहिती सामान्य आरोग्य शिक्षणासाठी आहे. अचूक निदानासाठी डॉक्टरांचा सल्ला आवश्यक आहे.`,
        keyPoints: [
          'लक्षणांची तीव्रता आणि कालावधी नोंदवून ठेवणे डॉक्टरांना निदान करण्यात मदत करते.',
          'योग्य विश्रांती आणि पाणी पिणे शरीरास बरे होण्यास मदत करते.',
          'कोणत्याही औषधाचा डोस डॉक्टरांच्या सल्ल्याशिवाय बदलू नका.'
        ],
        clarifyingQuestions: [
          'हे लक्षण नेमके कधीपासून जाणवत आहे?',
          'यासोबत ताप, मळमळ किंवा इतर काही त्रास होत आहे का?'
        ],
        recommendedActions: [
          'लक्षणांची नोंद ठेवा आणि डॉक्टरांना भेटताना दाखवा.',
          'आराम करा आणि हलका, पौष्टिक आहार घ्या.'
        ],
        whenToSeekCare: 'छातीत दुखणे, श्वास घेण्यास त्रास किंवा अचानक तीव्र वेदना झाल्यास त्वरित आपत्कालीन वैद्यकीय मदत (108 / 112) घ्या.',
        disclaimer: 'सूचना: मेडीमेट एआई केवळ आरोग्य माहिती पुरवते, कोणताही वैद्यकीय सल्ला किंवा निदान देत नाही.'
      }
    };
  }

  // Default English Demo Response
  return {
    success: true,
    mode: 'demo',
    isDemo: true,
    demoNotice: '⚠️ Demo Mode: This is a synthetic demonstration response because a valid GEMINI_API_KEY is not configured in server/.env (or the live API is currently unavailable). Do not treat this as real live Gemini output.',
    demoReason: reason,
    model: `${config.geminiModel} [Simulated Demo]`,
    language: 'en',
    data: {
      summary: `Regarding your inquiry ("${userQuery.slice(0, 90)}..."): In healthcare informatics, symptoms of this nature can reflect a variety of common, transient physiological processes or developing clinical conditions. Because digital tools cannot perform in-person physical examinations or diagnostic blood work, evaluating these factors with a licensed medical professional is paramount.`,
      keyPoints: [
        'Symptom trajectory (whether improving, worsening, or episodic) is one of the most valuable diagnostic indicators for clinicians.',
        'Hydration balance, sleep consistency, and recent dietary or stress changes frequently modulate symptom severity.',
        'Medications should always be verified against your personal allergy profile and organ function history before modification.'
      ],
      clarifyingQuestions: [
        'How long have you noticed this concern, and did it begin suddenly or gradually?',
        'On a scale from 1 to 10, how would you rate any discomfort or disruption to your daily routine?',
        'Are there any accompanying signs, such as fever, unexplained fatigue, or localized sensitivity?'
      ],
      recommendedActions: [
        'Maintain a brief symptom journal noting exact timing, potential triggers, and severity.',
        'Prepare your current medication and supplement list prior to speaking with your healthcare provider.',
        'Stay well-hydrated and avoid strenuous exertion until your baseline is re-evaluated.'
      ],
      whenToSeekCare: 'Seek urgent clinical or emergency attention (112 / 108 / 911) if you experience acute shortness of breath, sudden severe pain, neurological weakness, chest pressure, or sudden high fever.',
      disclaimer: 'MediMate AI provides health information, not a medical diagnosis. Always consult a licensed healthcare professional for clinical advice.'
    }
  };
}

/**
 * Executes a health consultation request through Google Gemini API
 */
export async function generateHealthResponse({ message, language = 'en', category = 'general' }) {
  const targetLanguage = ['en', 'hi', config.regionalLanguage].includes(language) 
    ? language 
    : 'en';

  // 1. Check if Live Gemini API key is configured
  if (!config.isLiveGeminiEnabled()) {
    return getSyntheticDemoResponse(
      message, 
      targetLanguage, 
      'GEMINI_API_KEY is missing or not set in server/.env'
    );
  }

  // 2. Initialize official @google/genai SDK
  const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  const systemInstruction = buildSystemInstruction(targetLanguage);

  const promptContent = `Patient Query: "${message}"
Inquiry Focus / Category: ${category}
Requested Response Language: ${targetLanguage}

Provide an evidence-based, compassionate, and structured clinical health response following your system instructions. Respond strictly in valid JSON format.`;

  try {
    // Generate content using configured model
    const response = await ai.models.generateContent({
      model: config.geminiModel,
      contents: promptContent,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.25,
      }
    });

    const textOutput = response?.text?.trim() || '';

    if (!textOutput) {
      throw new Error('Received empty text response from Gemini API.');
    }

    // Parse JSON response cleanly
    let parsedData;
    try {
      // Strip markdown code fences if present (e.g. ```json ... ```)
      const sanitized = textOutput
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/, '')
        .replace(/\s*```$/, '')
        .trim();
      parsedData = JSON.parse(sanitized);
    } catch (parseError) {
      // Graceful fallback if JSON parsing failed
      parsedData = {
        summary: textOutput,
        keyPoints: [
          'Consult a physician for individual health confirmation.',
          'Review questions with your clinical care team.'
        ],
        clarifyingQuestions: [
          'How long have you observed these symptoms?',
          'Are there any other associated changes in your energy or sleep?'
        ],
        recommendedActions: [
          'Document daily symptoms to discuss at your next appointment.'
        ],
        whenToSeekCare: 'Consult emergency services immediately if you experience acute chest pain, shortness of breath, or sudden severe weakness.',
        disclaimer: 'MediMate AI provides health information, not a medical diagnosis.'
      };
    }

    // Return genuine live API response
    return {
      success: true,
      mode: 'live',
      isDemo: false,
      model: config.geminiModel,
      language: targetLanguage,
      timestamp: new Date().toISOString(),
      data: {
        summary: parsedData.summary || 'Summary unavailable.',
        keyPoints: Array.isArray(parsedData.keyPoints) ? parsedData.keyPoints : [],
        clarifyingQuestions: Array.isArray(parsedData.clarifyingQuestions) ? parsedData.clarifyingQuestions : [],
        recommendedActions: Array.isArray(parsedData.recommendedActions) ? parsedData.recommendedActions : [],
        whenToSeekCare: parsedData.whenToSeekCare || 'Consult your physician if symptoms persist or worsen.',
        disclaimer: parsedData.disclaimer || 'MediMate AI provides health information, not a medical diagnosis.'
      }
    };
  } catch (error) {
    console.error('Gemini API execution error:', error?.message || error);

    // Graceful API failure state with clearly labeled demo mode
    return getSyntheticDemoResponse(
      message, 
      targetLanguage, 
      `Live Gemini API call failed: ${error?.message || 'Upstream error'}. Fallback demo activated.`
    );
  }
}
