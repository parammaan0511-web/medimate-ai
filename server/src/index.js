import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { healthChatRouter } from './routes/healthChat.js';
import { reportRouter } from './routes/reportRouter.js';

const app = express();

// 1. Security & CORS configuration
app.use(cors({
  origin: true, // Allow frontend dev server and local clients
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Strict body parser limits (prevent oversized payloads)
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// 3. Basic IP Rate Limiting for health queries
const apiLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate Limit Exceeded: Too many health inquiries received from this IP. Please wait a minute before submitting again.'
  }
});

// Apply rate limiter to /api routes
app.use('/api', apiLimiter);

// 4. Mount API Routes
app.use('/api', healthChatRouter);
app.use('/api', reportRouter);

// 5. Root health ping
app.get('/', (req, res) => {
  res.json({
    app: 'MediMate AI Backend Service',
    status: 'healthy',
    mode: config.isLiveGeminiEnabled() ? 'live' : 'demo',
    model: config.geminiModel,
    version: '1.0.0'
  });
});

// 6. 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint ${req.method} ${req.originalUrl} not found.`
  });
});

// 7. Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);

  const statusCode = err.status || err.statusCode || 500;
  const clientMessage = statusCode === 500 
    ? 'Internal server error occurred while processing health request.'
    : err.message || 'An error occurred.';

  res.status(statusCode).json({
    success: false,
    error: clientMessage,
    mode: config.isLiveGeminiEnabled() ? 'live' : 'demo'
  });
});

// Start Express server
const server = app.listen(config.port, () => {
  console.log('====================================================');
  console.log(`🩺 MediMate AI Server running on port ${config.port}`);
  console.log(`🤖 Configured Gemini Model: ${config.geminiModel}`);
  console.log(`🔒 Live Gemini API Key: ${config.isLiveGeminiEnabled() ? 'ACTIVE (Live Mode)' : 'NOT SET (Demo Mode Active)'}`);
  console.log(`🌐 Regional Language: ${config.regionalLanguageName} (${config.regionalLanguage})`);
  console.log(`⏱️ Request Timeout: ${config.requestTimeoutMs}ms | Rate Limit: ${config.rateLimitMax} req/${config.rateLimitWindowMs/1000}s`);
  console.log('====================================================');
});

export default app;
