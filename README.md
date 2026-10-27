# MediMate AI — AI-Powered Healthcare Information Assistant

> **Hackathon MVP Submission**  
> **Tech Stack**: React 19, Vite, Tailwind CSS v4, Node.js, Express, Official Google Gen AI SDK (`@google/genai`)

MediMate AI is an evidence-based clinical information assistant designed to provide plain-language health explanations, laboratory report simplification, guided symptom triage, and preventive care reminders.

---

## 🏛️ System Architecture & Security Perimeter

```
┌──────────────────────────────────────────────┐              ┌────────────────────────────────────────────┐
│         Frontend (React 19 + Vite)           │              │          Backend (Node.js + Express)       │
│  - Zero API Key Exposure (Client Shielded)   │     POST     │  - IP Rate Limiting (express-rate-limit)   │
│  - Vite Proxy: /api ──────> :5001            │ ───────────> │  - Strict Input Limits (3 - 1,500 chars)   │
│  - Full Conversational Chat UI               │   /api/      │  - Request Timeout (25s Abort Race)        │
│  - Multilingual Engine (EN, HI, MR)          │  health-     │  - Independent Emergency Red-Flag Engine   │
│  - Rule-Based Triage & Emergency Alerts      │   chat       │  - Official @google/genai SDK (v2.31.0)    │
│  - LocalStorage Reminders (No Cloud Leak)    │ <─────────── │  - Ephemeral In-Memory PDF Parser (Multer) │
└──────────────────────────────────────────────┘              └────────────────────────────────────────────┘
                                                                             │
                                                                             ▼
                                                              ┌────────────────────────────────────────────┐
                                                              │             Google Gemini API              │
                                                              │     (gemini-2.5-flash / gemini-2.0-flash)  │
                                                              │     Structured JSON Clinical Outputs       │
                                                              └────────────────────────────────────────────┘
```

### Key Security & Clinical Principles
1. **Zero Client Secrets**: `GEMINI_API_KEY` exists exclusively inside `server/.env`.
2. **Independent Emergency Interception**: A conservative rule-based engine screens inputs for heart attacks, acute strokes (F.A.S.T.), respiratory distress, and anaphylaxis *independently of and prior to LLM generation*.
3. **Transparent Demo Mode**: When the API key is not present or an upstream network error occurs, the UI explicitly flags responses as `DEMO MODE (Synthetic Preview)`. Mock responses are **never** misrepresented as live AI responses.
4. **Clinical Boundaries**: Adheres strictly to non-prescriptive health education: no definitive diagnoses, no alteration of prescription dosages, explicit acknowledgment of uncertainty, and proactive physician escalation.

---

## 🚀 Quickstart: Exact Commands to Install, Run & Test

### 1. Prerequisites
- **Node.js** v18+ (tested on v24)
- **pnpm** (or `npm`)

### 2. Installation
```bash
# In the project root (c:\Users\asus\Desktop\imd care):
pnpm install

# In the server directory:
cd server
pnpm install --dangerously-allow-all-builds
cd ..
```

### 3. Environment Setup
```bash
# In the server/ directory:
# Copy the example file to .env
cp server/.env.example server/.env   # or 'copy server\.env.example server\.env' on Windows
```

Edit `server/.env`:
```ini
PORT=5001
GEMINI_API_KEY=your_actual_api_key_here   # Optional for demo mode; required for live Gemini inference
GEMINI_MODEL=gemini-2.5-flash
DEFAULT_REGIONAL_LANGUAGE=mr
DEFAULT_REGIONAL_LANGUAGE_NAME=Marathi (मराठी)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=30
REQUEST_TIMEOUT_MS=25000
```

### 4. Running the Application

Open two terminal windows:

#### Terminal 1 — Start the Backend Server (Port 5001):
```bash
pnpm run server
```

#### Terminal 2 — Start the Frontend Dev Server (Port 5173):
```bash
pnpm run dev
```

Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 5. Running the Automated Test Suite
```bash
# Run both Gemini chat tests and Report/Safety unit tests:
pnpm run test
```

---

## 🧪 8-Scenario Testing Checklist (For Hackathon Judges)

