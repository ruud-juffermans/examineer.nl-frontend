# Delivery Phases – What to Build When

This document describes the **phased delivery plan** for the Examineer platform.  
It defines scope, goals, and rationale per phase to control complexity and ensure steady value delivery.

---

## FR → Phase Mapping (Traceability Matrix)

| Functional Requirement | MVP | V1 | V2 | V3 | Later |
|------------------------|:---:|:--:|:--:|:--:|:-----:|
| FR-1 Authentication & Roles | ✅ | | | | |
| FR-2 Exam Creation | ✅ | | | | |
| FR-3 Question Management | ✅ | | | | |
| FR-4 Student Management | ✅ | | | | |
| FR-5 Exam Taking | ✅ | | | | |
| FR-6 Results & Grading | ✅ | | | | |
| FR-7 Feedback & Learning Support | | ✅ | | | |
| FR-8 Scoring & Attempts | | ✅ | | | |
| FR-9 Exam Configuration & Modes | | ✅ | | | |
| FR-10 Topic Mapping | | ✅ | | | |
| FR-11 Invitations & Access Control | | ✅ | | | |
| FR-12 Attempt Management | | ✅ | | | |
| FR-13 Student Feedback UI | | ✅ | | | |
| FR-14 Teacher Analytics | | | ✅ | | |
| FR-15 Student Progress Tracking | | | ✅ | | |

---

## MVP — Minimum Viable Product

### Goal
Validate the **core exam preparation workflow** end-to-end.

> _Create exam → student takes exam → teacher sees results_

---

### Included
- FR-1 Authentication & Roles
- FR-2 Exam Creation
- FR-3 Question Management
- FR-4 Student Management
- FR-5 Exam Taking (single attempt)
- FR-6 Results & Grading
- Basic feedback (correct / incorrect)

---

### Excluded
- Topics
- Analytics dashboards
- Retakes
- Time limits
- Exam modes

---

### Release Checklist (MVP)
- [ ] All MVP FRs implemented and reviewed
- [ ] End-to-end flow tested (teacher → student → results)
- [ ] Basic security checks completed
- [ ] Autosave stability verified
- [ ] MVP tagged and deployed
- [ ] MVP documentation updated

---

## V1 — Learning-Focused Release

### Goal
Transform Examineer into a **learning-focused exam preparation tool**.

---

### Included
- FR-7 Feedback & Learning Support
- FR-8 Scoring & Attempts
- FR-9 Exam Configuration & Modes
- FR-10 Topic Mapping
- FR-11 Invitations & Access Control
- FR-12 Attempt Management
- FR-13 Student Feedback UI

---

### UX Improvements
- Progress indicator
- Improved exam instructions
- Dedicated feedback UI

---

### Release Checklist (V1)
- [ ] Topic tagging works across exams
- [ ] Feedback explanations displayed correctly
- [ ] Multiple attempts tracked historically
- [ ] Learning vs exam mode enforced
- [ ] UX improvements validated
- [ ] Migration scripts tested
- [ ] V1 deployed and announced

---

## V2 — Exam Simulation & Insights

### Goal
Increase **exam realism** and **pedagogical insight**.

---

### Included
- FR-14 Teacher Analytics Dashboard
- FR-15 Student Progress Tracking
- Time limits & attempt limits
- Strict exam simulation mode

---

### Reliability & Scale
- Improved concurrency handling
- Enhanced error recovery

---

### Release Checklist (V2)
- [ ] Analytics dashboards accurate and performant
- [ ] Time limits enforced correctly
- [ ] Simulation mode blocks early feedback
- [ ] Load testing completed
- [ ] Error recovery tested
- [ ] Monitoring enabled
- [ ] V2 deployed

---

## V3 — Productization

### Goal
Prepare Examineer for **broader adoption and monetization**.

---

### Included
- Multiple classes / groups
- Admin role
- Exam templates
- Export results (CSV / PDF)
- Theme customization for teachers
- Email notifications

---

### Release Checklist (V3)
- [ ] Multi-class separation verified
- [ ] Admin permissions validated
- [ ] Export formats correct
- [ ] Theming tested
- [ ] Email delivery verified
- [ ] Upgrade path documented
- [ ] V3 released

---

## Later — Enterprise / Long-Term

### Goal
Scale, differentiate, and support institutional use cases.

---

### Possible Additions
- Predefined syllabi
- AI-generated feedback suggestions
- Adaptive exams
- Anti-cheating measures
- Institution-level analytics
- LMS / SSO integrations

---

## Guiding Principles
- Each phase must be **shippable and valuable**
- No phase should block learning outcomes
- Requirements always trace back to PRD

---

## Document Status
- **Version:** 0.2  
- **Status:** Draft  
- **Related documents:** PRD, requirements.md
