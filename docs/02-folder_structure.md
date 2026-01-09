examineer/
├─ README.md
├─ CLAUDE.md
├─ .gitignore
├─ .env.example
├─ docker-compose.yml
│
├─ docs/
│  ├─ prd/
│  │  ├─ README.md
│  │  ├─ prd.md
│  │  ├─ folder_structure.md
│  │  ├─ data_model.md
│  │  ├─ requirements.md
│  │  ├─ api_documentation.md
│  │  └─ glossary.md
│
├─ apps/
│  ├─ frontend/
│  │  └─ src/
│  │     └─ app/
│  │        └─ pages/
│  │           ├─ public/
│  │           │  ├─ LandingPage.tsx
│  │           │  ├─ LoginPage.tsx
│  │           │  ├─ AcceptInvitePage.tsx
│  │           │  └─ index.ts
│  │           │
│  │           ├─ teacher/
│  │           │  ├─ TeacherDashboardPage.tsx
│  │           │  │
│  │           │  ├─ exams/
│  │           │  │  ├─ ExamsListPage.tsx
│  │           │  │  ├─ ExamCreatePage.tsx
│  │           │  │  ├─ ExamEditPage.tsx
│  │           │  │  ├─ ExamPreviewPage.tsx
│  │           │  │  ├─ ExamResultsPage.tsx
│  │           │  │  └─ index.ts
│  │           │  │
│  │           │  ├─ students/
│  │           │  │  ├─ StudentsListPage.tsx
│  │           │  │  └─ index.ts
│  │           │  │
│  │           │  ├─ topics/
│  │           │  │  ├─ TopicsListPage.tsx
│  │           │  │  └─ index.ts
│  │           │  │
│  │           │  ├─ settings/
│  │           │  │  ├─ TeacherSettingsPage.tsx
│  │           │  │  └─ index.ts
│  │           │  │
│  │           │  └─ index.ts
│  │           │
│  │           ├─ student/
│  │           │  ├─ StudentDashboardPage.tsx
│  │           │  │
│  │           │  ├─ exams/
│  │           │  │  ├─ ActiveExamsPage.tsx
│  │           │  │  ├─ TakeExamPage.tsx
│  │           │  │  ├─ ExamResultPage.tsx
│  │           │  │  └─ index.ts
│  │           │  │
│  │           │  ├─ profile/
│  │           │  │  ├─ StudentProfilePage.tsx
│  │           │  │  └─ index.ts
│  │           │  │
│  │           │  └─ index.ts
│  │           │
│  │           └─ index.ts
│  │
│  └─ backend/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ Dockerfile
│     └─ src/
│        ├─ main.ts
│        ├─ server.ts
│        ├─ config/
│        │  ├─ env.ts
│        │  └─ index.ts
│        │
│        ├─ router/
│        │  ├─ index.ts
│        │  └─ routes.ts
│        │
│        ├─ controllers/
│        │  ├─ auth.controller.ts
│        │  ├─ exams.controller.ts
│        │  ├─ questions.controller.ts
│        │  ├─ students.controller.ts
│        │  ├─ attempts.controller.ts
│        │  ├─ results.controller.ts
│        │  └─ index.ts
│        │
│        ├─ handlers/
│        │  ├─ auth.handler.ts
│        │  ├─ exams.handler.ts
│        │  ├─ questions.handler.ts
│        │  ├─ students.handler.ts
│        │  ├─ attempts.handler.ts
│        │  ├─ results.handler.ts
│        │  └─ index.ts
│        │
│        ├─ middleware/
│        │  ├─ auth.ts
│        │  ├─ roleGuard.ts
│        │  ├─ validate.ts
│        │  ├─ errorHandler.ts
│        │  └─ index.ts
│        │
│        ├─ contracts/
│        │  ├─ auth.dto.ts
│        │  ├─ exams.dto.ts
│        │  ├─ questions.dto.ts
│        │  ├─ students.dto.ts
│        │  ├─ attempts.dto.ts
│        │  ├─ results.dto.ts
│        │  └─ index.ts
│        │
│        ├─ errors/
│        │  ├─ AppError.ts
│        │  ├─ httpErrors.ts
│        │  └─ index.ts
│        │
│        └─ utils/
│           ├─ asyncHandler.ts
│           ├─ logger.ts
│           └─ index.ts
│
└─ infra/
   └─ db/
      ├─ migrations/
      ├─ ops/
      ├─ seeds/
      ├─ tools/
      │  └─ .gitkeep
      └─ Dockerfile
      └─ entrypoint.sh
      └─ flyway.conf
      └─ docker-compose.yml