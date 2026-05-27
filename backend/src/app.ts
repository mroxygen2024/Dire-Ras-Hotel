import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { apiLimiter } from './middlewares/rate-limit.middleware';
import { sanitizeMiddleware } from './middlewares/sanitize.middleware';
import authRoutes from './routes/auth.routes';
import hotelInfoRoutes from './routes/hotel-info.routes';
import heroSectionRoutes from './routes/hero-section.routes';
import roomRoutes from './routes/room.routes';
import serviceRoutes from './routes/service.routes';
import reviewRoutes from './routes/review.routes';
import contactPageRoutes from './routes/contact-page.routes';

const app: Application = express();

// ==========================================
// 1. Global Middlewares
// ==========================================

// 1. Helmet for setting robust security headers
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameAncestors: ["'none'"], // Prevent clickjacking
      },
    } : false, // Allow lenient CSP in development
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows frontend to request static media assets
    referrerPolicy: { policy: 'same-origin' },
    frameguard: { action: 'deny' }, // Shield against Clickjacking
  })
);

// 2. Secure CORS configuration using verified origin whitelist
const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error('CORS Policy violation: Origin not allowed.'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    maxAge: 86400, // Cache preflight requests for 24 hours to reduce server load
  })
);

// 3. Morgan for logging HTTP requests
const morganFormat = env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganFormat));

// 4. Global API Rate Limiter
app.use('/api', apiLimiter);

// 5. Payload size restrictions to prevent Buffer Overflow & DoS
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// 6. Deep XSS and input sanitization middleware
app.use(sanitizeMiddleware);

// ==========================================
// 2. Global Routes
// ==========================================

const apiRouter = express.Router();

// Health Check Route
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Register auth routes
apiRouter.use('/auth', authRoutes);

// Register hotel info routes
apiRouter.use('/', hotelInfoRoutes);

// Register hero section routes
apiRouter.use('/', heroSectionRoutes);

// Register room routes
apiRouter.use('/', roomRoutes);

// Register service routes
apiRouter.use('/', serviceRoutes);

// Register review routes
apiRouter.use('/', reviewRoutes);

// Register contact page routes
apiRouter.use('/', contactPageRoutes);

// Register all API routes with /api prefix
app.use('/api', apiRouter);

// ==========================================
// 3. Error Handlers
// ==========================================

// Unmatched route handler (404)
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;
