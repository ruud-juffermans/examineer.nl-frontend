# API Documentation — Examineer

This document describes the **HTTP API** for the Examineer backend.  
It is aligned with the PRD, functional requirements (FR-1 … FR-15), and the PostgreSQL data model.

The API is designed as a **JSON-based REST API**, secured via authentication tokens and role-based access control.

---

## 1. Conventions

### Base URL
```
https://api.examineer.nl
```

For local development:
```
http://localhost:3000
```

---

### Authentication
- Authentication uses **Bearer tokens** (JWT or equivalent).
- Every protected endpoint requires:

```
Authorization: Bearer <access_token>
```

---

### Roles
- `teacher`
- `student`
- `admin` (future)

Role-based authorization is enforced server-side.

---

### Request & Response Format
- Content-Type: `application/json`
- All timestamps are ISO 8601 (`TIMESTAMPTZ`)

---

### Error Response Format
```json
{
  "error": "Human readable message",
  "code": "ERROR_CODE"
}
```

---

## 2. Authentication & Users (FR-1)

### POST /auth/register
Register a teacher or student.

**Request**
```json
{
  "email": "user@example.com",
  "password": "strong-password",
  "role": "teacher",
  "displayName": "Jane Doe"
}
```

**Response**
```json
{
  "id": 1,
  "role": "teacher",
  "email": "user@example.com",
  "accessToken": "jwt-token"
}
```

---

### POST /auth/login
Authenticate a user.

**Request**
```json
{
  "email": "user@example.com",
  "password": "strong-password"
}
```

**Response**
```json
{
  "accessToken": "jwt-token"
}
```

---

## 3. Exams (FR-2, FR-9)

### POST /exams
Create a new exam (teacher only).

**Request**
```json
{
  "title": "Biology Practice Exam",
  "description": "Final exam preparation",
  "mode": "learning",
  "feedback": "after_submission",
  "timeLimitSeconds": null,
  "attemptLimit": 1
}
```

**Response**
```json
{
  "id": 10,
  "status": "draft"
}
```

---

### PUT /exams/{examId}
Update an exam (only if draft).

---

### POST /exams/{examId}/publish
Publish an exam.

---

### GET /exams
List exams owned by the authenticated teacher.

---

## 4. Questions (FR-3, FR-10)

### POST /exams/{examId}/questions
Add a question to an exam.

**Request**
```json
{
  "prompt": "What is the capital of France?",
  "points": 1,
  "topicId": 3,
  "explanation": "Paris is the capital city.",
  "options": [
    { "label": "Paris", "isCorrect": true },
    { "label": "Rome", "isCorrect": false },
    { "label": "Berlin", "isCorrect": false }
  ]
}
```

---

### PUT /questions/{questionId}
Update a question.

---

### DELETE /questions/{questionId}
Delete a question.

---

## 5. Students & Assignments (FR-4, FR-11)

### POST /students/invite
Invite a student by email.

**Request**
```json
{
  "email": "student@example.com"
}
```

---

### POST /exams/{examId}/assign
Assign students to an exam.

**Request**
```json
{
  "studentIds": [12, 13]
}
```

---

## 6. Exam Taking (FR-5, FR-12)

### POST /exams/{examId}/attempts
Start an exam attempt (student only).

**Response**
```json
{
  "attemptId": 55,
  "expiresAt": "2026-01-10T10:30:00Z"
}
```

---

### POST /attempts/{attemptId}/answers
Autosave an answer.

**Request**
```json
{
  "questionId": 101,
  "selectedOptionId": 402
}
```

---

### POST /attempts/{attemptId}/submit
Submit an exam attempt.

---

## 7. Results & Feedback (FR-6, FR-7, FR-13)

### GET /attempts/{attemptId}/result
Retrieve attempt results and feedback.

**Response**
```json
{
  "scorePercent": 85.0,
  "passed": true,
  "questions": [
    {
      "questionId": 101,
      "correct": true,
      "explanation": "Paris is the capital city.",
      "topicId": 3
    }
  ]
}
```

---

## 8. Analytics (FR-14, FR-15)

### GET /analytics/teacher/overview
Teacher analytics dashboard.

**Response**
```json
{
  "averageScore": 72.4,
  "scoreDistribution": {
    "0-50": 3,
    "50-75": 8,
    "75-100": 12
  },
  "weakTopics": [
    { "topicId": 5, "percentCorrect": 42.0 }
  ]
}
```

---

### GET /analytics/student/progress
Student progress over time.

---

## 9. Access Rules Summary

| Endpoint Group | Teacher | Student |
|---------------|--------|---------|
| Auth | ✓ | ✓ |
| Exams | ✓ | ✗ |
| Questions | ✓ | ✗ |
| Assignments | ✓ | ✗ |
| Attempts | ✗ | ✓ |
| Results | ✓ | ✓ |
| Analytics | ✓ | ✓ (own) |

---

## 10. Versioning & Compatibility

- Initial version: `v1`
- Breaking changes require:
  - New API version
  - Backward compatibility window

---

## Document Status
- **Version:** 0.1
- **Status:** Draft
- **Related documents:** PRD, requirements.md, data_model.md
