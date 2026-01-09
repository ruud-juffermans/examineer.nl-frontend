import { Router } from 'express';
import { questionsController } from '../controllers/questions.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

export const questionsRouter = Router();

questionsRouter.use(authenticate);
questionsRouter.use(requireRole('teacher'));

questionsRouter.put('/:id', questionsController.update);
questionsRouter.delete('/:id', questionsController.delete);
