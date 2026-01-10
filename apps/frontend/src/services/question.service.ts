import { api } from './api';

export interface QuestionOption {
  id: number;
  position: number;
  label: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  examId: number;
  position: number;
  prompt: string;
  points: number;
  options: QuestionOption[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionOptionData {
  label: string;
  isCorrect: boolean;
}

export interface CreateQuestionData {
  prompt: string;
  points: number;
  options: CreateQuestionOptionData[];
}

export interface UpdateQuestionData {
  prompt?: string;
  points?: number;
  options?: CreateQuestionOptionData[];
}

export interface ReorderQuestionsData {
  questionIds: number[];
}

export const questionService = {
  getByExamId: (examId: number) =>
    api.get<Question[]>(`/exams/${examId}/questions`),

  create: (examId: number, data: CreateQuestionData) =>
    api.post<Question>(`/exams/${examId}/questions`, data),

  update: (questionId: number, data: UpdateQuestionData) =>
    api.put<Question>(`/questions/${questionId}`, data),

  delete: (questionId: number) =>
    api.delete<void>(`/questions/${questionId}`),

  reorder: (examId: number, data: ReorderQuestionsData) =>
    api.put<Question[]>(`/exams/${examId}/questions/reorder`, data),
};
