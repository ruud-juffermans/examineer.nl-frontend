import { examsRepository } from '../repositories/exams.repository.js';
import { questionsRepository } from '../repositories/questions.repository.js';
import { attemptsRepository } from '../repositories/attempts.repository.js';
import { CreateExamDto, UpdateExamDto } from '../contracts/exams.dto.js';
import { CreateQuestionDto } from '../contracts/questions.dto.js';
import { notFound, forbidden, badRequest } from '../errors/httpErrors.js';

async function create(teacherId: number, data: CreateExamDto) {
  const exam = await examsRepository.create({
    teacherId,
    title: data.title,
    description: data.description,
  });

  return { id: exam.id, status: exam.status };
}

async function list(userId: number, role: 'teacher' | 'student') {
  if (role === 'teacher') {
    return examsRepository.findByTeacher(userId);
  }
  return examsRepository.findAssignedToStudent(userId);
}

async function getById(examId: number, userId: number, role: 'teacher' | 'student') {
  const exam = await examsRepository.findById(examId);
  if (!exam) {
    throw notFound('Exam not found');
  }

  if (role === 'teacher' && exam.teacherId !== userId) {
    throw forbidden('You do not have access to this exam');
  }

  if (role === 'student') {
    const isAssigned = await examsRepository.isStudentAssigned(examId, userId);
    if (!isAssigned) {
      throw forbidden('You are not assigned to this exam');
    }
  }

  return exam;
}

async function update(examId: number, teacherId: number, data: UpdateExamDto) {
  const exam = await examsRepository.findById(examId);
  if (!exam) {
    throw notFound('Exam not found');
  }

  if (exam.teacherId !== teacherId) {
    throw forbidden('You do not have access to this exam');
  }

  if (exam.status !== 'draft') {
    throw badRequest('Cannot edit a published exam', 'EXAM_NOT_EDITABLE');
  }

  return examsRepository.update(examId, data);
}

async function publish(examId: number, teacherId: number) {
  const exam = await examsRepository.findById(examId);
  if (!exam) {
    throw notFound('Exam not found');
  }

  if (exam.teacherId !== teacherId) {
    throw forbidden('You do not have access to this exam');
  }

  if (exam.status !== 'draft') {
    throw badRequest('Exam is already published', 'ALREADY_PUBLISHED');
  }

  const questionCount = await questionsRepository.countByExam(examId);
  if (questionCount === 0) {
    throw badRequest('Cannot publish an exam without questions', 'NO_QUESTIONS');
  }

  return examsRepository.publish(examId);
}

async function addQuestion(examId: number, teacherId: number, data: CreateQuestionDto) {
  const exam = await examsRepository.findById(examId);
  if (!exam) {
    throw notFound('Exam not found');
  }

  if (exam.teacherId !== teacherId) {
    throw forbidden('You do not have access to this exam');
  }

  if (exam.status !== 'draft') {
    throw badRequest('Cannot add questions to a published exam', 'EXAM_NOT_EDITABLE');
  }

  const position = await questionsRepository.getNextPosition(examId);

  return questionsRepository.create({
    examId,
    position,
    prompt: data.prompt,
    points: data.points,
    options: data.options,
  });
}

async function assignStudents(examId: number, teacherId: number, studentIds: number[]) {
  const exam = await examsRepository.findById(examId);
  if (!exam) {
    throw notFound('Exam not found');
  }

  if (exam.teacherId !== teacherId) {
    throw forbidden('You do not have access to this exam');
  }

  await examsRepository.assignStudents(examId, studentIds);
}

async function startAttempt(examId: number, studentId: number) {
  const exam = await examsRepository.findById(examId);
  if (!exam) {
    throw notFound('Exam not found');
  }

  if (exam.status !== 'published') {
    throw badRequest('This exam is not available', 'EXAM_NOT_AVAILABLE');
  }

  const isAssigned = await examsRepository.isStudentAssigned(examId, studentId);
  if (!isAssigned) {
    throw forbidden('You are not assigned to this exam');
  }

  const existingAttempt = await attemptsRepository.findByExamAndStudent(examId, studentId);
  if (existingAttempt) {
    throw badRequest('You have already taken this exam', 'ALREADY_ATTEMPTED');
  }

  const attempt = await attemptsRepository.create({
    examId,
    studentId,
  });

  return { attemptId: attempt.id };
}

export const examsHandler = {
  create,
  list,
  getById,
  update,
  publish,
  addQuestion,
  assignStudents,
  startAttempt,
};
