import { z } from 'zod';

export const saveAnswerSchema = z.object({
  questionId: z.number().int().positive(),
  selectedOptionId: z.number().int().positive(),
});

export type SaveAnswerDto = z.infer<typeof saveAnswerSchema>;
