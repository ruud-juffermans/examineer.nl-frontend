import { query, queryOne } from '../config/database.js';

interface Question {
  id: number;
  examId: number;
  position: number;
  prompt: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

interface QuestionOption {
  id: number;
  questionId: number;
  position: number;
  label: string;
  isCorrect: boolean;
}

interface CreateQuestionData {
  examId: number;
  position: number;
  prompt: string;
  points: number;
  options: { label: string; isCorrect: boolean }[];
}

interface UpdateQuestionData {
  prompt?: string;
  points?: number;
  options?: { label: string; isCorrect: boolean }[];
}

async function findById(id: number): Promise<Question | null> {
  return queryOne<Question>(
    `SELECT id, exam_id as "examId", position, prompt, points,
            created_at as "createdAt", updated_at as "updatedAt"
     FROM questions WHERE id = $1`,
    [id]
  );
}

async function findByExam(examId: number): Promise<Question[]> {
  return query<Question>(
    `SELECT id, exam_id as "examId", position, prompt, points,
            created_at as "createdAt", updated_at as "updatedAt"
     FROM questions WHERE exam_id = $1 ORDER BY position`,
    [examId]
  );
}

async function countByExam(examId: number): Promise<number> {
  const result = await queryOne<{ count: string }>(
    `SELECT COUNT(*)::text as count FROM questions WHERE exam_id = $1`,
    [examId]
  );

  return parseInt(result?.count ?? '0', 10);
}

async function getNextPosition(examId: number): Promise<number> {
  const result = await queryOne<{ maxPosition: number | null }>(
    `SELECT MAX(position) as "maxPosition" FROM questions WHERE exam_id = $1`,
    [examId]
  );

  return (result?.maxPosition ?? 0) + 1;
}

async function create(data: CreateQuestionData): Promise<Question> {
  const question = await queryOne<Question>(
    `INSERT INTO questions (exam_id, position, prompt, points)
     VALUES ($1, $2, $3, $4)
     RETURNING id, exam_id as "examId", position, prompt, points,
               created_at as "createdAt", updated_at as "updatedAt"`,
    [data.examId, data.position, data.prompt, data.points]
  );

  if (!question) {
    throw new Error('Failed to create question');
  }

  // Create options
  for (let i = 0; i < data.options.length; i++) {
    const option = data.options[i]!;
    await query(
      `INSERT INTO question_options (question_id, position, label, is_correct)
       VALUES ($1, $2, $3, $4)`,
      [question.id, i + 1, option.label, option.isCorrect]
    );
  }

  return question;
}

async function update(id: number, data: UpdateQuestionData): Promise<Question> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (data.prompt !== undefined) {
    fields.push(`prompt = $${paramIndex++}`);
    values.push(data.prompt);
  }

  if (data.points !== undefined) {
    fields.push(`points = $${paramIndex++}`);
    values.push(data.points);
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const question = await queryOne<Question>(
    `UPDATE questions SET ${fields.join(', ')} WHERE id = $${paramIndex}
     RETURNING id, exam_id as "examId", position, prompt, points,
               created_at as "createdAt", updated_at as "updatedAt"`,
    values
  );

  if (!question) {
    throw new Error('Failed to update question');
  }

  // Update options if provided
  if (data.options) {
    await query(`DELETE FROM question_options WHERE question_id = $1`, [id]);

    for (let i = 0; i < data.options.length; i++) {
      const option = data.options[i]!;
      await query(
        `INSERT INTO question_options (question_id, position, label, is_correct)
         VALUES ($1, $2, $3, $4)`,
        [id, i + 1, option.label, option.isCorrect]
      );
    }
  }

  return question;
}

async function deleteQuestion(id: number): Promise<void> {
  await query(`DELETE FROM questions WHERE id = $1`, [id]);
}

async function isOptionCorrect(questionId: number, optionId: number): Promise<boolean> {
  const result = await queryOne<{ isCorrect: boolean }>(
    `SELECT is_correct as "isCorrect" FROM question_options
     WHERE id = $1 AND question_id = $2`,
    [optionId, questionId]
  );

  return result?.isCorrect ?? false;
}

async function getOptions(questionId: number): Promise<QuestionOption[]> {
  return query<QuestionOption>(
    `SELECT id, question_id as "questionId", position, label, is_correct as "isCorrect"
     FROM question_options WHERE question_id = $1 ORDER BY position`,
    [questionId]
  );
}

export const questionsRepository = {
  findById,
  findByExam,
  countByExam,
  getNextPosition,
  create,
  update,
  delete: deleteQuestion,
  isOptionCorrect,
  getOptions,
};