| # | Scenario | How to Test | Expected Behavior |
| :--- | :--- | :--- | :--- |
| **1** | **General Health Question in English** | Navigate to **AI Health Assistant**, type *"What causes tension headaches after staring at screens?"*, click Submit. | Returns structured plain-language summary, clinical key points, 3 clarifying questions, recommended actions, and disclaimer. |
| **2** | **Health Question in Hindi** | Click **[हिन्दी]** in the top bar, ask *"सिरदर्द और आंखों में खिंचाव के लिए क्या सलाह है?"*. | Returns a fully synthesized response in natural, respectful Hindi medical terminology. |
| **3** | **Explain a Medical Report** | Navigate to **Report Simplifier**, click **"Complete Blood Count (CBC)"** sample button. | Instantly extracts test names, preserved units (`g/dL`, `/mcL`), reference ranges, status pills (Normal/Low), plain-language breakdown, and questions for doctor. |
| **4** | **Incomplete or Invalid Input** | Submit an empty input or a 1-letter query `"a"`. | Client and server block submission with a `400 Bad Request` validation message: *"Inquiry must be at least 3 characters long."* |
| **5** | **Simulate API Outage / Missing Key** | Set `GEMINI_API_KEY=` in `server/.env` and ask any question. | Gracefully falls back to a clearly marked `⚠️ DEMO MODE` banner explaining the synthetic preview; application never crashes. |
| **6** | **Emergency Warning Scenario** | Type *"I have severe crushing chest pain radiating to my left arm"*. | **Instant emergency takeover**: Safety rules immediately trigger `🚨 CRITICAL: Potential Cardiac Emergency Detected` with a direct call button (`112 / 108`) and notice that AI does not call 911 for you. |
| **7** | **Create & Complete a Reminder** | In **Preventive Care**, click **"Add Reminder"**, enter *"Drink 500ml water"*, select Hydration, click Save. Check it off. | The reminder persists across page refreshes via `localStorage` with a clear `User Reminder` badge. |
| **8** | **Mobile Responsiveness** | Resize browser window to mobile width (<768px). | Desktop sidebar collapses into an accessible slide-out drawer with hamburger menu; tables and cards adapt seamlessly to touch screens. |

---

## 📊 One-Slide Impact & Adoption Plan

### Problem & Market Need
- **Health Literacy Crisis**: Over 60% of patients do not understand diagnostic laboratory reports or discharge medication instructions.
- **Doctor Burnout**: General practitioners spend up to 40% of consultation time answering repetitive basic physiological questions.
- **Triage Delay**: Patients frequently search unvetted forums, either underestimating acute red-flag symptoms or overreacting to benign variations.

### Solution & Value Proposition
- **Accessible Comprehension**: Translates complex biomarkers (CBC, Lipid Panel, TSH) into patient-friendly explanations with structured questions to empower doctor visits.
- **Conservative Guardrails**: Independent emergency interception directs acute cardiac, stroke, and anaphylaxis signs to paramedics immediately.
- **Multilingual Equity**: Native support for English, Hindi, and regional languages (Marathi) bridging the linguistic divide in digital healthcare.

### Phased Adoption Roadmap
1. **Phase 1 (Month 1–3) — Clinical Pilot**: Deploy MediMate AI in outpatient clinic waiting rooms on tablet kiosks for pre-consultation report simplification.
2. **Phase 2 (Month 4–6) — Hospital EMR Integration**: Integrate FHIR / HL7 APIs with diagnostic diagnostic chains (e.g., Metropolis, Apollo, Thyrocare) for automated patient summaries alongside lab PDFs.
3. **Phase 3 (Month 7–12) — Primary Care Network**: Partner with public health centers (PHCs) for vernacular voice-based health education and preventive care scheduling.

---

## ⏱️ 45–90 Second Content Video Script

**[Visual: Screen recording begins on the MediMate AI Dashboard at `http://localhost:5173/`.]**

> **Voiceover (0:00 - 0:15)**:  
> *"When was the last time you received a medical lab report and actually understood what the numbers meant? Dense medical jargon leaves millions confused, anxious, or turning to unverified web searches. Meet **MediMate AI** — your secure, evidence-based healthcare information assistant powered by Google Gemini."*

**[Visual: Cursor clicks on "Report Simplifier" and clicks the "Complete Blood Count (CBC)" sample button.]**

> **Voiceover (0:15 - 0:35)**:  
> *"With one click, MediMate AI analyzes the diagnostic panel. It preserves the laboratory's original units and reference intervals, highlights low ferritin with visual indicators, and translates clinical findings into plain language. Best of all, it generates targeted questions you can ask your doctor at your next visit."*

