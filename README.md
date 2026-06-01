# Tudo — Daily Planner

A lightweight daily planning application with a **Three-Body (三体) sci-fi aesthetic** — dark cosmic theme, cyan glow accents, starfield background, and HUD-style interface.

## Features

- **Daily Planning** — Rich markdown or WYSIWYG editor for daily notes and plans
- **Task Management** — Create, edit, complete, and delete tasks with priority levels and time slots
- **Calendar Views** — Month, week, and day views with task indicators
- **Overdue Reminders** — Past incomplete tasks show up as overdue warnings on today's view
- **Completed Archive** — Done tasks auto-collapse to keep your view clean
- **Mini Calendar** — Quick date navigation with task dot indicators
- **Recent Plans** — Browse previously planned days
- **Local Storage** — All data stored locally in your browser, no server required
- **URL Sharing** — Views and dates sync to URL params for bookmarking

## Screenshots

```
+------------------------------------------------------------------+
| [TUDO]  [<] [June 2026] [>] [Today]    [📅 Calendar] [⚙]      |
+------------------------------------------------------------------+
| Monday, June 1, 2026                             [Auto-saved]    |
| [MD | Rich] [B I U S H • 1.]                    [+ Task]        |
+------------------------------------------------------------------+
| Notes editor area (markdown or rich text)                        |
|                                                                  |
+------------------------------------------------------------------+
| ⚠ 2 overdue from earlier days                                   |
| ☐ Task 1                                   10:00  personal   ✕ |
| ☑ Task 2 (completed)                                            |
+------------------------------------------------------------------+
```

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.

## Tech Stack

| Layer | Library | Size (gzipped) |
|-------|---------|----------------|
| Framework | Preact | ~4.5 KB |
| Markdown | marked | ~20 KB |
| Build | Vite | dev only |

Total runtime: ~28 KB gzipped. Zero other dependencies.

## Usage Guide

### Daily Planning

1. Open the app — today's plan is shown by default
2. Write notes in the editor area (markdown or rich text mode)
3. Click **+ Task** to add tasks for the day
4. Use the date navigation arrows to move between days

### Task Management

- **Create**: Click "+ Task" in the toolbar or double-click a calendar day
- **Edit**: Click any task to open the edit modal
- **Complete**: Click the checkbox next to a task
- **Delete**: Hover a task and click the ✕ button
- **Priority**: Set Low / Medium / High when creating a task
- **Time**: Add start/end times for scheduled tasks (visible in week/day calendar views)

### Calendar

Click the **calendar icon** in the header to open the calendar popover:

- **Month View**: 6×7 day grid with colored task dots
- **Week View**: 7 columns × 24 hours with positioned task blocks
- **Day View**: Single day with hourly breakdown
- **Mini Calendar**: Bottom section for quick month navigation
- **Recent Plans**: Quickly jump to previously planned days

### Editor Modes

- **Markdown Mode**: Plain text with markdown shortcuts (B, I, S, H, list, link). Toggle preview to see rendered output.
- **Rich Text Mode**: WYSIWYG editing with formatting toolbar (bold, italic, underline, strikethrough, headings, lists).

### Overdue Tasks

Past dates with incomplete tasks show **red pulsing dots** in the calendar. When viewing today's plan, any unfinished tasks from earlier dates appear in a warning section at the top.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `←` / `→` | Navigate dates (when calendar is focused) |
| `Ctrl + N` | New task |
| `Esc` | Close modal / popover |
| `Ctrl + Enter` | Save task in modal |

## Data Storage

All data is stored in your browser's `localStorage` with versioned JSON keys:

| Key | Content |
|-----|---------|
| `tudo_tasks` | All tasks |
| `tudo_dayplans` | Daily plans (notes + task references) |
| `tudo_settings` | User preferences |

No data leaves your browser. To back up, export these keys from DevTools → Application → Local Storage.

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx         # Central state (Context + useReducer)
├── components/
│   ├── Header.jsx              # Top bar (logo, navigation, calendar/settings icons)
│   ├── CalendarPopover.jsx     # Calendar dropdown (views + mini calendar + plans)
│   ├── Starfield.jsx           # Canvas background animation
│   ├── Calendar/               # MonthView, WeekView, DayView, DayCell
│   ├── Editor/                 # PlanEditor, MarkdownEditor, RichTextEditor, TaskList
│   ├── TaskModal/              # Create/edit task overlay
│   └── SettingsModal/          # Settings overlay
├── utils/
│   ├── dateUtils.js            # Calendar math, date formatting
│   ├── storage.js              # localStorage abstraction
│   ├── markdown.js             # Markdown ↔ HTML conversion
│   └── id.js                   # UUID generator
└── styles/                     # Design tokens, reset, typography, animations
```

## License

MIT — see [LICENSE](LICENSE) for details.
