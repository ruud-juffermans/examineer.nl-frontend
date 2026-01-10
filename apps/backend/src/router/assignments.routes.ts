import { Router } from 'express';
import { assignmentsController } from '../controllers/assignments.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

export const assignmentsRouter = Router();

// All assignment routes require authentication
assignmentsRouter.use(authenticate);

// Student-only routes
assignmentsRouter.get('/', requireRole('student'), assignmentsController.getAvailableExams);
