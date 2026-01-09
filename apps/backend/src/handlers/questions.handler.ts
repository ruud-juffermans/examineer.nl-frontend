import { questionsRepository } from '../repositories/questions.repository.js';
import { examsRepository } from '../repositories/exams.repository.js';
import { UpdateQuestionDto } from '../contracts/questions.dto.js';
import { notFound, forbidden, badRequest } from '../errors/httpErrors.js';

async function update(questionId: number, teacherId: number, data: UpdateQuestionDto) {
  const question = await questionsRepository.findById(questionId);
  if (!question) {
    throw notFound('Question not found');
  }

  const exam = await examsRepository.findById(question.examId);
  if (!exam || exam.teacherId !== teacherId) {
    throw forbidden('You do not have access to this question');
  }

  if (exam.status !== 'draft') {
    throw badRequest('Cannot edit questions in a published exam', 'EXAM_NOT_EDITABLE');
  }

  return questionsRepository.update(questionId, data);
}

async function deleteQuestion(questionId: number, teacherId: number) {
  const question = await questionsRepository.findById(questionId);
  if (!question) {
    throw notFound('Question not found');
  }

  const exam = await examsRepository.findById(question.examId);
  if (!exam || exam.teacherId !== teacherId) {
    throw forbidden('You do not have access to this question');
  }

  if (exam.status !== 'draft') {
    throw badRequest('Cannot delete questions from a published exam', 'EXAM_NOT_EDITABLE');
  }

  await questionsRepository.delete(questionId);
}

export const questionsHandler = {
  update,
  delete: deleteQuestion,
};
