import { api } from './api';

export type ExamStatus = 'draft' | 'published' | 'archived';

export interface Exam {
  id: number;
  title: string;
  description: string | null;
  status: ExamStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExamData {
  title: string;
  description?: string;
}

export interface UpdateExamData {
  title?: string;
  description?: string;
}

interface CreateExamResponse {
  id: number;
  status: ExamStatus;
}

export const examService = {
  create: (data: CreateExamData) =>
    api.post<CreateExamResponse>('/exams', data),

  getAll: () =>
    api.get<Exam[]>('/exams'),

  getById: (id: number) =>
    api.get<Exam>(`/exams/${id}`),

  update: (id: number, data: UpdateExamData) =>
    api.put<Exam>(`/exams/${id}`, data),

  publish: (id: number) =>
    api.post<Exam>(`/exams/${id}/publish`),

  unpublish: (id: number) =>
    api.post<Exam>(`/exams/${id}/unpublish`),

  delete: (id: number) =>
    api.delete<void>(`/exams/${id}`),
};
