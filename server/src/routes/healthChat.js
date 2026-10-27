import express from 'express';
import { generateHealthResponse } from '../services/geminiService.js';
import { checkEmergencyRedFlags } from '../services/safetyService.js';
import { config } from '../config.js';

export const healthChatRouter = express.Router();

/**
 * GET /api/health-status
 * Health check and configuration inspector
 */
healthChatRouter.get('/health-status', (req, res) => {
  res.json({
    status: 'online',
    appName: 'MediMate AI Backend',
    model: config.geminiModel,
    isLiveGeminiEnabled: config.isLiveGeminiEnabled(),
    mode: config.isLiveGeminiEnabled() ? 'live' : 'demo',
    supportedLanguages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi (हिन्दी)' },
      { code: config.regionalLanguage, name: config.regionalLanguageName }
    ],
    limits: {
      maxInputLength: 1500,
      timeoutMs: config.requestTimeoutMs
    }
  });
});

/**
 * POST /api/health-chat
 * Secure health inquiry consultation endpoint
 */
healthChatRouter.post('/health-chat', async (req, res, next) => {
  try {
    const { message, query, language, category } = req.body || {};

    const rawInput = (message || query || '').trim();

    // 1. Validation: presence check
    if (!rawInput) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Health question or symptom description is required.'
      });
    }

    // 2. Validation: length limits (3 to 1500 chars)
    if (rawInput.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Inquiry must be at least 3 characters long.'
      });
    }

    if (rawInput.length > 1500) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Inquiry exceeds maximum permitted length of 1,500 characters.'
      });
    }

    // 3. Language sanitization
    const validLanguages = ['en', 'hi', config.regionalLanguage];
    const sanitizedLanguage = validLanguages.includes(language) ? language : 'en';

    // 4. Category sanitization
    const sanitizedCategory = typeof category === 'string' && category.length <= 50 
      ? category 
      : 'general';

    // 5. Independent Conservative Emergency Red-Flag Check
    const emergencyCheck = checkEmergencyRedFlags(rawInput);

    // 6. Request timeout handling
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('REQUEST_TIMEOUT'));
      }, config.requestTimeoutMs);
    });

    const executionPromise = generateHealthResponse({
      message: rawInput,
      language: sanitizedLanguage,
      category: sanitizedCategory
    });

    // Race execution against timeout
    const result = await Promise.race([executionPromise, timeoutPromise]);

    // Attach independent emergency safety alert if detected
    if (emergencyCheck.isEmergency) {
      result.emergencyAlert = emergencyCheck;
    }

    return res.status(200).json(result);
  } catch (error) {
    if (error.message === 'REQUEST_TIMEOUT') {
      return res.status(504).json({
        success: false,
        error: 'Gateway Timeout: The AI model took too long to formulate a clinical response. Please try again.'
      });
    }

    next(error);
  }
});
