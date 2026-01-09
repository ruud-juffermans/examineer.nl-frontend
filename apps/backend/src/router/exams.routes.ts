import { Router } from 'express';
import { examsController } from '../controllers/exams.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleGuard.js';

export const examsRouter = Router();

// All exam routes require authentication
examsRouter.use(authenticate);

// Teacher-only routes
examsRouter.post('/', requireRole('teacher'), examsController.create);
examsRouter.get('/', examsController.list);
examsRouter.get('/:id', examsController.getById);
examsRouter.put('/:id', requireRole('teacher'), examsController.update);
examsRouter.post('/:id/publish', requireRole('teacher'), examsController.publish);
examsRouter.post('/:id/questions', requireRole('teacher'), examsController.addQuestion);
examsRouter.post('/:id/assign', requireRole('teacher'), examsController.assignStudents);

// Student routes
examsRouter.post('/:id/attempts', requireRole('student'), examsController.startAttempt);
