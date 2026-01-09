# MVP Feature List — Examineer

This document lists **all features that together compose the complete MVP** of the Examineer application.

Each feature represents a **user-visible capability** and maps directly to the MVP requirements and core workflow.

MVP Goal:
**Teacher creates exam → Student takes exam → Teacher sees results**

---

## 1. Authentication & Access

### F-01 — User Registration
- Teachers and students can create an account using email and password.
- Account creation assigns a fixed role (teacher or student).

---

### F-02 — User Login
- Users can log in using email and password.
- Successful login returns a JWT session token.

---

### F-03 — Role-Based Access Control
- Teachers can only access teacher pages.
- Students can only access student pages.
- Unauthorized access is blocked.

---

## 2. Teacher Features

### F-04 — Teacher Dashboard
- Overview of all exams owned by the teacher.
- Displays exam title and status (draft / published).

---

### F-05 — Create Exam
- Teacher can create a new exam with:
  - Title
  - Description
- Exam starts in **draft** state.

---

### F-06 — Edit Draft Exam
- Teacher can edit:
  - Exam metadata
  - Questions and options
- Editing is blocked once the exam is published.

---

### F-07 — Publish Exam
- Teacher can publish a draft exam.
- Only published exams are visible to students.

---

### F-08 — Manage Questions
- Teacher can:
  - Add multiple-choice questions
  - Define answer options
  - Mark exactly one option as correct
  - Assign point values
  - Reorder questions

---

### F-09 — Assign Students to Exam
- Teacher can assign students to an exam.
- Only assigned students can take the exam.

---

### F-10 — View Exam Results
- Teacher can view:
  - List of students who took the exam
  - Score per student (percentage)

---

## 3. Student Features

### F-11 — Student Dashboard
- Student sees:
  - Exams assigned to them
  - Exam completion status

---

### F-12 — Start Exam
- Student can open an assigned, published exam.
- Exam can only be started once.

---

### F-13 — Answer Questions
- Student can:
  - Answer one question at a time
  - Navigate using **Next / Previous** buttons

---

### F-14 — Submit Exam
- Student must explicitly submit the exam.
- Submission requires confirmation.
- Warning shown if unanswered questions remain.

---

### F-15 — View Exam Result
- After submission, student sees:
  - Final percentage score
  - Correct / incorrect indication per question

---

## 4. Exam Engine Features

### F-16 — Automatic Grading
- System automatically grades the exam on submission.
- Points are summed and converted to a percentage score.

---

### F-17 — Single Attempt Enforcement
- System enforces one attempt per student per exam.
- Retakes are not allowed in MVP.

---

### F-18 — Attempt Persistence
- System stores:
  - Exam attempt
  - Answers per question
  - Final score

---

## 5. UI / UX Features

### F-19 — Role-Based Layouts
- Teacher and student UIs have distinct layouts and navigation.

---

### F-20 — Focused Exam UI
- Exam UI:
  - Full-width layout
  - No global navigation
  - Question progress indicator (e.g. `3 / 10`)

---

### F-21 — Confirmation & Feedback UI
- Submission confirmation dialog.
- Clear correct / incorrect feedback after submission.

---

## 6. Platform & Infrastructure Features

### F-22 — REST API
- Backend exposes a REST API for all MVP functionality.

---

### F-23 — Data Persistence
- All MVP data stored in PostgreSQL.
- Schema managed via migrations.

---

### F-24 — Containerized Development Environment
- Frontend, backend, and database run via Docker Compose.

---

## 7. Explicitly Excluded From MVP

The following are **not part of the MVP**:
- Topics and learning objectives
- Feedback explanations
- Multiple attempts
- Time limits
- Exam modes (learning vs simulation)
- Analytics dashboards
- Email invitations
- Notifications
- Admin features

---

## MVP Completion Check

The MVP is complete when:
- All features F-01 through F-24 are implemented
- Core workflow is usable end-to-end
- No excluded features are present

---

## Document Status
- **Version:** 0.1
- **Scope:** MVP only
- **Source:** PRD + MVP requirements
