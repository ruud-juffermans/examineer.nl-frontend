# Styling & UI System Definition — Examineer (MVP)

This document defines the **styling, visual language, and UI system rules** for the Examineer application.
It is intended to be used as a **single source of truth** for design decisions and as input for LLM-assisted development.

---

## 1. Design Philosophy

### Overall Feel

**Dashboard UIs (Teacher & Student)**
- Modern Tech SaaS
- Polished and visually rich
- Uses gradients and animations to create clarity and energy

**Exam-Taking UI**
- Modern SaaS / neutral
- Calm, focused, distraction-free
- Visual richness reduced in favor of readability and concentration

### Core Principles
- Visual hierarchy over visual noise
- Animations should enhance understanding, not distract
- Exam-taking experience prioritizes focus above branding

---

## 2. Brand, Colors & Themes

### Color System
- Claude should propose a **flexible, token-based color palette**
- Palette must support:
  - Multiple theme variants
  - Easy runtime theme switching
- No hardcoded colors in components

### Theme Strategy
- Multiple **light and dark themes**
- Themes are:
  - Globally configurable
  - User-selectable in later versions (teacher / student)
- Exam-taking UI may:
  - Use a neutral variant of the active theme
  - Or override theme to reduce distraction (future option)

### Gradients
- Gradients are a **core visual element**
- Used in:
  - Dashboard headers
  - Cards
  - Primary actions
- Gradients should be **minimal or absent** in exam-taking UI

---

## 3. Light / Dark Mode Strategy

- Support multiple light themes
- Support multiple dark themes
- Theme selection:
  - Defined globally by default
  - Stored in user preferences in later versions
- No requirement to follow system preference automatically

---

## 4. Typography System

### Font
- Google Fonts
- Preferred options:
  - Inter
  - Source Sans (or similar modern sans-serif)

### Font Weights
- Full font-weight scale available (100–900)

### Base Font Sizes
- Defined via theme tokens
- Default values:
  - Dashboard UI: **14px**
  - Exam-taking UI: **16px**
- Base sizes must be easily adjustable globally

### Headings
- Subtle and restrained
- Clear hierarchy without excessive boldness

---

## 5. Spacing & Layout Density

### Spacing System
- Base spacing unit: **4px**
- All spacing derived from this unit

### Layout Density
- Dashboard UI: **Compact**
- Exam-taking UI: **Comfortable**

### Forms
- Support both:
  - Single-column layouts
  - Two-column layouts (desktop only)
- Maintain consistent vertical rhythm

---

## 6. Component Styling Rules

### Buttons
- Modern SaaS styling
- Primary buttons:
  - May include icons
  - Icons encouraged for primary actions
- Multiple primary buttons per page are allowed

### Inputs
- Filled-style inputs (not outlined)
- Clear focus and hover states

### Error States
- Subtle but clearly visible
- Styled consistently with the theme
- Avoid harsh reds unless critical

---

## 7. Exam-Taking UX Rules (Strict)

### Layout
- Full-width layout
- No sidebar
- No global navigation

### Progress Indicator
- Question count only  
  Example: `5 / 20`

### Timer
- Always visible
- Visually emphasized when time is low (future enhancement)

### Navigation
- Linear navigation only:
  - Next
  - Previous
- No jumping between questions

### Submission
- Confirmation dialog required
- Warn user if unanswered questions remain

---

## 8. Animations & Motion

### Dashboard UIs
- Rich but tasteful animations:
  - Page transitions
  - Hover effects
  - Card entrance animations
- Gradients and motion may be combined

### Exam-Taking UI
- Only subtle animations:
  - Button feedback
  - Progress updates
- No page transitions during exam flow

---

## 9. Icons & Visual Language

### Icon Set
- Material Icons
- Outline style only

### Usage
- Icons used for:
  - Navigation
  - Primary actions
  - Status indicators
- Icons should never replace text labels entirely

---

## 10. Implementation Expectations

- Styling must be:
  - Theme-driven
  - Token-based
  - Centralized
- Claude should generate:
  - Theme tokens (colors, spacing, typography)
  - Base layout components
  - Exam UI skeleton with reduced styling

---

## Document Status
- **Version:** 0.1
- **Status:** Draft
- **Applies to:** MVP and forward-compatible versions
