import { RequestHandler } from 'express';
import { questionsHandler } from '../handlers/questions.handler.js';
import { updateQuestionSchema } from '../contracts/questions.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../errors/httpErrors.js';
import { ZodError } from 'zod';

const update: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const questionId = parseInt(req.params.id!, 10);
    const data = updateQuestionSchema.parse(req.body);
    const result = await questionsHandler.update(questionId, req.user!.userId, data);
    res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const deleteQuestion: RequestHandler = asyncHandler(async (req, res) => {
  const questionId = parseInt(req.params.id!, 10);
  await questionsHandler.delete(questionId, req.user!.userId);
  res.status(204).send();
});

export const questionsController = {
  update,
  delete: deleteQuestion,
};
