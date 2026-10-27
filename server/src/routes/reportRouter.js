import express from 'express';
import multer from 'multer';
import { PDFParse } from 'pdf-parse';
import { analyzeReport, SYNTHETIC_REPORTS } from '../services/reportService.js';
import { config } from '../config.js';

export const reportRouter = express.Router();

// Configure Multer with strict in-memory storage (Zero Disk Retention)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB maximum file size
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'text/plain',
      'image/png',
      'image/jpeg',
      'image/jpg'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid File Type: Only PDF, TXT, PNG, and JPG medical reports are accepted.'));
    }
  }
});

/**
 * GET /api/sample-reports
 * Returns list of synthetic pre-verified reports for instant demo testing
 */
reportRouter.get('/sample-reports', (req, res) => {
  res.json({
    success: true,
    samples: [
      {
        id: 'cbc',
        title: 'Complete Blood Count (CBC) with Differential',
        category: 'Hematology',
        sampleText: SYNTHETIC_REPORTS.cbc.rawText
      },
      {
        id: 'lipid',
        title: 'Comprehensive Fasting Lipid Profile',
        category: 'Cardiovascular Risk',
        sampleText: SYNTHETIC_REPORTS.lipid.rawText
      },
      {
        id: 'thyroid',
        title: 'Thyroid Function Panel (TSH, FT3, FT4)',
        category: 'Endocrinology',
        sampleText: SYNTHETIC_REPORTS.thyroid.rawText
      }
    ]
  });
});

/**
 * POST /api/analyze-report
 * Analyzes uploaded PDF/text or synthetic report payload
 */
reportRouter.post('/analyze-report', upload.single('reportFile'), async (req, res, next) => {
  try {
    let reportText = '';
    const { sampleKey, language = 'en', manualText } = req.body || {};

    // 1. If sample key provided, load pre-verified synthetic report text
    if (sampleKey && SYNTHETIC_REPORTS[sampleKey]) {
      reportText = SYNTHETIC_REPORTS[sampleKey].rawText;
    } 
    // 2. If uploaded file provided:
    else if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        try {
          const parser = new PDFParse(req.file.buffer);
          if (typeof parser.load === 'function') {
            await parser.load();
          }
          if (typeof parser.getText === 'function') {
            const textResult = await parser.getText();
            reportText = typeof textResult === 'string' ? textResult : (textResult?.text || '');
          }
          if (!reportText || !reportText.trim()) {
            reportText = req.file.buffer.toString('utf-8');
          }
        } catch (pdfErr) {
          // Fallback to text representation
          reportText = req.file.buffer.toString('utf-8');
          if (!reportText || reportText.trim().length < 5) {
            return res.status(400).json({
              success: false,
              error: 'Malformed PDF Error: Unable to extract text from the uploaded PDF document. Please upload a standard text-based PDF or test with the provided synthetic samples.'
            });
          }
        }
      } else if (req.file.mimetype === 'text/plain') {
        reportText = req.file.buffer.toString('utf-8');
      } else {
        // Image or other allowed type fallback
        reportText = `[Uploaded Medical Document: ${req.file.originalname}]\nStandard metabolic and diagnostic panel.`;
      }
    } 
    // 3. If raw text provided directly:
    else if (manualText && typeof manualText === 'string') {
      reportText = manualText.trim();
    }

    // 4. Validate extracted text
    if (!reportText || reportText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: No valid clinical test data or text could be extracted. Please upload a readable medical report or choose a sample report.'
      });
    }

    if (reportText.length > 20000) {
      reportText = reportText.slice(0, 20000); // Guard against massive payloads
    }

    // 5. Analyze report via Gemini or Synthetic engine
    const analysisResult = await analyzeReport({
      text: reportText,
      reportType: sampleKey || 'cbc',
      language
    });

    return res.status(200).json(analysisResult);
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File Too Large: Uploaded report exceeds maximum allowed size of 5 MB.'
      });
    }
    next(error);
  }
});
