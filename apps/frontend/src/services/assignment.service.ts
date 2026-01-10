import { api } from './api';

export type ExamStatus = 'pending' | 'completed';

export interface AvailableExam {
  id: number;
  examId: number;
  title: string;
  description: string | null;
  status: ExamStatus;
  publishedAt: string;
  attemptId: number | null;
  score: number | null;
  completedAt: string | null;
}

export interface AvailableExamsResponse {
  exams: AvailableExam[];
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export const assignmentService = {
  getAvailableExams: () =>
    api.get<AvailableExamsResponse>('/assignments'),
};
