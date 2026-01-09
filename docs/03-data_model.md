# Data Model (PostgreSQL) — Examineer

This document defines the **PostgreSQL data model** for Examineer, aligned with the PRD and functional requirements (FR-1 … FR-15).

It is written as a **practical baseline schema** you can implement with SQL migrations (Flyway/Prisma/Drizzle/Knex).  
You can treat this as **V1-ready** (supports topics, explanations, attempt history, learning vs exam mode). For an MVP-only build, see the **MVP Simplifications** section.

---

## 1. Design Principles

- **Multi-tenant by teacher**: a teacher “owns” exams. Students are linked to a teacher via enrollment/invitations.
- **Immutable attempt records**: attempts and answers are append-only; no overwriting historical data.
- **Exam settings versioning**: once published, key settings are immutable (enforced by application rules; optional DB triggers later).
- **Separation of concerns**:
  - **Questions** and **options** are content
  - **Attempts** and **answers** are student activity
  - **Results** are derived from attempts (can be stored for performance)

---

## 2. Enums

```sql
-- Role types
CREATE TYPE user_role AS ENUM ('teacher', 'student', 'admin');

-- Exam lifecycle state
CREATE TYPE exam_status AS ENUM ('draft', 'published', 'archived');

-- Exam mode
CREATE TYPE exam_mode AS ENUM ('learning', 'simulation');

-- Feedback timing
CREATE TYPE feedback_timing AS ENUM ('immediate', 'after_submission');

-- Attempt status
CREATE TYPE attempt_status AS ENUM ('in_progress', 'submitted', 'expired');
```

---

## 3. Core Tables

### 3.1 users
Stores both teachers and students (role-driven behavior).

```sql
CREATE TABLE users (
  id                BIGSERIAL PRIMARY KEY,
  role              user_role NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  password_hash     TEXT, -- nullable if you later add SSO
  display_name      TEXT NOT NULL,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_role ON users(role);
```

Notes:
- `password_hash` is nullable to allow future OAuth/SSO without schema change.
- If you want “teacher + student” separation later, keep this table and add profile tables per role.

---

### 3.2 topics
Teacher-defined topics used for learning feedback and analytics (FR-10).

```sql
CREATE TABLE topics (
  id                BIGSERIAL PRIMARY KEY,
  teacher_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name              TEXT NOT NULL,
  description       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (teacher_id, name)
);

CREATE INDEX idx_topics_teacher ON topics(teacher_id);
```

---

### 3.3 exams
Represents an exam configured by a teacher (FR-2, FR-9).

```sql
CREATE TABLE exams (
  id                     BIGSERIAL PRIMARY KEY,
  teacher_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title                  TEXT NOT NULL,
  description            TEXT,
  status                 exam_status NOT NULL DEFAULT 'draft',

  -- configuration
  mode                   exam_mode NOT NULL DEFAULT 'learning',
  feedback               feedback_timing NOT NULL DEFAULT 'after_submission',
  time_limit_seconds     INTEGER,         -- nullable when no time limit
  attempt_limit          INTEGER,         -- nullable = unlimited
  pass_threshold_percent NUMERIC(5,2),    -- nullable = no pass/fail

  published_at           TIMESTAMPTZ,
  deadline_at            TIMESTAMPTZ,

  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exams_teacher ON exams(teacher_id);
CREATE INDEX idx_exams_status ON exams(status);
```

Application rules:
- When `status = 'published'`, treat settings as immutable (except deadline/visibility) unless you intentionally allow edits.

---

### 3.4 questions
Questions are owned by an exam. Each question has options; one option is correct (FR-3).

```sql
CREATE TABLE questions (
  id                BIGSERIAL PRIMARY KEY,
  exam_id            BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,

  position          INTEGER NOT NULL, -- ordering in the exam
  prompt            TEXT NOT NULL,

  topic_id           BIGINT REFERENCES topics(id) ON DELETE SET NULL,

  explanation        TEXT,            -- shown depending on feedback config (FR-7, FR-13)
  points             NUMERIC(8,2) NOT NULL DEFAULT 1,

  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (exam_id, position)
);

CREATE INDEX idx_questions_exam ON questions(exam_id);
CREATE INDEX idx_questions_topic ON questions(topic_id);
```

---

### 3.5 question_options
Options for each multiple-choice question. Exactly one is correct.

```sql
CREATE TABLE question_options (
  id                BIGSERIAL PRIMARY KEY,
  question_id        BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,

  position          INTEGER NOT NULL,
  label             TEXT NOT NULL,

  is_correct        BOOLEAN NOT NULL DEFAULT FALSE,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (question_id, position)
);

CREATE INDEX idx_options_question ON question_options(question_id);
```

**Enforcing exactly one correct option**  
You can enforce this at the application layer initially. If you want DB enforcement later, add a partial unique index or trigger. A pragmatic approach:

```sql
-- Optional (Postgres-specific): at most one correct option per question
CREATE UNIQUE INDEX uq_one_correct_option_per_question
ON question_options(question_id)
WHERE is_correct = TRUE;
```

This ensures **at most** one correct option; your app must ensure **at least** one before publishing.

---

## 4. Assignment / Access Control

### 4.1 enrollments (teacher ↔ student relationship)
Links students to a teacher. Useful for managing student lists and permissions.

```sql
CREATE TABLE enrollments (
  id                BIGSERIAL PRIMARY KEY,
  teacher_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (teacher_id, student_id)
);

CREATE INDEX idx_enrollments_teacher ON enrollments(teacher_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
```

