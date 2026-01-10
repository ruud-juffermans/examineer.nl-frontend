import { query } from '../config/database.js';

export interface AvailableExam {
  id: number;
  examId: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  publishedAt: Date;
  attemptId: number | null;
  score: number | null;
  completedAt: Date | null;
}

async function findAllPublishedForStudent(studentId: number): Promise<AvailableExam[]> {
  return query<AvailableExam>(
    `SELECT
       e.id,
       e.id as "examId",
       e.title,
       e.description,
       CASE
         WHEN a.status = 'submitted' THEN 'completed'
         ELSE 'pending'
       END as status,
       e.published_at as "publishedAt",
       a.id as "attemptId",
       a.score_percent as score,
       a.submitted_at as "completedAt"
     FROM exams e
     LEFT JOIN attempts a ON a.exam_id = e.id AND a.student_id = $1
     WHERE e.status = 'published'
     ORDER BY e.published_at DESC`,
    [studentId]
  );
}

export const assignmentsRepository = {
  findAllPublishedForStudent,
};
