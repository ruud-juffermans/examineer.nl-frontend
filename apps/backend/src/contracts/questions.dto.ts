import { z } from 'zod';

const optionSchema = z.object({
  label: z.string().min(1, 'Option label is required'),
  isCorrect: z.boolean(),
});

export const createQuestionSchema = z.object({
  prompt: z.string().min(1, 'Question prompt is required'),
  points: z.number().positive().default(1),
  options: z
    .array(optionSchema)
    .min(2, 'At least 2 options required')
    .refine((options) => options.filter((o) => o.isCorrect).length === 1, {
      message: 'Exactly one option must be marked as correct',
    }),
});

export const updateQuestionSchema = z.object({
  prompt: z.string().min(1).optional(),
  points: z.number().positive().optional(),
  options: z
    .array(optionSchema)
    .min(2)
    .refine((options) => options.filter((o) => o.isCorrect).length === 1, {
      message: 'Exactly one option must be marked as correct',
    })
    .optional(),
});

export type CreateQuestionDto = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionDto = z.infer<typeof updateQuestionSchema>;
