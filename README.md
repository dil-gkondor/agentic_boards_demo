# Diligent Boards Companion (Vite + Atlas MUI)

This project recreates the "Diligent Evidence Companion" UI using Vite + React and the Atlas MUI theme. The UI is derived from the app manifest and includes dashboard and case views, a split-pane layout, AI chat mock flows, and an evidence drawer.

## Stack
- Vite + React
- Atlas MUI theme provider (`AtlasThemeProvider`) with the Lens theme
- MUI components styled via Atlas tokens

## Getting Started

### Install
```bash
npm install
```

### Run
```bash
npm run dev

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Project Structure
```
src/
  components/
    AssistantPanel.jsx
    CaseView.jsx
    ContextMenu.jsx
    DashboardView.jsx
    EvidenceDrawer.jsx
    TopBar.jsx
  data/
    cases.js
    dashboard.js
    routes.js
    storage.js
  utils/
    case.js
    date.js
    routing.js
  App.jsx
  main.jsx
```

## Notes
- Atlas theme provider is configured in `src/main.jsx` using `AtlasThemeProvider` and `lensThemeOptions`.
- Design tokens are accessed via `useTheme()` and applied in `sx`.
- Routing is hash-based (`#/` and `#/cases/:caseSlug`).

