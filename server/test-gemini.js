import { config } from './src/config.js';
import { generateHealthResponse } from './src/services/geminiService.js';

console.log('----------------------------------------------------');
console.log('🩺 Testing MediMate AI Gemini Integration');
console.log(`Model: ${config.geminiModel}`);
console.log(`Live Key Configured: ${config.isLiveGeminiEnabled() ? 'YES' : 'NO'}`);
console.log(`Regional Language: ${config.regionalLanguageName} (${config.regionalLanguage})`);
console.log('----------------------------------------------------');

async function runTests() {
  console.log('\n[1/3] Testing English query: "What are common signs of seasonal dehydration?"...');
  const resEn = await generateHealthResponse({
    message: 'What are common signs of seasonal dehydration?',
    language: 'en',
    category: 'symptoms'
  });
  console.log(`Status: SUCCESS | Mode: ${resEn.mode.toUpperCase()} (isDemo: ${resEn.isDemo})`);
  console.log(`Summary: ${resEn.data.summary.slice(0, 120)}...`);
  console.log(`Clarifying Questions: ${resEn.data.clarifyingQuestions?.length || 0} formulated`);
  console.log(`Key Points: ${resEn.data.keyPoints?.length || 0} extracted`);

  console.log('\n[2/3] Testing Hindi query: "सिरदर्द और आंखों में खिंचाव के लिए क्या सलाह है?"...');
  const resHi = await generateHealthResponse({
    message: 'सिरदर्द और आंखों में खिंचाव के लिए क्या सलाह है?',
    language: 'hi',
    category: 'symptoms'
  });
  console.log(`Status: SUCCESS | Mode: ${resHi.mode.toUpperCase()} (isDemo: ${resHi.isDemo})`);
  console.log(`Summary: ${resHi.data.summary.slice(0, 100)}...`);

  console.log('\n[3/3] Testing Regional (${config.regionalLanguageName}) query: "रक्तदाब नियंत्रित ठेवण्यासाठी काय उपाय करावेत?"...');
  const resReg = await generateHealthResponse({
    message: 'रक्तदाब नियंत्रित ठेवण्यासाठी काय उपाय करावेत?',
    language: config.regionalLanguage,
    category: 'cardio'
  });
  console.log(`Status: SUCCESS | Mode: ${resReg.mode.toUpperCase()} (isDemo: ${resReg.isDemo})`);
  console.log(`Summary: ${resReg.data.summary.slice(0, 100)}...`);

  console.log('\n----------------------------------------------------');
  if (config.isLiveGeminiEnabled()) {
    console.log('✅ Real Google Gemini API is ACTIVE and returning live structured outputs.');
  } else {
    console.log('⚠️ Demo mode is ACTIVE. To activate live Gemini inference:');
    console.log('   1. Get an API key from Google AI Studio: https://aistudio.google.com/');
    console.log('   2. Set GEMINI_API_KEY in server/.env');
    console.log('   3. Restart the server (pnpm --filter medimate-server start)');
  }
  console.log('----------------------------------------------------\n');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
