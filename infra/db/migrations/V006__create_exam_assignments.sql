-- V006: Create exam_assignments table

CREATE TABLE exam_assignments (
  id                BIGSERIAL PRIMARY KEY,
  exam_id           BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (exam_id, student_id)
);

-- Indexes
CREATE INDEX idx_exam_assignments_exam ON exam_assignments(exam_id);
CREATE INDEX idx_exam_assignments_student ON exam_assignments(student_id);