**[Visual: User switches to the "AI Health Assistant" and types "I have crushing chest pain radiating to my left arm".]**

> **Voiceover (0:35 - 0:55)**:  
> *"Safety is our highest priority. Unlike ordinary chatbots, MediMate AI features an independent emergency red-flag engine. The moment a critical cardiac or stroke symptom is mentioned, it immediately prioritizes urgent emergency guidance with direct dial shortcuts to 112 and 108 — making it clear that AI never replaces paramedics."*

**[Visual: Switches language to हिन्दी, then demonstrates the Preventive Care reminder checklist.]**

> **Voiceover (0:55 - 1:15)**:  
> *"With native bilingual and regional language support, strict zero-data retention, and configurable preventive care reminders, MediMate AI bridges the gap between patient curiosity and professional care. MediMate AI: Clear facts. Zero guesswork. Physician first."*

---

## 🎤 5-Minute Hackathon Judging Presentation

### Minute 0:00 - 1:00 — Introduction & The Problem
- **Opening Hook**: "Judges, how many of us have Googled a symptom late at night, only to be told we have a terminal illness? Or opened a blood test with high cholesterol and had no idea what questions to ask our doctor?"
- **The Core Problem**: 
  - Laboratory reports are designed for pathologists, not patients.
  - LLMs hallucinate definitive diagnoses or make dangerous prescription assumptions when unconstrained.
- **Our Vision**: MediMate AI was built from the ground up to solve health literacy *responsibly*, with conservative physician-first guardrails.

### Minute 1:00 - 2:00 — Live Demonstration (Chat & Emergency Safety Engine)
- **Live Demo 1: Clinical Health Assistant**
  - Show query: *"What are non-medication ways to manage mild tension headaches?"*
  - Point out: The AI explains uncertainty, asks clarifying questions (onset, screen time, hydration), lists safe next steps, and adheres to strict JSON structure.
- **Live Demo 2: Independent Emergency Interception**
  - Enter an acute cardiac symptom: *"Chest tightness radiating to jaw"*.
  - Point out: The safety check executes *independently of Gemini*, immediately surfacing the emergency banner and 112/108 call actions. We never claim the AI calls emergency services for you.

### Minute 2:00 - 3:15 — Medical Report Simplifier & Preventive Care
- **Live Demo 3: Diagnostic Report Simplifier**
  - Click on the synthetic **Complete Blood Count (CBC)** or **Lipid Profile** sample.
  - Explain the extraction integrity: original units (`g/dL`, `mg/dL`) are preserved; reference ranges are never invented; status indicators highlight normal vs. low values.
  - Show the "Questions to Ask Your Clinician" section.
- **Live Demo 4: Preventive Care & Reminders**
  - Demonstrate adding a personal hydration reminder.
  - Point out the badge differentiation: `User Reminder` vs. `Clinical Guideline Suggestion`.
  - Explain local storage privacy: non-sensitive reminder alarms stay in browser memory.

### Minute 3:15 - 4:15 — Technical Architecture & Security
- **Full-Stack Stack**: React 19 frontend with Tailwind CSS v4, Express backend running the official `@google/genai` SDK.
- **Security Perimeter**:
  - `GEMINI_API_KEY` is completely isolated in `server/.env`.
  - Rate limiting (30 req/min), input caps (1,500 chars), and request timeouts (25s).
  - No client-side telemetry or report retention.
- **Graceful Failure & Transparent Demo Mode**:
  - If the Gemini API is offline or unkeyed, the app transparently flags demo mode. We never pretend a mock is a real API output.

### Minute 4:15 - 5:00 — Impact, Adoption & Conclusion
- **Impact**: Decreases pre-consultation patient anxiety, improves adherence to preventive screenings, and saves clinical triage hours.
- **Future Vision**: Expanding regional dialect models, integrating with EMR patient portals, and automated audio playback for low-literacy populations.
- **Closing**: "MediMate AI puts clinical safety first, empowering patients with knowledge and partnering with physicians to deliver better healthcare."

---

## ⚕️ Legal & Medical Compliance Notice

> **IMPORTANT DISCLAIMER**  
> MediMate AI is an informational and educational technology demonstration created for hackathon evaluation. It does not provide medical diagnoses, clinical treatment plans, or prescription dosage calculations. In the event of acute medical emergencies, immediately contact local emergency medical services:
> - **India**: `112` / `108`
> - **United States**: `911`
> - **International**: Contact your local emergency dispatch center.
