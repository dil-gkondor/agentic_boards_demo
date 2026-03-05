import { daysFromNow } from '../utils/date.js';

export function buildDashboardCases() {
  return [
    {
      id: 'governance-book-new',
      route: '/cases/mastercard-pli',
      title: 'Governance Book - Create New Book',
      completion: 15,
      dueDate: daysFromNow(3),
      statusPill: 'At risk',
      tags: ['Draft', 'Needs Owner'],
      description: 'Early stage: template + meeting metadata + owners'
    },
    {
      id: 'board-assign-members',
      route: null,
      title: 'Board - Assign Members & Roles',
      completion: 33,
      dueDate: daysFromNow(-2),
      statusPill: 'At risk',
      tags: ['Awaiting Acceptance'],
      description: 'Tracks invites accepted + role assignment completion'
    },
    {
      id: 'smart-builder-sections',
      route: null,
      title: 'Smart Builder - Suggested Sections Ready',
      completion: 68,
      dueDate: daysFromNow(7),
      statusPill: 'On track',
      tags: ['Needs Review', 'Auto-filled'],
      description: 'AI/rules suggested sections + pulled in recurring items'
    },
    {
      id: 'smart-builder-conflicts',
      route: null,
      title: 'Smart Builder - Conflicts & Gaps',
      completion: 90,
      dueDate: daysFromNow(1),
      statusPill: 'At risk',
      tags: ['3 items missing', '2 conflicts'],
      description: 'Very actionable: tells users exactly what blocks publishing'
    }
  ];
}

export const DASHBOARD_MUTED_PRODUCTS = [
  'Audit',
  'Boardeffect',
  'Boards',
  'Community',
  'DMI',
  'Equity invest',
  'ESG',
  'Issue Manager',
  'Policy manager',
  'Research portal'
];

export const DASHBOARD_CHIPS_INITIAL = [
  { prompt: 'Open latest tech related book', label: 'Open latest tech related book' },
  { prompt: 'Generate agenda & sections', label: 'Generate agenda & sections' },
  { prompt: 'Run smart build now', label: 'Run smart build now' },
  { prompt: 'Run final readiness check', label: 'Run final readiness check' }
];

export const DASHBOARD_CHIPS_AFTER_SUMMARY = [
  { prompt: 'Fix missing items list', label: 'Fix missing items list' },
  { prompt: 'Resolve duplicate / outdated docs', label: 'Resolve duplicate / outdated docs' },
  { prompt: 'Send for approvals', label: 'Send for approvals' },
  { prompt: 'Publish & notify recipients', label: 'Publish & notify recipients' }
];

export const ROTATING_STATUS_MESSAGES = [
  'Scanning board materials...',
  'Checking document versions...',
  'Pulling recurring agenda items...',
  'Identifying missing sections...',
  'Building your board book draft...',
  'Finalizing...'
];

export const FEATURE_CARDS = [
  {
    title: 'Board Onboarding',
    desc: 'Assign committees & roles, send access packets, and generate onboarding checklists for new directors.'
  },
  {
    title: 'Board Book - Meeting Draft',
    desc: 'Generate agenda & sections, request materials from owners, and pull recurring items from past meetings.'
  },
  {
    title: 'Smart Book Builder',
    desc: 'Run smart build to auto-compile packs, fix missing items, and resolve duplicate or outdated documents.'
  },
  {
    title: 'Final Review & Publish',
    desc: 'Run final readiness check, send for approvals, and publish & notify recipients when ready.'
  }
];

export const ASSISTANT_QUICK_PROMPTS = [
  'Generate agenda',
  'Request materials',
  'Run smart build',
  'Create executive summary'
];
