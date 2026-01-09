# MVP Requirements — Examineer

## MVP Goal

Validate the core workflow end-to-end:

**Teacher creates exam → Student takes exam → Teacher sees results**

---

## 1. Users & Authentication

### MVP-USER-01 — User Roles
- The system must support two user roles:
  - Teacher
  - Student
- Each user has exactly one role.

---

### MVP-USER-02 — Authentication
- Users must authenticate using:
  - Email
  - Password
- Authentication must be:
  - Self-hosted
  - JWT-based (Bearer token)
- Passwords must be securely hashed.

---

### MVP-USER-03 — Authorization
- Role-based access control must be enforced:
  - Teachers cannot take exams
  - Students cannot create or edit exams
- Unauthorized access must return an error.

---

## 2. Teacher Functionality

### MVP-TEACHER-01 — Teacher Dashboard
- Teachers must be able to view:
  - A list of their exams
  - Exam status (draft or published)

---

### MVP-TEACHER-02 — Exam Creation
- Teachers must be able to:
  - Create an exam with:
    - Title
    - Description
  - Save an exam as **draft**
  - Edit draft exams
  - Publish an exam

---

### MVP-TEACHER-03 — Question Management
- Teachers must be able to:
  - Add multiple-choice questions to an exam
  - Define for each question:
    - Question text
    - Answer options
    - Exactly one correct option
    - Point value
  - Reorder questions within an exam

---

### MVP-TEACHER-04 — Student Assignment
- Teachers must be able to:
  - Assign students to an exam
- Only assigned students may access the exam.

---

### MVP-TEACHER-05 — Results Viewing
- Teachers must be able to see:
  - Each student’s score for an exam
  - Percentage-based grading results

---

## 3. Student Functionality

### MVP-STUDENT-01 — Student Dashboard
- Students must be able to view:
  - Exams assigned to them
  - Completion status per exam

---

### MVP-STUDENT-02 — Exam Access
- Students must:
  - Only see exams assigned to them
  - Only access published exams

---

### MVP-STUDENT-03 — Exam Taking
- Students must be able to:
  - Start an exam
  - Answer questions
  - Navigate using **Next / Previous** buttons only

---

### MVP-STUDENT-04 — Exam Submission
- Students must:
  - Explicitly submit an exam
  - Confirm submission before finalizing
- Unanswered questions must trigger a warning.

---

### MVP-STUDENT-05 — Results & Feedback
- After submission, students must see:
  - Their final score (percentage)
  - Per-question correctness (correct / incorrect)
- No explanations or topic feedback are required in MVP.

---

## 4. Exam Engine & Scoring

### MVP-EXAM-01 — Automatic Grading
- Exams must be graded automatically upon submission.
- Grading must:
  - Sum points for correct answers
  - Calculate a percentage score

---

### MVP-EXAM-02 — Attempt Rules
- Each student may take an exam **once**.
- Multiple attempts are not allowed in MVP.

---

### MVP-EXAM-03 — Data Persistence
- The system must store:
  - Exam attempts
  - Selected answers
  - Final score
- Attempt data must not be overwritten.

---

## 5. UI / UX Requirements

### MVP-UI-01 — Role-Based Interfaces
- Teacher and student UIs must be separated.
- Navigation must differ per role.

---

### MVP-UI-02 — Exam-Taking UI
The exam interface must:
- Use a full-width layout
- Hide global navigation
- Display:
  - Question count (e.g. `5 / 20`)
  - Navigation buttons (Next / Previous)

---

### MVP-UI-03 — Styling Rules
- UI must follow `ui_style.md`.
- Dashboard UI may include animations and gradients.
- Exam-taking UI must be calm and minimally animated.

---

## 6. API & Backend

### MVP-API-01 — REST API
- Backend must expose a REST API.
- API must be versionable (`/api/v1`).

---

### MVP-API-02 — Layered Backend Architecture
- Backend must enforce:
  - Controllers
  - Handlers
  - Contracts (DTO + validation)
  - Database access layers

---

### MVP-API-03 — Validation & Errors
- All incoming requests must be validated.
- Invalid requests must return clear error responses.

---

## 7. Data & Persistence

### MVP-DATA-01 — Database
- PostgreSQL must be used.
- Schema must be managed via migrations.

---

### MVP-DATA-02 — MVP Schema
The MVP schema must include:
- Users
- Exams
- Questions
- Question options
- Exam assignments
- Attempts
- Attempt answers

Explicitly excluded:
- Topics
- Retakes
- Exam modes
- Time limits
- Analytics

---

## 8. Infrastructure

### MVP-INFRA-01 — Containerized Setup
- Frontend, backend, and database must run via Docker.
- Local development must use Docker Compose.

---

### MVP-INFRA-02 — Environment Configuration
- Configuration must be provided via environment variables.
- `.env.example` must document all required variables.

---

## 9. MVP Completion Criteria

The MVP is complete when:
- A teacher can create and publish an exam
- A student can take that exam once
- The exam is graded automatically
- Both teacher and student can view results
- No non-MVP features are implemented
