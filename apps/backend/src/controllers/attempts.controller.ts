import { RequestHandler } from 'express';
import { attemptsHandler } from '../handlers/attempts.handler.js';
import { saveAnswerSchema } from '../contracts/attempts.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../errors/httpErrors.js';
import { ZodError } from 'zod';

const saveAnswer: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const attemptId = parseInt(req.params.id!, 10);
    const data = saveAnswerSchema.parse(req.body);
    await attemptsHandler.saveAnswer(attemptId, req.user!.userId, data);
    res.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const submit: RequestHandler = asyncHandler(async (req, res) => {
  const attemptId = parseInt(req.params.id!, 10);
  const result = await attemptsHandler.submit(attemptId, req.user!.userId);
  res.json(result);
});

const getResult: RequestHandler = asyncHandler(async (req, res) => {
  const attemptId = parseInt(req.params.id!, 10);
  const result = await attemptsHandler.getResult(attemptId, req.user!.userId, req.user!.role);
  res.json(result);
});

export const attemptsController = {
  saveAnswer,
  submit,
  getResult,
};
