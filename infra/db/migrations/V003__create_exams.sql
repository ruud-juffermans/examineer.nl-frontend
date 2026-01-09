-- V003: Create exams table

CREATE TABLE exams (
  id                     BIGSERIAL PRIMARY KEY,
  teacher_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title                  TEXT NOT NULL,
  description            TEXT,
  status                 exam_status NOT NULL DEFAULT 'draft',
  published_at           TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_exams_teacher ON exams(teacher_id);
CREATE INDEX idx_exams_status ON exams(status);
