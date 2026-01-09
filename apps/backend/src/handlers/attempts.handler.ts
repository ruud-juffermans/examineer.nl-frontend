import { attemptsRepository } from '../repositories/attempts.repository.js';
import { questionsRepository } from '../repositories/questions.repository.js';
import { SaveAnswerDto } from '../contracts/attempts.dto.js';
import { notFound, forbidden, badRequest } from '../errors/httpErrors.js';

async function saveAnswer(attemptId: number, studentId: number, data: SaveAnswerDto) {
  const attempt = await attemptsRepository.findById(attemptId);
  if (!attempt) {
    throw notFound('Attempt not found');
  }

  if (attempt.studentId !== studentId) {
    throw forbidden('You do not have access to this attempt');
  }

  if (attempt.status !== 'in_progress') {
    throw badRequest('This attempt has already been submitted', 'ATTEMPT_SUBMITTED');
  }

  await attemptsRepository.saveAnswer(attemptId, data.questionId, data.selectedOptionId);
}

async function submit(attemptId: number, studentId: number) {
  const attempt = await attemptsRepository.findById(attemptId);
  if (!attempt) {
    throw notFound('Attempt not found');
  }

  if (attempt.studentId !== studentId) {
    throw forbidden('You do not have access to this attempt');
  }

  if (attempt.status !== 'in_progress') {
    throw badRequest('This attempt has already been submitted', 'ATTEMPT_SUBMITTED');
  }

  // Calculate score
  const answers = await attemptsRepository.getAnswers(attemptId);
  const questions = await questionsRepository.findByExam(attempt.examId);

  let scorePoints = 0;
  let maxPoints = 0;

  for (const question of questions) {
    maxPoints += question.points;
    const answer = answers.find((a) => a.questionId === question.id);
    if (answer) {
      const isCorrect = await questionsRepository.isOptionCorrect(
        question.id,
        answer.selectedOptionId
      );
      if (isCorrect) {
        scorePoints += question.points;
      }
    }
  }

  const scorePercent = maxPoints > 0 ? (scorePoints / maxPoints) * 100 : 0;

  return attemptsRepository.submit(attemptId, {
    scorePoints,
    maxPoints,
    scorePercent,
  });
}

async function getResult(attemptId: number, userId: number, role: 'teacher' | 'student') {
  const attempt = await attemptsRepository.findById(attemptId);
  if (!attempt) {
    throw notFound('Attempt not found');
  }

  if (attempt.status !== 'submitted') {
    throw badRequest('This attempt has not been submitted yet', 'ATTEMPT_NOT_SUBMITTED');
  }

  // Students can only see their own results
  if (role === 'student' && attempt.studentId !== userId) {
    throw forbidden('You do not have access to this result');
  }

  const answers = await attemptsRepository.getAnswersWithCorrectness(attemptId);

  return {
    scorePercent: attempt.scorePercent,
    questions: answers.map((a) => ({
      questionId: a.questionId,
      correct: a.isCorrect,
    })),
  };
}

export const attemptsHandler = {
  saveAnswer,
  submit,
  getResult,
};
