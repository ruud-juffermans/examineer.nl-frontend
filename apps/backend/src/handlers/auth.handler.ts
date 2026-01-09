import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { usersRepository } from '../repositories/users.repository.js';
import { RegisterDto, LoginDto } from '../contracts/auth.dto.js';
import { unauthorized, conflict, notFound } from '../errors/httpErrors.js';

async function register(data: RegisterDto) {
  const existingUser = await usersRepository.findByEmail(data.email);
  if (existingUser) {
    throw conflict('A user with this email already exists', 'EMAIL_EXISTS');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await usersRepository.create({
    email: data.email,
    passwordHash,
    displayName: data.displayName,
    role: data.role,
  });

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken,
  };
}

async function login(data: LoginDto) {
  const user = await usersRepository.findByEmail(data.email);
  if (!user || !user.passwordHash) {
    throw unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
  }

  const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
  if (!isValidPassword) {
    throw unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
  }

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  return { accessToken };
}

async function getCurrentUser(userId: number) {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw notFound('User not found');
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    displayName: user.displayName,
  };
}

export const authHandler = {
  register,
  login,
  getCurrentUser,
};
