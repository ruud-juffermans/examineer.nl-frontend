export { api, ApiError } from './api';
export { authService } from './auth.service';
export type { User, LoginCredentials, RegisterData } from './auth.service';
export { examService } from './exam.service';
export type { Exam, ExamStatus, CreateExamData, UpdateExamData } from './exam.service';
export { questionService } from './question.service';
export type {
  Question,
  QuestionOption,
  CreateQuestionData,
  CreateQuestionOptionData,
  UpdateQuestionData,
} from './question.service';
export { assignmentService } from './assignment.service';
export type {
  AvailableExam,
  ExamStatus as AvailableExamStatus,
  AvailableExamsResponse,
} from './assignment.service';
