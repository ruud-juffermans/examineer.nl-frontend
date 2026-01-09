-- V002: Create users table

CREATE TABLE users (
  id                BIGSERIAL PRIMARY KEY,
  role              user_role NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  password_hash     TEXT,
  display_name      TEXT NOT NULL,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for role-based queries
CREATE INDEX idx_users_role ON users(role);
