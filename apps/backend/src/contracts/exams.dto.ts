import { z } from 'zod';

export const createExamSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const updateExamSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const assignStudentsSchema = z.object({
  studentIds: z.array(z.number().int().positive()),
});

export type CreateExamDto = z.infer<typeof createExamSchema>;
export type UpdateExamDto = z.infer<typeof updateExamSchema>;
export type AssignStudentsDto = z.infer<typeof assignStudentsSchema>;
