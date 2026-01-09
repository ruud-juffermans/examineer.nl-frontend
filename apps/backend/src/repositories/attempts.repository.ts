import { query, queryOne } from '../config/database.js';

interface Attempt {
  id: number;
  examId: number;
  studentId: number;
  status: 'in_progress' | 'submitted' | 'expired';
  startedAt: Date;
  submittedAt: Date | null;
  scorePoints: number | null;
  maxPoints: number | null;
  scorePercent: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AttemptAnswer {
  id: number;
  attemptId: number;
  questionId: number;
  selectedOptionId: number;
  isCorrect: boolean | null;
  answeredAt: Date;
}

interface CreateAttemptData {
  examId: number;
  studentId: number;
}

interface SubmitScoreData {
  scorePoints: number;
  maxPoints: number;
  scorePercent: number;
}

async function findById(id: number): Promise<Attempt | null> {
  return queryOne<Attempt>(
    `SELECT id, exam_id as "examId", student_id as "studentId", status,
            started_at as "startedAt", submitted_at as "submittedAt",
            score_points as "scorePoints", max_points as "maxPoints", score_percent as "scorePercent",
            created_at as "createdAt", updated_at as "updatedAt"
     FROM attempts WHERE id = $1`,
    [id]
  );
}

async function findByExamAndStudent(examId: number, studentId: number): Promise<Attempt | null> {
  return queryOne<Attempt>(
    `SELECT id, exam_id as "examId", student_id as "studentId", status,
            started_at as "startedAt", submitted_at as "submittedAt",
            score_points as "scorePoints", max_points as "maxPoints", score_percent as "scorePercent",
            created_at as "createdAt", updated_at as "updatedAt"
     FROM attempts WHERE exam_id = $1 AND student_id = $2`,
    [examId, studentId]
  );
}

async function create(data: CreateAttemptData): Promise<Attempt> {
  const result = await queryOne<Attempt>(
    `INSERT INTO attempts (exam_id, student_id)
     VALUES ($1, $2)
     RETURNING id, exam_id as "examId", student_id as "studentId", status,
               started_at as "startedAt", submitted_at as "submittedAt",
               score_points as "scorePoints", max_points as "maxPoints", score_percent as "scorePercent",
               created_at as "createdAt", updated_at as "updatedAt"`,
    [data.examId, data.studentId]
  );

  if (!result) {
    throw new Error('Failed to create attempt');
  }

  return result;
}

async function saveAnswer(
  attemptId: number,
  questionId: number,
  selectedOptionId: number
): Promise<void> {
  await query(
    `INSERT INTO attempt_answers (attempt_id, question_id, selected_option_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (attempt_id, question_id)
     DO UPDATE SET selected_option_id = $3, updated_at = NOW()`,
    [attemptId, questionId, selectedOptionId]
  );
}

async function getAnswers(attemptId: number): Promise<AttemptAnswer[]> {
  return query<AttemptAnswer>(
    `SELECT id, attempt_id as "attemptId", question_id as "questionId",
            selected_option_id as "selectedOptionId", is_correct as "isCorrect",
            answered_at as "answeredAt"
     FROM attempt_answers WHERE attempt_id = $1`,
    [attemptId]
  );
}

async function getAnswersWithCorrectness(
  attemptId: number
): Promise<(AttemptAnswer & { isCorrect: boolean })[]> {
  return query(
    `SELECT aa.id, aa.attempt_id as "attemptId", aa.question_id as "questionId",
            aa.selected_option_id as "selectedOptionId",
            COALESCE(qo.is_correct, false) as "isCorrect",
            aa.answered_at as "answeredAt"
     FROM attempt_answers aa
     LEFT JOIN question_options qo ON qo.id = aa.selected_option_id
     WHERE aa.attempt_id = $1`,
    [attemptId]
  );
}

async function submit(attemptId: number, scores: SubmitScoreData): Promise<Attempt> {
  const result = await queryOne<Attempt>(
    `UPDATE attempts SET
       status = 'submitted',
       submitted_at = NOW(),
       score_points = $2,
       max_points = $3,
       score_percent = $4,
       updated_at = NOW()
     WHERE id = $1
     RETURNING id, exam_id as "examId", student_id as "studentId", status,
               started_at as "startedAt", submitted_at as "submittedAt",
               score_points as "scorePoints", max_points as "maxPoints", score_percent as "scorePercent",
               created_at as "createdAt", updated_at as "updatedAt"`,
    [attemptId, scores.scorePoints, scores.maxPoints, scores.scorePercent]
  );

  if (!result) {
    throw new Error('Failed to submit attempt');
  }

  return result;
}

export const attemptsRepository = {
  findById,
  findByExamAndStudent,
  create,
  saveAnswer,
  getAnswers,
  getAnswersWithCorrectness,
  submit,
};
