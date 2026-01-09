-- V007: Create attempts table

CREATE TABLE attempts (
  id                BIGSERIAL PRIMARY KEY,
  exam_id           BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status            attempt_status NOT NULL DEFAULT 'in_progress',
  started_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at      TIMESTAMPTZ,
  score_points      NUMERIC(10,2),
  max_points        NUMERIC(10,2),
  score_percent     NUMERIC(5,2),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_attempts_exam ON attempts(exam_id);
CREATE INDEX idx_attempts_student ON attempts(student_id);
CREATE INDEX idx_attempts_exam_student ON attempts(exam_id, student_id);
