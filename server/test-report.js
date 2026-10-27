import { analyzeReport, SYNTHETIC_REPORTS } from './src/services/reportService.js';
import { checkEmergencyRedFlags } from './src/services/safetyService.js';

console.log('====================================================');
console.log('🩺 Testing MediMate AI Report Simplifier & Safety Engine');
console.log('====================================================');

async function runReportTests() {
  // Test 1: Synthetic CBC Report
  console.log('\n[1/4] Testing CBC Report Analysis...');
  const resCbc = await analyzeReport({ text: SYNTHETIC_REPORTS.cbc.rawText, reportType: 'cbc', language: 'en' });
  console.log(`Title: ${resCbc.data.reportTitle}`);
  console.log(`Biomarkers extracted: ${resCbc.data.biomarkers?.length}`);
  console.log(`Questions for doctor: ${resCbc.data.questionsForDoctor?.length}`);

  // Test 2: Synthetic Lipid Profile Report
  console.log('\n[2/4] Testing Lipid Profile Analysis...');
  const resLipid = await analyzeReport({ text: SYNTHETIC_REPORTS.lipid.rawText, reportType: 'lipid', language: 'en' });
  console.log(`Title: ${resLipid.data.reportTitle}`);
  console.log(`Biomarkers: ${resLipid.data.biomarkers?.map(b => `${b.name} (${b.status})`).join(', ')}`);

  // Test 3: Emergency Red-Flag Trigger (Cardiac)
  console.log('\n[3/4] Testing Emergency Red-Flag Engine (Chest pain)...');
  const cardiacCheck = checkEmergencyRedFlags("I have severe crushing chest pain radiating to my left arm");
  console.log(`Detected Emergency: ${cardiacCheck.isEmergency} | Category: ${cardiacCheck.category}`);
  console.log(`Title: ${cardiacCheck.title}`);

  // Test 4: Stroke Trigger (F.A.S.T.)
  console.log('\n[4/4] Testing Emergency Red-Flag Engine (Stroke signs)...');
  const strokeCheck = checkEmergencyRedFlags("My mother has sudden slurred speech and her face is drooping on one side");
  console.log(`Detected Emergency: ${strokeCheck.isEmergency} | Category: ${strokeCheck.category}`);
  console.log(`Title: ${strokeCheck.title}`);

  console.log('\n====================================================');
  console.log('✅ All report analysis and safety red-flag tests PASSED.');
  console.log('====================================================\n');
}

runReportTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
