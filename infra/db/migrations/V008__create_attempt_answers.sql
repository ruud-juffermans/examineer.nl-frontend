-- V008: Create attempt_answers table

CREATE TABLE attempt_answers (
  id                 BIGSERIAL PRIMARY KEY,
  attempt_id         BIGINT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id        BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_id BIGINT REFERENCES question_options(id) ON DELETE SET NULL,
  is_correct         BOOLEAN,
  awarded_points     NUMERIC(8,2),
  answered_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (attempt_id, question_id)
);

-- Indexes
CREATE INDEX idx_attempt_answers_attempt ON attempt_answers(attempt_id);
CREATE INDEX idx_attempt_answers_question ON attempt_answers(question_id);
