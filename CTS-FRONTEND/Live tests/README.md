# CTS Frontend

This workspace now contains a polished Student Portal built with React, TypeScript, Vite, React Router, and Redux Toolkit.

It follows the Digital Nurture frontend guide as a single React implementation of the shared Student Portal scenario. The Angular and Vue sections in the book are framework-specific alternatives, so this project focuses on the React path and keeps the structure clean and easy to extend.

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `src/data/` keeps the course catalog and portal summary data.
- `src/api/` contains the mock async data layer.
- `src/store/` holds Redux Toolkit slices, selectors, and typed hooks.
- `src/components/` contains the shared UI building blocks.
- `src/pages/` contains the route-based screens.

## What it demonstrates

- Semantic page structure and responsive layout
- Search, sort, route navigation, and accessible course cards
- Async loading states and a live notification panel
- Redux-based enrollment state with enroll / unenroll / reset flows
- A profile form and course detail screen tied to the same portal data

## Folder Map

- `Home` page: landing layout, hero, summary stats, and notifications
- `Courses` page: searchable, sortable grid with keyboard-accessible cards
- `Course detail` page: route params, details view, and enroll action
- `Profile` page: local form state, enrollment list, and total credit summary