-- V001: Create enum types for Examineer MVP

-- Role types
CREATE TYPE user_role AS ENUM ('teacher', 'student');

-- Exam lifecycle state
CREATE TYPE exam_status AS ENUM ('draft', 'published', 'archived');

-- Attempt status
CREATE TYPE attempt_status AS ENUM ('in_progress', 'submitted', 'expired');
