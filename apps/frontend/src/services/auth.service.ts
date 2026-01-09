import { api } from './api';

export interface User {
  id: number;
  email: string;
  role: 'teacher' | 'student';
  displayName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  role: 'teacher' | 'student';
}

interface LoginResponse {
  accessToken: string;
}

interface RegisterResponse {
  id: number;
  email: string;
  role: 'teacher' | 'student';
  accessToken: string;
}

export const authService = {
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>('/auth/login', credentials, { requireAuth: false }),

  register: (data: RegisterData) =>
    api.post<RegisterResponse>('/auth/register', data, { requireAuth: false }),

  getCurrentUser: () => api.get<User>('/auth/me'),
};
