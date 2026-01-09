# Product Requirements Document (PRD)

Product Name: Examineer
Domain: examineer.nl
Product Type: Web application (SaaS-style)
Version: 0.1
Status: Draft
Owner: Product / Engineering
Last Updated: YYYY-MM-DD

---

## Summary
**Purpose**

Examineer is a web-based exam preparation platform that helps teachers prepare students for real-world exams by offering structured multiple-choice practice exams combined with meaningful feedback and performance insights.

**Problem Statement**

Students often practice for exams using static materials (books, PDFs, past exams) without receiving immediate, structured feedback on their performance. Teachers, in turn, lack insight into which topics students struggle with and cannot easily tailor their instruction based on objective practice data.

**Proposed Solution**

Examineer enables teachers to create exam-like multiple-choice practice tests that simulate real exams. Students take these exams online and receive a score along with targeted feedback that highlights strengths, weaknesses, and topics requiring additional study. Teachers gain visibility into both individual and group-level performance, allowing them to adjust teaching focus and provide targeted guidance.

**Educational Value Proposition**

__For students:__
- Clear scoring to benchmark exam readiness
- Feedback that explains what went wrong and where to improve
- Reduced exam anxiety through realistic practice

__For teachers:__
- Insight into topic-level knowledge gaps
- Data-driven teaching adjustments
- Reduced manual grading effort

**Success Definition**

The product is successful when:
- Students can clearly understand why they received a certain score
- Teachers can identify weak topics across a class within minutes
- Practice exams demonstrably improve student outcomes over time
- The platform is trusted as a reliable exam-preparation tool

# UX & Design Requirements

## Exam-taking UI
- Distraction-free layout
- Persistent progress indicator
- Clear remaining-time display (when enabled)

## Dashboard UI (teacher)
- Step-by-step exam creation flow
- Clear validation and error messages
- Preview mode before publishing

## Dashboard UI (student)
- Clear exam instructions
- Confirmation on submission
- Explicit feedback visibility rules

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