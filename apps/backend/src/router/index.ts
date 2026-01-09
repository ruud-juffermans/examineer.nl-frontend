import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { examsRouter } from './exams.routes.js';
import { questionsRouter } from './questions.routes.js';
import { attemptsRouter } from './attempts.routes.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/exams', examsRouter);
router.use('/questions', questionsRouter);
router.use('/attempts', attemptsRouter);
