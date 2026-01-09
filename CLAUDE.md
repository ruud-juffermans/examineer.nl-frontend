# CLAUDE.md — AI Working Instructions for Examineer

  ## 1. Purpose

  This file defines how Claude should work in this repository.

  **Documentation precedence (highest to lowest):**
  1. `CLAUDE.md`
  2. `docs/mvp/mvp_requirements.md`
  3. `docs/mvp/mvp_features.md`
  4. `docs/05-design_philosophy.md`

  ---

  ## 2. Product Context

  **Product:** Examineer
  **Domain:** examineer.nl
  **Type:** Web-based exam preparation platform

  **MVP Core Flow:**
  Teacher creates exam → Student takes exam → Teacher sees results

  **User Roles:** Teacher, Student

  ---

  ## 3. MVP Scope (Critical)

  Build only MVP features unless explicitly instructed otherwise.

  ### MVP Includes
  - Teacher/student authentication (email + password, JWT)
  - Exam creation (title, description, draft/published)
  - Multiple-choice questions (text, options, one correct, points)
  - Student assignment to exams
  - Single attempt per student per exam
  - Automatic grading (percentage score)
  - Basic correct/incorrect feedback per question

  ### MVP Excludes
  - Topics
  - Explanations/feedback text
  - Retakes
  - Time limits
  - Exam modes (learning/simulation)
  - Analytics dashboards
  - Email invitations/notifications

  If asked to implement excluded features, warn explicitly.

  ---

  ## 4. Tech Stack

  ### Frontend
  - React + TypeScript + Vite
  - Role-based routing
  - No global state libraries unless requested

  ### Backend
  - Node.js + TypeScript
  - REST API (`/api/v1`)
  - Layered: Controllers → Handlers → Contracts (DTO + validation)
  - PostgreSQL with Flyway migrations

  ### Infrastructure
  - Docker Compose for local dev
  - Environment config via `.env`

  ---

  ## 5. Architecture Rules

  - Controllers are thin (routing + validation only)
  - Business logic lives in handlers
  - Database access only in repositories
  - All requests validated via contracts
  - No GraphQL, no serverless

  ---

  ## 6. Styling Rules

  Refer to `docs/05-design_philosophy.md` for details.

  ### Dashboard UI
  - Modern SaaS, polished
  - Gradients and animations allowed

  ### Exam-Taking UI
  - Calm, focused, distraction-free
  - Full-width, no sidebar, no global nav
  - Minimal animations
  - Linear navigation only (Next/Previous)

  ### General
  - Theme-driven, token-based colors
  - No hardcoded colors
  - Material Icons (outline style only)
  - Font: Inter or similar, base 14px (dashboard) / 16px (exam)

  ---

  ## 7. Coding Conventions

  - TypeScript everywhere, no `any`
  - Explicit types at boundaries
  - One component per file
  - Pages contain no business logic
  - Services handle API calls
  - Hooks handle reusable logic

  ---

  ## 8. Git Workflow

  - Always create a new branch when implementing a new feature
  - Branch naming: `feature/<feature-name>` (e.g., `feature/exam-creation`)
  - Do not commit directly to `main`

  ---

  ## 9. Data Model

  Refer to `docs/03-data_model.md`. MVP tables:
  - users, exams, questions, question_options
  - exam_assignments, attempts, attempt_answers

  ---

  ## 9. API

  Refer to `docs/04-api_documentation.md`. Key endpoints:
  - `POST /auth/register`, `POST /auth/login`
  - `POST /exams`, `PUT /exams/{id}`, `POST /exams/{id}/publish`
  - `POST /exams/{id}/questions`
  - `POST /exams/{id}/assign`
  - `POST /exams/{id}/attempts`, `POST /attempts/{id}/submit`
  - `GET /attempts/{id}/result`

  ---

  ## 11. Forbidden Behaviors

  - Expand scope silently
  - Redesign architecture
  - Introduce new frameworks
  - Skip validation layers
  - Hardcode colors or invent styles
  - Add rich animations to exam UI

  ---

  ## 12. Success Criteria

  Claude is doing well when:
  - Output matches MVP requirements exactly
  - Code fits existing folder structure
  - No scope creep
  - Styling is consistent