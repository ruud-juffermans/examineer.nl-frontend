import { query, queryOne } from '../config/database.js';

interface Exam {
  id: number;
  teacherId: number;
  title: string;
  description: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateExamData {
  teacherId: number;
  title: string;
  description?: string;
}

interface UpdateExamData {
  title?: string;
  description?: string;
}

async function findById(id: number): Promise<Exam | null> {
  return queryOne<Exam>(
    `SELECT id, teacher_id as "teacherId", title, description, status,
            published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"
     FROM exams WHERE id = $1`,
    [id]
  );
}

async function findByTeacher(teacherId: number): Promise<Exam[]> {
  return query<Exam>(
    `SELECT id, teacher_id as "teacherId", title, description, status,
            published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"
     FROM exams WHERE teacher_id = $1 ORDER BY created_at DESC`,
    [teacherId]
  );
}

async function findAssignedToStudent(studentId: number): Promise<Exam[]> {
  return query<Exam>(
    `SELECT e.id, e.teacher_id as "teacherId", e.title, e.description, e.status,
            e.published_at as "publishedAt", e.created_at as "createdAt", e.updated_at as "updatedAt"
     FROM exams e
     JOIN exam_assignments ea ON ea.exam_id = e.id
     WHERE ea.student_id = $1 AND e.status = 'published'
     ORDER BY e.created_at DESC`,
    [studentId]
  );
}

async function create(data: CreateExamData): Promise<Exam> {
  const result = await queryOne<Exam>(
    `INSERT INTO exams (teacher_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING id, teacher_id as "teacherId", title, description, status,
               published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"`,
    [data.teacherId, data.title, data.description ?? null]
  );

  if (!result) {
    throw new Error('Failed to create exam');
  }

  return result;
}

async function update(id: number, data: UpdateExamData): Promise<Exam> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (data.title !== undefined) {
    fields.push(`title = $${paramIndex++}`);
    values.push(data.title);
  }

  if (data.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(data.description);
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await queryOne<Exam>(
    `UPDATE exams SET ${fields.join(', ')} WHERE id = $${paramIndex}
     RETURNING id, teacher_id as "teacherId", title, description, status,
               published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"`,
    values
  );

  if (!result) {
    throw new Error('Failed to update exam');
  }

  return result;
}

async function publish(id: number): Promise<Exam> {
  const result = await queryOne<Exam>(
    `UPDATE exams SET status = 'published', published_at = NOW(), updated_at = NOW()
     WHERE id = $1
     RETURNING id, teacher_id as "teacherId", title, description, status,
               published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"`,
    [id]
  );

  if (!result) {
    throw new Error('Failed to publish exam');
  }

  return result;
}

async function unpublish(id: number): Promise<Exam> {
  const result = await queryOne<Exam>(
    `UPDATE exams SET status = 'draft', published_at = NULL, updated_at = NOW()
     WHERE id = $1
     RETURNING id, teacher_id as "teacherId", title, description, status,
               published_at as "publishedAt", created_at as "createdAt", updated_at as "updatedAt"`,
    [id]
  );

  if (!result) {
    throw new Error('Failed to unpublish exam');
  }

  return result;
}

async function isStudentAssigned(examId: number, studentId: number): Promise<boolean> {
  const result = await queryOne<{ exists: boolean }>(
    `SELECT EXISTS(SELECT 1 FROM exam_assignments WHERE exam_id = $1 AND student_id = $2) as exists`,
    [examId, studentId]
  );

  return result?.exists ?? false;
}

async function assignStudents(examId: number, studentIds: number[]): Promise<void> {
  for (const studentId of studentIds) {
    await query(
      `INSERT INTO exam_assignments (exam_id, student_id)
       VALUES ($1, $2)
       ON CONFLICT (exam_id, student_id) DO NOTHING`,
      [examId, studentId]
    );
  }
}

export const examsRepository = {
  findById,
  findByTeacher,
  findAssignedToStudent,
  create,
  update,
  publish,
  unpublish,
  isStudentAssigned,
  assignStudents,
};
