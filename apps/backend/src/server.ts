import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { router } from './router/index.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use(config.apiPrefix, router);

  // Error handling
  app.use(errorHandler);

  return app;
}
