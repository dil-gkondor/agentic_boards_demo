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

export const OPEN_BOOK_MESSAGES = [
  'Opening latest Tech Book…',
  'Loading the latest version…',
  'Getting the newest Tech Book…',
  'Syncing and opening…',
  'Preparing your book…'
];

export const CREATE_BOOK_MESSAGES = [
  'Scanning latest AI research (2025–2026)…',
  'Extracting key shifts in foundation models…',
  'Summarizing multimodal + agentic workflows…',
  'Compiling governance, safety & regulation notes…',
  'Drafting your AI Trends 2026 meeting book…'
];

export const AI_TRENDS_BOOK_DATA = {
  slug: 'ai-trends-2026',
  title: 'Emerging AI trends in 2026',
  startDate: '2026-02-05',
  startTime: '10:00',
  endDate: '2026-02-05',
  endTime: '12:30',
  meetingLink: 'https://zoom.us/j/1234567890?pwd=AiTrends2026',
  remoteDetails: `Agenda (10:00–12:30):
10:00 Welcome + objectives
10:10 Foundation models: efficiency, scaling, distillation
10:35 Multimodal (text+image+audio+video) & real-time
11:00 Agentic workflows + tool use in enterprise
11:25 On-device/edge AI + privacy-preserving compute
11:45 Governance: safety, evals, EU/NIST/ISO alignment
12:10 Q&A + next steps`,
  allowPrint: true,
  includeRemote: true,
  created: 'February 5, 2026',
  published: 'February 5, 2026',
  lastUpdated: 'February 5, 2026',
  researchMaterial: [
    {
      title: 'Agentic AI in Workflows',
      items: [
        'Multi-step reasoning and autonomous task completion',
        'Tool use and function calling in enterprise contexts',
        'Human-in-the-loop orchestration patterns'
      ]
    },
    {
      title: 'Multimodal + Real-time Assistants',
      items: [
        'Text, image, audio, video unified models',
        'Real-time streaming and low-latency inference',
        'Context-aware multimodal understanding'
      ]
    },
    {
      title: 'Small/On-device Models + Efficiency',
      items: [
        'Model distillation and quantization advances',
        'Edge deployment and privacy-preserving compute',
        'Energy-efficient architectures'
      ]
    },
    {
      title: 'RAG + Knowledge Systems + Evaluation',
      items: [
        'Retrieval-augmented generation improvements',
        'Knowledge graph integration',
        'Evaluation frameworks and benchmarks'
      ]
    },
    {
      title: 'AI Safety/Governance/Regulation + Compliance',
      items: [
        'EU AI Act and NIST AI RMF alignment',
        'ISO 42001 AI management systems',
        'Red-teaming and safety evaluations'
      ]
    }
  ]
};

export const PORTAL_BOOKS = [
  { id: '1', title: 'Comprehensive Financial Overview for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '2', title: 'Evaluation of Strategic Alliance Performance for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '3', title: 'Cutting-Edge Leadership Strategies for the Year 2023', date: 'Jan 20, 2026', status: 'unpublished' },
  { id: '4', title: 'Revolutionary Business Models for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '5', title: 'Emerging Trends in Technology for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '6', title: 'Initiatives for Sustainable Growth in the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '7', title: 'Building Effective Team Dynamics for the Year 2023', date: 'Jan 20, 2026', status: 'published' }
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
