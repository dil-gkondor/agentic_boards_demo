## Diligent Evidence Companion

# Diligent Evidence Companion

Agentic GRC helper (Electron) for tracking evidence/report statuses across a simple flow:

**Cases → Project detail → Agent chat**

This project explores a hybrid experience: a **static, auditable status view** (lists, checklists, timelines) paired with an **agentic assistant** that proposes next actions and keeps context aligned with the underlying process.

---

## Run

From this folder:

```bash
npm install
npm run dev

What’s implemented (UI MVP)

3-column layout + top bar: dark tokens, draggable Electron top bar.

Resizable splitters: left + right columns with min/max constraints, persisted via localStorage.

Cases list: search, filter chips, sort, selection highlight, right-click context menu.

Project detail: sticky header, KPI chips, evidence checklist with hover inline actions, blockers, timeline, audit notes.

Evidence pack drawer: slide-in preview with index table.

Agentic chat: mode/objective/next-action header + action cards + approval gates + simulated responses.

Core UX idea

Keep process visibility front-and-center (statuses, evidence checklist, timeline).

Use the agent to drive actionable next steps (requests, nudges, summaries, readiness checks).

Maintain traceability via approval gates and explicit actions rather than hidden automation.

Notes / current limitations

Agentic chat responses are currently simulated (UI-first prototype).

Data sources and integrations are intentionally minimal to focus on workflow + interaction patterns.

Suggested next steps (roadmap ideas)

Real “evidence readiness” scoring (missing items, stale documents, overdue owners).

Smart book/pack assembly (auto-compile, dedupe, version checks).

Audit-friendly activity log (who/what/when/why for every action).

Pluggable connectors (file stores, ticketing, compliance systems).

Design

Built for Atlas dark mode styling and utility-focused, data-heavy workflows.

Emphasis on fast scanning (chips, KPIs, sticky headers) and low-friction actions.

