import { RequestHandler } from 'express';
import { authHandler } from '../handlers/auth.handler.js';
import { registerSchema, loginSchema } from '../contracts/auth.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../errors/httpErrors.js';
import { ZodError } from 'zod';

const register: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authHandler.register(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const login: RequestHandler = asyncHandler(async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authHandler.login(data);
    res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.errors.map((e) => e.message).join(', '), 'VALIDATION_ERROR');
    }
    throw error;
  }
});

const getCurrentUser: RequestHandler = asyncHandler(async (req, res) => {
  const user = await authHandler.getCurrentUser(req.user!.userId);
  res.json(user);
});

export const authController = {
  register,
  login,
  getCurrentUser,
};
