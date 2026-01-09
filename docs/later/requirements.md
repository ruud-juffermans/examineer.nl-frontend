# Functional & Non-Functional Requirements

This document defines the **functional**, **non-functional**, and **UX/design requirements** for the Examineer platform.  
It is derived directly from the Product Requirements Document (PRD) and serves as an implementation reference.

---

## Stakeholders
Role	Responsibility
Teacher	Create exams, view results
Student	Take exams
Admin	System oversight (later phase)

## Personas & Journeys
Persona 1: Teacher
- Creates exams
- Manages students
- Reviews results
- Moderate technical proficiency

Teacher Journey
1. Register / log in
2. Create an exam
3. Add multiple-choice questions
4. Add students (email or invite link)
5. Publish exam
6. View results dashboard

Persona 2: Student
- Takes exams
- Views own results (optional)
- Low tolerance for friction

Student Journey
1. Receive exam invitation
2. Log in or access exam
3. Take exam
4. Submit answers
5. See confirmation (and optionally score)

## 1. Functional Requirements

### FR-1: Authentication & Roles
- Support **teacher** and **student** roles
- Secure login mechanism
- Teachers cannot take exams
- Students cannot edit exams

---

### FR-2: Exam Creation
- Create exams with:
  - Title
  - Description
  - Duration
- Exams have a **draft** and **published** state
- Exams are editable until published

---

### FR-3: Question Management
- Support multiple-choice questions
- Exactly one correct answer per question
- Configurable points per question
- Ability to reorder questions

---

### FR-4: Student Management
- Add students by email
- Assign students to specific exams
- Prevent unauthorized access to exams

---

### FR-5: Exam Taking
- Optional timed exams
- Configurable attempt limits
- Autosave answers during the exam

---

### FR-6: Results & Grading
- Automatic grading upon submission
- Teachers can view:
  - Scores per student
  - Average exam score
  - Question-level statistics

---

### FR-7: Feedback & Learning Support
- Configurable feedback modes:
  - Immediate feedback per question
  - Feedback after exam submission
- Feedback includes:
  - Correct / incorrect indication
  - Explanation per question
- Feedback visibility depends on exam configuration

---

### FR-8: Scoring & Attempts
- Exams generate a score per attempt:
  - Percentage-based scoring
  - Optional weighted questions
  - Optional pass/fail threshold
- Each attempt stores:
  - Timestamp
  - Total score
  - Per-question answers
- Teachers can view:
  - All attempts per student
  - Progress over time

---

### FR-9: Exam Configuration & Modes
Teachers can configure:
- Learning mode vs exam simulation mode
- Feedback timing
- Time limits
- Attempt limits

Rules:
- Exam settings are immutable after publication (except visibility)

---

### FR-10: Topic & Learning Objective Mapping
- Each question is linked to a **teacher-defined topic**
- Topics are reusable across exams
- Topic performance is aggregated:
  - Per student
  - Per exam

---

### FR-11: Invitations & Access Control
- Exams can be accessed via:
  - Email invitation
  - Secure exam link
- Exam access expires:
  - After submission, or
  - After a deadline
- Students cannot access unassigned exams

---

### FR-12: Attempt Management
- Enforce:
  - Single or multiple attempts (configurable)
- Autosave on every answer change
- Interrupted attempts can be resumed (within configured rules)

---

### FR-13: Student Feedback UI
Feedback UI includes:
- Correct vs incorrect answers
- Explanation text
- Topic tag per question

Rules:
- Feedback visibility respects exam configuration

---

### FR-14: Teacher Analytics Dashboard
Teachers can view:
- Class average scores
- Topic-level weaknesses
- Distribution of scores
- Improvement over multiple attempts

---

### FR-15: Student Progress Tracking
Students can view:
- Past exam attempts
- Score progression over time
- Topic mastery trends

---

## 2. Non-Functional Requirements

### Performance
- Support **≥ 100 concurrent exam takers**
- Autosave latency < **500ms**
- Results available within **1 second** after submission

---

### Reliability
- No data loss during:
  - Page refresh
  - Temporary network interruption
- Graceful handling of expired sessions

---

### Security
- Role-based access control
- Secure, unguessable exam access tokens
- Protection against replay attacks

---

### Privacy & Compliance
- GDPR-compliant data storage
- Teachers only see data of assigned students
- Students only see their own attempts

---

### Accessibility
- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen-reader compatible exam flow

---

## 3. UX & Design Requirements

### Exam UI
- Distraction-free layout
- Persistent progress indicator
- Clear remaining-time display (when enabled)

---

### Teacher UI
- Step-by-step exam creation flow
- Clear validation and error messages
- Preview mode before publishing

---

### Student UI
- Clear exam instructions
- Confirmation on submission
- Explicit feedback visibility rules

---

## Document Status
- **Version:** 0.1  
- **Status:** Draft  
- **Source:** Product Requirements Document (PRD)

