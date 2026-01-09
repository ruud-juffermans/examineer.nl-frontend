-- V004: Create questions table

CREATE TABLE questions (
  id                BIGSERIAL PRIMARY KEY,
  exam_id           BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  position          INTEGER NOT NULL,
  prompt            TEXT NOT NULL,
  points            NUMERIC(8,2) NOT NULL DEFAULT 1,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (exam_id, position)
);

-- Index for exam-based queries
CREATE INDEX idx_questions_exam ON questions(exam_id);
