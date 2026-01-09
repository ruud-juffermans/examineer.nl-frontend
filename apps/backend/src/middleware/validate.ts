import { RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { badRequest } from '../errors/httpErrors.js';

export const validate = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw badRequest(message, 'VALIDATION_ERROR');
      }
      throw error;
    }
  };
};
