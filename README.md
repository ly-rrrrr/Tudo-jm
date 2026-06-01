<p align="right"><sub><a href="README_zh.md">中文</a></sub></p>

<h1 align="center">Tudo — Daily Planner</h1>

<p align="center">
  <b>Three-Body Sci-Fi Aesthetic</b> · dark cosmos · cyan glows · starfield canvas
</p>

<p align="center">
  <sub>Preact + Vite · ~28 KB gzipped · MIT · <a href="https://github.com/ly-rrrrr/Tudo-jm">GitHub</a></sub>
</p>

---

### Features

| Category | Details |
|----------|---------|
| Daily Planning | Rich Markdown or WYSIWYG editor for daily notes |
| Task Management | Create / edit / complete / delete tasks with priority (High/Medium/Low) and time slots |
| Calendar | Month, Week, Day views with colored task indicators and positioned time blocks |
| Overdue Alerts | Incomplete past tasks appear as warnings on today's view |
| Auto Archive | Completed tasks collapse automatically — expand with one click |
| Mini Calendar | Compact month picker with task dot indicators |
| Recent Plans | Quick-jump list of previously planned days |
| Local First | All data in localStorage — no server, no signup |

### Visual Overview

**Main View — Daily Planning**
```
+------------------------------------------------------------------------+
| [TUDO]   [<] [June 2026] [>] [Today]       [Calendar] [Settings]     |
+------------------------------------------------------------------------+
| Monday, June 1, 2026                                    [Auto-saved]   |
| [MD|RICH] [B I U S H • 1.]                              [+ Task]     |
|                                                                        |
|  ## Meeting Notes                                                      |
|  - Discuss Q3 roadmap                                                  |
|  - Review PR #42                                                       |
|                                                                        |
+------------------------------------------------------------------------+
| ⚠ 2 overdue from earlier days                                         |
|   May 30 Sat   Fix login bug                              [amber ●]   |
|   May 31 Sun   Update dependencies                         [cyan ●]   |
|------------------------------------------------------------------------|
| ☐ Design new API endpoint                    10:00-11:30   work    ✕  |
| ☐ Code review for PR #55                     14:00-15:00   dev     ✕  |
| ☑ Buy groceries (completed)                                          |
+------------------------------------------------------------------------+
```

**Calendar Popover — Month View**
```
+------------------------------------------+
| [Month]  [Week]  [Day]                   |
|                                          |
|        June 2026                         |
|  Su  Mo  Tu  We  Th  Fr  Sa             |
|       1   2   3   4   5   6             |
|   7   8   9  10  11  12  13             |
|  14  15  16  17  18  19  20             |
|  21  22  23  24  25  26  27             |
|  28  29  30                             |
|  ● task   🔴 overdue   🟢 all done     |
|                                          |
| --- Mini Calendar -------------------    |
|  < June 2026 >                          |
|  Su Mo Tu We Th Fr Sa                   |
|      ●  1   2   3   4   5              |
|   6  7  8  9  10  11  12               |
|  ...                                    |
|                                          |
| --- Recent Plans --------------------    |
|  Jun 1 Mon · 3 tasks                    |
|  May 30 Sat · 2 tasks                   |
+------------------------------------------+
```

**Calendar Popover — Week View (time blocks)**
```
+------------------------------------------+
| [Month]  [Week]  [Day]                   |
|      Mon   Tue   Wed   Thu   Fri         |
|      1     2     3     4     5           |
| 12AM ─────────────────────────────       |
|  ...                                     |
|  9AM ┌──────────┐                        |
| 10AM │Design API│  ┌──────────┐          |
| 11AM │(2h)      │  │Team Sync │          |
| 12PM └──────────┘  │(1h)      │          |
|  1PM               └──────────┘          |
|  ...                                     |
|  2PM ┌──────────┐                        |
|  3PM │Code      │                        |
|  4PM │Review    │                        |
+------------------------------------------+
```

