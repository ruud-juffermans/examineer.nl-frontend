import { query, queryOne } from '../config/database.js';

interface User {
  id: number;
  email: string;
  passwordHash: string | null;
  displayName: string;
  role: 'teacher' | 'student';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserData {
  email: string;
  passwordHash: string;
  displayName: string;
  role: 'teacher' | 'student';
}

async function findById(id: number): Promise<User | null> {
  return queryOne<User>(
    `SELECT id, email, password_hash as "passwordHash", display_name as "displayName",
            role, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
     FROM users WHERE id = $1`,
    [id]
  );
}

async function findByEmail(email: string): Promise<User | null> {
  return queryOne<User>(
    `SELECT id, email, password_hash as "passwordHash", display_name as "displayName",
            role, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"
     FROM users WHERE email = $1`,
    [email]
  );
}

async function create(data: CreateUserData): Promise<User> {
  const result = await queryOne<User>(
    `INSERT INTO users (email, password_hash, display_name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, password_hash as "passwordHash", display_name as "displayName",
               role, is_active as "isActive", created_at as "createdAt", updated_at as "updatedAt"`,
    [data.email, data.passwordHash, data.displayName, data.role]
  );

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
}

export const usersRepository = {
  findById,
  findByEmail,
  create,
};
