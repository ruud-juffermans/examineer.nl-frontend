-- V005: Create question_options table

CREATE TABLE question_options (
  id                BIGSERIAL PRIMARY KEY,
  question_id       BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  position          INTEGER NOT NULL,
  label             TEXT NOT NULL,
  is_correct        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (question_id, position)
);

-- Index for question-based queries
CREATE INDEX idx_options_question ON question_options(question_id);

-- Ensure at most one correct option per question
CREATE UNIQUE INDEX uq_one_correct_option_per_question
  ON question_options(question_id)
  WHERE is_correct = TRUE;