**Task Editor Modal (glass morphism)**
```
+---------------------------------------------------+
|  Edit Task                                    [✕]  |
|---------------------------------------------------|
|  Title *                                           |
|  [Design new API endpoint______________________]  |
|                                                    |
|  Date              Priority                        |
|  [2026-06-01]      [Medium ▾]                      |
|                                                    |
|  Start Time        End Time                        |
|  [10:00]           [11:30]                         |
|                                                    |
|  Category                                          |
|  [work_________________________________________]  |
|                                                    |
|  Description (Markdown)                            |
|  [Design RESTful API for the new quantum________]  |
|  [module. See spec doc for details._____________]  |
|                                                    |
|---------------------------------------------------|
|                    [Cancel]  [Save Changes]        |
+---------------------------------------------------+
```

### Quick Start

```bash
npm install       # Install dependencies
npm run dev       # Start dev server → http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build
```

### Tech Stack

| Layer | Library | Gzipped |
|-------|---------|---------|
| Framework | [Preact](https://preactjs.com/) | ~4.5 KB |
| Markdown | [marked](https://marked.js.org/) | ~20 KB |
| Build | [Vite](https://vitejs.dev/) | dev only |

**Total runtime JS: ~28 KB gzipped.** Zero other dependencies.

### Usage

**Daily Planning**
1. App opens to today's plan
2. Write notes in the editor — Markdown or Rich Text mode
3. Click **+ Task** or double-click a calendar day to add tasks
4. Navigate dates with the arrow buttons in the header

**Calendar** — click the calendar icon in the header
- **Month View**: 6×7 day grid, colored dots = tasks, red pulsing = overdue
- **Week View**: 7 columns × 24h, tasks display as positioned time blocks
- **Day View**: Single column with hourly breakdown + all-day task bar
- **Mini Calendar**: Quick month navigation below the main calendar
- **Recent Plans**: Click any entry to jump to that day

**Task Management**
- **Create**: "+ Task" button or double-click a calendar day
- **Edit**: Click any task to open the modal
- **Complete**: Click the checkbox — auto-archives to collapsed section
- **Delete**: Hover a task, click ✕, confirm
- **Priority**: High (red) / Medium (amber) / Low (cyan)
- **Time**: Optional start/end times — tasks render as time blocks in Week/Day views

**Editor Modes**
- **Markdown**: Type with shortcuts (Bold `**text**`, Heading `##`, List `- item`). Toggle preview pane.
- **Rich Text**: WYSIWYG contenteditable with formatting toolbar. Auto-converts to/from Markdown.

**Overdue Tasks**
- Past dates with unfinished tasks → red pulsing dot in calendar
- Today's view → warning banner listing all overdue tasks
- Click any overdue item to edit or reschedule it

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close any modal / popover |
| `Ctrl + Enter` | Save task in modal |

### Data & Privacy

All data stays in your browser (`localStorage`). Nothing is sent to any server.

| Storage Key | Content |
|-------------|---------|
| `tudo_tasks` | All task objects keyed by ID |
| `tudo_dayplans` | Daily plans (notes + task ID references) |
| `tudo_settings` | User preferences |

To back up: DevTools → Application → Local Storage → copy the three keys.

### Project Structure

```
src/
├── context/AppContext.jsx      # Central state (Context + useReducer, 15 actions)
├── components/
│   ├── Header.jsx               # Top bar: logo, nav, calendar/settings icons
│   ├── CalendarPopover.jsx      # Calendar dropdown (views + mini cal + plans)
│   ├── Starfield.jsx            # Canvas starfield animation (30fps, 80-300 stars)
│   ├── Calendar/                # MonthView, WeekView, DayView, DayCell
│   ├── Editor/                  # PlanEditor, Markdown/RichText editors, TaskList
│   ├── TaskModal/               # Task create/edit overlay (glass morphism)
│   └── SettingsModal/           # Preferences overlay
├── utils/
│   ├── dateUtils.js             # Calendar math + date formatting
│   ├── storage.js               # Versioned localStorage abstraction
│   ├── markdown.js              # marked wrapper + custom HTML→Markdown converter
│   └── id.js                    # crypto.randomUUID()
└── styles/                      # Design tokens, reset, typography, animations
```

### License

MIT — see [LICENSE](LICENSE).
