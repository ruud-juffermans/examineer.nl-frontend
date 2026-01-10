import { RequestHandler } from 'express';
import { assignmentsHandler } from '../handlers/assignments.handler.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getAvailableExams: RequestHandler = asyncHandler(async (req, res) => {
  const result = await assignmentsHandler.getAvailableExams(req.user!.userId);
  res.json(result);
});

export const assignmentsController = {
  getAvailableExams,
};
