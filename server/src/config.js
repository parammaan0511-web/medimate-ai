import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  port: parseInt(process.env.PORT, 10) || 5001,
  geminiApiKey: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '',
  geminiModel: process.env.GEMINI_MODEL ? process.env.GEMINI_MODEL.trim() : 'gemini-2.5-flash',
  regionalLanguage: process.env.DEFAULT_REGIONAL_LANGUAGE ? process.env.DEFAULT_REGIONAL_LANGUAGE.trim() : 'mr',
  regionalLanguageName: process.env.DEFAULT_REGIONAL_LANGUAGE_NAME ? process.env.DEFAULT_REGIONAL_LANGUAGE_NAME.trim() : 'Marathi (मराठी)',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10) || 30,
  requestTimeoutMs: parseInt(process.env.REQUEST_TIMEOUT_MS, 10) || 25000,
  
  isLiveGeminiEnabled: () => {
    return Boolean(config.geminiApiKey && config.geminiApiKey.length > 10 && !config.geminiApiKey.includes('your_api_key_here'));
  }
};
