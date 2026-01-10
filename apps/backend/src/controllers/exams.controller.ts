import { RequestHandler } from 'express';
import { examsHandler } from '../handlers/exams.handler.js';
import { createExamSchema, updateExamSchema, assignStudentsSchema } from '../contracts/exams.dto.js';
import { createQuestionSchema } from '../contracts/questions.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../errors/httpErrors.js';
import { ZodError } from 'zod';

const create: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const data = createExamSchema.parse(req.body);
    const result = await examsHandler.create(req.user!.userId, data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const list: RequestHandler = asyncHandler(async (req, res) => {
  const exams = await examsHandler.list(req.user!.userId, req.user!.role);
  res.json(exams);
});

const getById: RequestHandler = asyncHandler(async (req, res) => {
  const examId = parseInt(req.params.id!, 10);
  const exam = await examsHandler.getById(examId, req.user!.userId, req.user!.role);
  res.json(exam);
});

const update: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const examId = parseInt(req.params.id!, 10);
    const data = updateExamSchema.parse(req.body);
    const result = await examsHandler.update(examId, req.user!.userId, data);
    res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const publish: RequestHandler = asyncHandler(async (req, res) => {
  const examId = parseInt(req.params.id!, 10);
  const result = await examsHandler.publish(examId, req.user!.userId);
  res.json(result);
});

const unpublish: RequestHandler = asyncHandler(async (req, res) => {
  const examId = parseInt(req.params.id!, 10);
  const result = await examsHandler.unpublish(examId, req.user!.userId);
  res.json(result);
});

const addQuestion: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const examId = parseInt(req.params.id!, 10);
    const data = createQuestionSchema.parse(req.body);
    const result = await examsHandler.addQuestion(examId, req.user!.userId, data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const assignStudents: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const examId = parseInt(req.params.id!, 10);
    const data = assignStudentsSchema.parse(req.body);
    await examsHandler.assignStudents(examId, req.user!.userId, data.studentIds);
    res.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const startAttempt: RequestHandler = asyncHandler(async (req, res) => {
  const examId = parseInt(req.params.id!, 10);
  const result = await examsHandler.startAttempt(examId, req.user!.userId);
  res.status(201).json(result);
});

const getQuestions: RequestHandler = asyncHandler(async (req, res) => {
  const examId = parseInt(req.params.id!, 10);
  const questions = await examsHandler.getQuestions(examId, req.user!.userId, req.user!.role);
  res.json(questions);
});

export const examsController = {
  create,
  list,
  getById,
  update,
  publish,
  unpublish,
  addQuestion,
  assignStudents,
  startAttempt,
  getQuestions,
};
