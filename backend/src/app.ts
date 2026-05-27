import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';

const app: Application = express();

// ==========================================
// 1. Global Middlewares
// ==========================================

// Helmet for setting security headers
app.use(helmet());

// CORS setup
app.use(
  cors({
    origin: '*', // Adjust to specific domains in production if needed
    credentials: true,
  })
);

// Morgan for logging HTTP requests
const morganFormat = env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganFormat));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
