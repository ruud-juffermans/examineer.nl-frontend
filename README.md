# Examineer

**Examineer** is a web-based exam preparation platform designed to help teachers prepare students for real-world exams through structured multiple-choice practice exams, meaningful feedback, and performance insights.

The platform focuses on **learning and exam readiness**, not just assessment.

---

## ✨ Key Features

### For Teachers
- Create and manage multiple-choice practice exams
- Assign exams to students via email or invite links
- Configure exams in **learning mode** or **exam simulation mode**
- View detailed results and topic-level performance insights
- Reduce manual grading through automatic scoring

### For Students
- Take realistic practice exams online
- Receive clear scores and structured feedback
- Understand strengths and weaknesses per topic
- Retake exams to track progress over time

---

## 🎯 Product Vision

Examineer aims to:
- Improve student exam readiness through realistic practice
- Provide actionable insights for teachers
- Reduce exam anxiety with familiarity and feedback
- Serve as a lightweight alternative to full LMS platforms

---

## 🧱 Tech Stack

### Frontend
- TypeScript
- React
- Vite

### Backend
- Node.js
- TypeScript
- Express-style API architecture

### Database
- Relational database (schema defined in PRD)
- Automatic grading & attempt history

### Infrastructure
- Docker & Docker Compose
- Optional Nginx reverse proxy

---

## 📁 Repository Structure

```text
examineer/
├─ apps/
│  ├─ frontend/        # Vite + React frontend
│  └─ backend/         # Node.js + TypeScript API
│
├─ docs/
│  ├─ prd/             # Product Requirements Document
│  └─ adr/             # Architecture Decision Records
│
├─ infra/              # Infrastructure configs (nginx, db)
├─ docker-compose.yml
└─ README.md
```

Detailed structure documentation can be found in:
- `docs/prd/folder_structure.md`

---

## 📘 Product Requirements Document (PRD)

The PRD is maintained **inside this repository** and versioned like code.

Location:
```text
docs/prd/
```

Key PRD files:
- `prd.md` – Full product description and scope
- `requirements.md` – Functional & non-functional requirements
- `data_model.md` – Conceptual data model
- `api_documentation.md` – API-level expectations

---

## 🚀 Getting Started (Development)

### Prerequisites
- Node.js (LTS)
- Docker & Docker Compose

### Start the stack
```bash
docker-compose up --build
```

This will start:
- Frontend (Vite dev server)
- Backend API
- Database (if configured)

---

## 🧪 Testing

Backend:
- Unit tests: `apps/backend/src/tests/unit`
- Integration tests: `apps/backend/src/tests/integration`

Frontend:
- Unit and E2E tests live alongside feature folders

---

## 📌 Project Status

- **Version:** 0.1
- **Status:** Draft / Early Development
- **Primary focus:** MVP for exam preparation

---

## 🗺️ Roadmap (High-Level)

- **Phase 1:** Core exam creation & feedback (MVP)
- **Phase 2:** Exam simulation & analytics
- **Phase 3:** Scaling, admin tools, monetization

See `docs/prd/08-roadmap.md` for details.

---

## 🤝 Contributing

This project follows:
- PRD-driven development
- Clear separation of concerns
- Explicit architecture decisions (ADR)

All changes should reference:
- Relevant PRD sections
- Related roadmap items

---

## 📄 License

License to be determined.
