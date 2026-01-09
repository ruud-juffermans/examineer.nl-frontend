import { Router } from 'express';
import { attemptsController } from '../controllers/attempts.controller.js';
import { authenticate } from '../middleware/auth.js';

export const attemptsRouter = Router();

attemptsRouter.use(authenticate);

attemptsRouter.post('/:id/answers', attemptsController.saveAnswer);
attemptsRouter.post('/:id/submit', attemptsController.submit);
attemptsRouter.get('/:id/result', attemptsController.getResult);
