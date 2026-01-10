import { assignmentsRepository, AvailableExam } from '../repositories/assignments.repository.js';

interface ExamsResponse {
  exams: AvailableExam[];
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

async function getAvailableExams(studentId: number): Promise<ExamsResponse> {
  const exams = await assignmentsRepository.findAllPublishedForStudent(studentId);

  const completed = exams.filter((e) => e.status === 'completed').length;
  const pending = exams.filter((e) => e.status === 'pending').length;

  return {
    exams,
    stats: {
      total: exams.length,
      completed,
      pending,
    },
  };
}

export const assignmentsHandler = {
  getAvailableExams,
};
