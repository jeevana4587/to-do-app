# FocusList

A fast, accessible daily task manager built as a frontend-only React + TypeScript application. Create tasks, prioritize them, track progress, and search/filter — all persisted locally in the browser.

**Live app:** [add your deployed HTTPS URL here]

## Features

- **Task creation** — add a task with a title and priority in one step
- **Task management** — mark complete/incomplete, edit in place, delete
- **Priority levels** — High / Medium / Low, shown with both a text label and a distinct shape (not color alone)
- **Search** — case-insensitive title search, live-filtered
- **Filtering** — by status (All / Active / Completed) and priority, combinable with search
- **Statistics** — live Total / Completed / Pending counts
- **Persistence** — tasks survive a page refresh via `localStorage`
- **Keyboard accessible** — every control is operable via Tab/Shift+Tab/Enter/Space; edit mode auto-focuses its input and supports Escape to cancel

## Tech stack

- React 18 + TypeScript (strict mode)
- Vite
- Oxlint for linting
- No external state library, no backend, no database — state lives in React and `localStorage`

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# lint
npm run lint

# type-check and build for production
npm run build

# preview the production build locally
npm run preview
```

## Project structure
src/
components/
Header.tsx Page heading
StatsCards.tsx Total / Completed / Pending display
TaskComposer.tsx Task creation form
TaskFilters.tsx Search + status + priority controls
TaskList.tsx Renders the visible task list or empty state
TaskItem.tsx Single task row, including inline edit mode
EmptyState.tsx "No tasks" vs "no tasks match filters"
hooks/
useLocalStorage.ts Typed localStorage read/write with validation
types/
task.ts Task model, type guards, ID generation
utils/
taskSelectors.ts Pure functions for filtering + stats
App.tsx Owns state, wires components together
main.tsx
index.css


## Data model

```ts
interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}
```

Tasks are stored under the key `focuslist.tasks.v1`. On load, stored data is parsed inside a `try/catch` and validated against a runtime type guard (`isTaskArray`) before being trusted — malformed or missing data falls back to an empty list instead of crashing the app.

## Accessibility

- Every input has a real associated `<label>` (no placeholder-only labeling)
- The completion checkbox exposes an accessible name via `aria-label` ("Mark task complete" / "Mark task incomplete")
- Priority is conveyed by text and shape, not color alone
- Visible focus styles on all interactive elements
- Edit mode moves keyboard focus to the edit input on open; Escape cancels

## Security

- Task titles render through normal JSX text interpolation — no `dangerouslySetInnerHTML`, no HTML injection surface
- `localStorage` reads are guarded and shape-validated before use
- No external dependencies beyond React/Vite tooling
