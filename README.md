# Tudo — Daily Planner · 每日规划器

[English](#english) | [中文](#中文)

A lightweight daily planning app with a **Three-Body (三体) sci-fi aesthetic** — deep space, cyan glows, starfield canvas.

轻量级每日规划应用，**《三体》科幻风格** UI —— 深空背景、青色辉光、星空画布。

---

## <a name="english">English</a>

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
|  The **quantum entanglement** module needs refactoring...              |
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
|  ● = task   🔴 = overdue   🟢 = done   |
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
|    Design API, Code review, Groceries   |
|  May 30 Sat · 2 tasks                   |
|    Fix login bug, Team sync             |
+------------------------------------------+
```

**Calendar Popover — Week View**
```
+------------------------------------------+
| [Month]  [Week]  [Day]                   |
|                                          |
|      Mon   Tue   Wed   Thu   Fri   ...   |
|      1     2     3     4     5           |
| 12AM ─────────────────────────────       |
|  1AM                                     |
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
|  ...                                       |
+------------------------------------------+
```

**Task Editor Modal**
```
+---------------------------------------------------+
|  New Task                                    [✕]  |
|---------------------------------------------------|
|  Title *                                           |
|  [Design new API endpoint______________________]  |
|                                                    |
|  Date              Priority                        |
|  [2026-06-01]      [Medium  ▾]                     |
|                                                    |
|  Start Time        End Time                        |
|  [10:00]           [11:30]                         |
|                                                    |
|  Category                                          |
|  [work_________________________________________]  |
|                                                    |
|  Description                                       |
|  [Design RESTful API for the new quantum________]  |
|  [module. See spec doc for details._____________]  |
|                                                    |
|---------------------------------------------------|
|                    [Cancel]  [Create Task]         |
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

| Layer | Library | Size (gzipped) |
|-------|---------|----------------|
| Framework | [Preact](https://preactjs.com/) | ~4.5 KB |
| Markdown | [marked](https://marked.js.org/) | ~20 KB |
| Build | [Vite](https://vitejs.dev/) | dev only |

**Total runtime JS: ~28 KB gzipped.** No other dependencies.

### Usage

**Daily Planning**
1. App opens to today's plan
2. Write notes in the editor — Markdown or Rich Text mode
3. Click **+ Task** or double-click a calendar day to add tasks
4. Navigate dates with arrow buttons in the header

**Calendar** — click the calendar icon in the header
- Month View: 6×7 day grid, colored dots = tasks, red pulsing = overdue
- Week View: 7 columns × 24h, tasks positioned as time blocks
- Day View: Single column with hourly breakdown + all-day task bar
- Mini Calendar: Quick month navigation below the main calendar
- Recent Plans: Click any entry to jump to that day

**Task Management**
- Create: "+ Task" button or double-click a calendar day
- Edit: Click any task to open the modal
- Complete: Click the checkbox — auto-archives to collapsed section
- Delete: Hover a task, click ✕, confirm
- Priority: High (red) / Medium (amber) / Low (cyan)
- Time: Optional start/end times — tasks appear as blocks in Week/Day views

**Editor Modes**
- **Markdown**: Type with shortcuts (Bold `**text**`, Heading `##`, List `- item`). Toggle preview pane.
- **Rich Text**: WYSIWYG contenteditable with formatting toolbar. Switches to/from Markdown automatically.

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

---

## <a name="中文">中文</a>

### 功能

| 分类 | 说明 |
|------|------|
| 每日规划 | Markdown / 富文本双模式编辑器，写笔记、列计划 |
| 任务管理 | 创建、编辑、完成、删除任务，支持优先级和时段 |
| 日历视图 | 月视图（6×7 网格）、周视图（7 列 × 24 小时）、日视图 |
| 逾期提醒 | 过去未完成的任务在今日视图顶部显示警告 |
| 自动归档 | 已完成任务自动折叠，一键展开查看 |
| 迷你日历 | 紧凑月份选择器，带任务圆点标记 |
| 历史计划 | 快速跳转到之前规划过的日期 |
| 纯本地 | 所有数据存 localStorage，无需服务器、无需注册 |

### 界面预览

见上方 [English Visual Overview](#visual-overview) 部分的 ASCII 效果图。

### 技术栈

| 层 | 库 | 体积 (gzip) |
|----|-----|-------------|
| 框架 | Preact | ~4.5 KB |
| Markdown | marked | ~20 KB |
| 构建 | Vite | 仅开发时 |

**运行时 JS 总计 ~28 KB (gzip)**，无其他依赖。

### 使用指南

**每日规划**
1. 打开即显示今日计划
2. 在编辑区写笔记，支持 Markdown 或富文本模式
3. 点击 **+ Task** 或双击日历日期添加任务
4. 使用顶部箭头切换日期

**日历** — 点击顶部日历图标打开弹窗
- 月视图：6×7 日期网格，彩色圆点 = 有任务，红色脉冲 = 逾期未完成
- 周视图：7 列 × 24 小时，带时段的任务显示为时间块
- 日视图：单列小时视图 + 顶部全天任务栏
- 迷你日历：主日历下方的快速月份导航
- 历史计划：点击任意条目跳转到对应日期

**任务管理**
- 创建：点击 "+ Task" 或双击日历格子
- 编辑：点击任意任务打开编辑弹窗
- 完成：点击复选框，任务自动归入「已完成」折叠区
- 删除：悬停任务，点击 ✕，确认删除
- 优先级：高（红）/ 中（橙）/ 低（青）
- 时段：可选开始/结束时间，在周/日视图中显示为时间块

**编辑器模式**
- **Markdown**：纯文本编辑，支持快捷插入（加粗 `**文字**`、标题 `##`、列表 `- 项目`）。可切换预览面板。
- **富文本**：所见即所得编辑，带格式工具栏。与 Markdown 模式互相自动转换。

**逾期任务**
- 过去日期有未完成任务 → 日历中显示红色脉冲圆点
- 今日视图 → 顶部警告横幅列出所有逾期任务
- 点击任意逾期条目可编辑或重新安排

### 键盘快捷键

| 按键 | 操作 |
|------|------|
| `Esc` | 关闭弹窗 / 日历 |
| `Ctrl + Enter` | 保存任务 |

### 数据与隐私

所有数据存储在浏览器 `localStorage` 中，不会发送到任何服务器。

| 存储键 | 内容 |
|--------|------|
| `tudo_tasks` | 所有任务（按 ID 索引） |
| `tudo_dayplans` | 每日计划（笔记 + 任务 ID 列表） |
| `tudo_settings` | 用户偏好设置 |

备份方法：DevTools → Application → Local Storage → 复制三个键的值。

### 项目结构

```
src/
├── context/AppContext.jsx      # 中心状态（Context + useReducer, 15 种 action）
├── components/
│   ├── Header.jsx               # 顶栏：Logo、日期导航、日历/设置图标
│   ├── CalendarPopover.jsx      # 日历弹窗（视图 + 迷你日历 + 历史计划）
│   ├── Starfield.jsx            # Canvas 星空动画（30fps, 80-300 颗星）
│   ├── Calendar/                # MonthView, WeekView, DayView, DayCell
│   ├── Editor/                  # PlanEditor, Markdown/RichText 编辑器, TaskList
│   ├── TaskModal/               # 任务创建/编辑弹窗（玻璃质感）
│   └── SettingsModal/           # 设置弹窗
├── utils/
│   ├── dateUtils.js             # 日历计算 + 日期格式化
│   ├── storage.js               # 带版本号的 localStorage 封装
│   ├── markdown.js              # marked 封装 + 自写 HTML→Markdown 转换器
│   └── id.js                    # crypto.randomUUID()
└── styles/                      # 设计令牌、重置、排版、动画
```

### 开源协议

MIT — 详见 [LICENSE](LICENSE)。