---

### 4.2 exam_assignments (which students can take which exam)
Explicit exam assignment (FR-4, FR-11).

```sql
CREATE TABLE exam_assignments (
  id                BIGSERIAL PRIMARY KEY,
  exam_id            BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  assigned_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (exam_id, student_id)
);

CREATE INDEX idx_exam_assignments_exam ON exam_assignments(exam_id);
CREATE INDEX idx_exam_assignments_student ON exam_assignments(student_id);
```

---

### 4.3 exam_invites (optional: email invites + secure links)
Supports invitation flow (FR-11).

```sql
CREATE TABLE exam_invites (
  id                BIGSERIAL PRIMARY KEY,
  exam_id            BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,

  email             TEXT NOT NULL,
  token_hash        TEXT NOT NULL, -- store hash of token, not raw token
  expires_at        TIMESTAMPTZ NOT NULL,

  accepted_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (exam_id, email)
);

CREATE INDEX idx_exam_invites_exam ON exam_invites(exam_id);
CREATE INDEX idx_exam_invites_email ON exam_invites(email);
```

Notes:
- Store `token_hash` only; verify by hashing the presented token.
- You can add `student_id` once the invite is accepted and the user exists.

---

## 5. Attempts, Answers, and Results

### 5.1 attempts
Represents one student attempt for one exam (FR-8, FR-12).

```sql
CREATE TABLE attempts (
  id                BIGSERIAL PRIMARY KEY,
  exam_id            BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  status            attempt_status NOT NULL DEFAULT 'in_progress',

  started_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at      TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,

  -- Derived scoring fields (can also be computed on demand)
  score_points      NUMERIC(10,2),
  max_points        NUMERIC(10,2),
  score_percent     NUMERIC(5,2),
  passed            BOOLEAN,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_attempts_exam ON attempts(exam_id);
CREATE INDEX idx_attempts_student ON attempts(student_id);
CREATE INDEX idx_attempts_exam_student ON attempts(exam_id, student_id);
```

Notes:
- For attempt limits: query count of submitted attempts per student/exam and enforce at application layer.
- `expires_at` is useful when time limit is enabled.

---

### 5.2 attempt_answers
Stores the student’s selected option per question. Autosave writes here (FR-5, FR-12).

```sql
CREATE TABLE attempt_answers (
  id                BIGSERIAL PRIMARY KEY,
  attempt_id         BIGINT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id        BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_id BIGINT REFERENCES question_options(id) ON DELETE SET NULL,

  -- Snapshot fields to protect against future edits (optional but recommended)
  is_correct         BOOLEAN,
  awarded_points     NUMERIC(8,2),

  answered_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (attempt_id, question_id)
);

CREATE INDEX idx_attempt_answers_attempt ON attempt_answers(attempt_id);
CREATE INDEX idx_attempt_answers_question ON attempt_answers(question_id);
```

Notes:
- The `UNIQUE (attempt_id, question_id)` allows autosave as an upsert.
- Snapshot fields (`is_correct`, `awarded_points`) can be populated upon submission.

---

### 5.3 attempt_feedback (optional: store compiled feedback)
This table is optional if you generate feedback dynamically. It can help performance and maintain consistency across versions.

```sql
CREATE TABLE attempt_feedback (
  id                BIGSERIAL PRIMARY KEY,
  attempt_id         BIGINT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id        BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,

  feedback_text     TEXT, -- e.g., explanation or extra notes
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (attempt_id, question_id)
);

CREATE INDEX idx_attempt_feedback_attempt ON attempt_feedback(attempt_id);
```

---

## 6. Analytics (Derived Views)

You can generate analytics via SQL views or query logic without additional tables.

### 6.1 Topic performance per student (view example)
```sql
CREATE VIEW v_topic_performance AS
SELECT
  a.student_id,
  q.topic_id,
  COUNT(*) AS questions_answered,
  SUM(CASE WHEN aa.is_correct THEN 1 ELSE 0 END) AS correct_count,
  ROUND(100.0 * SUM(CASE WHEN aa.is_correct THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) AS percent_correct
FROM attempts a
JOIN attempt_answers aa ON aa.attempt_id = a.id
JOIN questions q ON q.id = aa.question_id
WHERE a.status = 'submitted' AND q.topic_id IS NOT NULL
GROUP BY a.student_id, q.topic_id;
```

---

## 7. MVP Simplifications

If you want an MVP-first schema:
- Drop `topics`, `attempt_feedback`, `exam_invites`, and any analytics views.
- Keep only:
  - users, exams, questions, question_options, exam_assignments, attempts, attempt_answers
- You can add topics and feedback later without breaking core tables.

---

## 8. Indexing Recommendations

Minimum recommended indexes for performance:
- `users(email)` unique already
- `exams(teacher_id)`, `exams(status)`
- `questions(exam_id)`, `question_options(question_id)`
- `exam_assignments(exam_id, student_id)` unique already
- `attempts(exam_id, student_id)` composite
- `attempt_answers(attempt_id)`

---

## 9. Data Retention & GDPR Notes

- Store minimal personal data (email + display name).
- Provide deletion workflows:
  - Delete student user → cascade enrollments, assignments, attempts, answers.
- Consider pseudonymization for analytics later if needed.

---

## Document Status
- **Version:** 0.1
- **Status:** Draft
- **Source:** PRD + requirements.md
