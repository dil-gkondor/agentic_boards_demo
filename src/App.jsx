import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import DashboardView from './components/DashboardView.jsx';
import CaseView from './components/CaseView.jsx';
import TopBar from './components/TopBar.jsx';
import ContextMenu from './components/ContextMenu.jsx';
import EvidenceDrawer from './components/EvidenceDrawer.jsx';
import CompanionView from './components/CompanionView.jsx';
import PortalView from './components/PortalView.jsx';
import { AIChatContextProvider, useAIChatContext } from '@diligentcorp/atlas-theme-mui/lib/themes/lens/components';
import { STORAGE_CASE, STORAGE_LAYOUT } from './data/storage.js';
import {
  buildDashboardCases,
  DASHBOARD_CHIPS_AFTER_SUMMARY,
  DASHBOARD_CHIPS_INITIAL,
  DASHBOARD_MUTED_PRODUCTS,
  ROTATING_STATUS_MESSAGES,
  ASSISTANT_QUICK_PROMPTS,
  OPEN_BOOK_MESSAGES,
  CREATE_BOOK_MESSAGES,
  AI_TRENDS_BOOK_DATA,
  PORTAL_BOOKS
} from './data/dashboard.js';
import { ROUTE_TO_CASE_ID } from './data/routes.js';
import { seedCases } from './data/cases.js';
import { computeCaseSummary } from './utils/case.js';
import { dueLabel } from './utils/date.js';
import { parseHash, setHash } from './utils/routing.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function mockDashboardReply(text) {
  const lower = text.toLowerCase();
  return new Promise((resolve, reject) => {
    if (lower.includes('fail') || lower.includes('error')) {
      setTimeout(() => reject(new Error('Simulated failure')), 500);
      return;
    }
    setTimeout(() => {
      if (lower.includes('agenda') || lower.includes('sections')) {
        resolve('Board book agenda generated with 8 sections. Connect a real AI endpoint for production use.');
      } else if (lower.includes('onboarding') || lower.includes('checklist')) {
        resolve('Onboarding checklist created with 12 items. Connect a real AI endpoint for production use.');
      } else if (lower.includes('smart build') || lower.includes('compile')) {
        resolve('Smart build complete. 3 items need attention before publishing.');
      } else if (lower.includes('readiness') || lower.includes('final')) {
        resolve('Readiness check passed. Board book is ready for approval.');
      } else {
        resolve('Response ready. Replace with real AI integration for production.');
      }
    }, 2400);
  });
}

export default function App() {
  const { tokens } = useTheme();
  const [route, setRoute] = useState(parseHash());
  const [layout, setLayout] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_LAYOUT);
      if (!raw) return { left: 280, right: 360 };
      const parsed = JSON.parse(raw);
      return {
        left: typeof parsed.left === 'number' ? parsed.left : 280,
        right: typeof parsed.right === 'number' ? parsed.right : 360
      };
    } catch {
      return { left: 280, right: 360 };
    }
  });
  const [cases] = useState(seedCases);
  const [selectedCaseId, setSelectedCaseId] = useState(() => localStorage.getItem(STORAGE_CASE) || null);
  const [caseFilter, setCaseFilter] = useState('all');
  const [caseSort, setCaseSort] = useState('due');
  const [evidenceFilter, setEvidenceFilter] = useState('all');
  const [currentMode, setCurrentMode] = useState('companion');
  const [companionView, setCompanionView] = useState('summary');
  const [contextOn, setContextOn] = useState(true);
  const [dashboardMessages, setDashboardMessages] = useState([]);
  const [dashboardInput, setDashboardInput] = useState('');
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);
  const [dashboardSummaryCompleted, setDashboardSummaryCompleted] = useState(false);
  const [dashboardPopover, setDashboardPopover] = useState(null);
  const [dashboardResponseType, setDashboardResponseType] = useState(null);
  const [dashboardLoadingMessages, setDashboardLoadingMessages] = useState(ROTATING_STATUS_MESSAGES);
  const [pendingBookData, setPendingBookData] = useState(null);
  const [portalPage, setPortalPage] = useState('books');
  const [createBookData, setCreateBookData] = useState(null);
  const [portalSearching, setPortalSearching] = useState(false);
  const dashboardLoadingTimer = useRef(null);
  const [dashboardLoadingIndex, setDashboardLoadingIndex] = useState(0);
  const [assistantMessages, setAssistantMessages] = useState([
    { role: 'system', text: 'Agent ready. Pick a case to begin.' },
    { role: 'steps', steps: ['Identify missing evidence', 'Draft requests', 'Track responses'] }
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ open: false, x: 0, y: 0, caseId: null });

  const dashboardCases = useMemo(() => buildDashboardCases(), []);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_LAYOUT, JSON.stringify(layout));
  }, [layout]);

  useEffect(() => {
    if (selectedCaseId) localStorage.setItem(STORAGE_CASE, selectedCaseId);
  }, [selectedCaseId]);

  useEffect(() => {
    if (!selectedCaseId && cases[0]) setSelectedCaseId(cases[0].id);
  }, [cases, selectedCaseId]);

  useEffect(() => {
    if (route.view === 'case' && route.caseSlug) {
      const mapped = ROUTE_TO_CASE_ID[route.caseSlug];
      if (mapped) setSelectedCaseId(mapped);
    }
  }, [route]);

  const selectedCase = useMemo(() => cases.find((c) => c.id === selectedCaseId) || cases[0], [cases, selectedCaseId]);

  const filteredCases = useMemo(() => {
    let list = cases;
    if (caseFilter !== 'all') {
      list = list.filter((c) => {
        if (caseFilter === 'overdue') return c.tags.includes('Overdue');
        if (caseFilter === 'in-progress') return c.status === 'In progress';
        if (caseFilter === 'awaiting-owner') return c.tags.includes('Awaiting Owner');
        if (caseFilter === 'needs-review') return c.tags.includes('Needs Review');
        if (caseFilter === 'audit-ready') return c.tags.includes('Audit-ready');
        return true;
      });
    }
    const copy = [...list];
    if (caseSort === 'due') copy.sort((a, b) => a.due - b.due);
    if (caseSort === 'risk') {
      const order = { High: 0, Medium: 1, Low: 2 };
      copy.sort((a, b) => (order[a.risk] ?? 9) - (order[b.risk] ?? 9));
    }
    if (caseSort === 'activity') copy.sort((a, b) => b.activityAt - a.activityAt);
    return copy;
  }, [cases, caseFilter, caseSort]);

  function startSplitterDrag(which, event) {
    event.preventDefault();
    const startX = event.clientX;
    const start = { ...layout };
    const onMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      if (which === 'left') {
        setLayout((prev) => ({ ...prev, left: clamp(start.left + dx, 240, 360) }));
      } else {
        setLayout((prev) => ({ ...prev, right: clamp(start.right - dx, 320, 480) }));
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  function sendDashboardMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || dashboardLoading) return;
    const lower = trimmed.toLowerCase();

    if (lower.includes('smart build')) {
      setDashboardPopover({ type: 'deepReview', text: 'Upgrade to Pro to run smart build now.' });
      return;
    }
    if (lower.includes('executive summary')) {
      setDashboardPopover({ type: 'summary', text: 'Upgrade to Pro to generate the executive summary.' });
      return;
    }

    setDashboardError(null);
    setDashboardMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setDashboardInput('');
    setDashboardLoading(true);
    setDashboardLoadingIndex(0);

    const isOpenBook = lower.includes('open') && lower.includes('tech') && lower.includes('book');
    const isAiTrends = lower.includes('ai') && lower.includes('trends') && lower.includes('2026');

    let loadingMsgs = ROTATING_STATUS_MESSAGES;
    let responseType = 'summary';

    if (isOpenBook) {
      loadingMsgs = OPEN_BOOK_MESSAGES;
      responseType = 'foundBook';
    } else if (isAiTrends) {
      loadingMsgs = CREATE_BOOK_MESSAGES;
      responseType = 'createBook';
    }

    setDashboardLoadingMessages(loadingMsgs);
    setDashboardResponseType(responseType);

    if (dashboardLoadingTimer.current) clearInterval(dashboardLoadingTimer.current);
    dashboardLoadingTimer.current = setInterval(() => {
      setDashboardLoadingIndex((prev) => (prev + 1) % loadingMsgs.length);
    }, 1800);

    const delay = isOpenBook ? 10000 : isAiTrends ? 9000 : 2400;

    setTimeout(() => {
      if (dashboardLoadingTimer.current) clearInterval(dashboardLoadingTimer.current);
      setDashboardLoading(false);

      if (isOpenBook) {
        const foundBook = PORTAL_BOOKS.find((b) => b.title.toLowerCase().includes('tech')) || PORTAL_BOOKS[4];
        setDashboardMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            type: 'foundBook',
            book: foundBook,
            text: `Found: ${foundBook.title}`
          }
        ]);
      } else if (isAiTrends) {
        setDashboardMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            type: 'createBook',
            bookData: AI_TRENDS_BOOK_DATA,
            text: `Ready to create: ${AI_TRENDS_BOOK_DATA.title}`
          }
        ]);
      } else {
        mockDashboardReply(trimmed)
          .then((reply) => {
            setDashboardMessages((prev) => [
              ...prev,
              { role: 'assistant', text: reply, type: 'summary', title: 'Q2 Board Book Draft' }
            ]);
            setDashboardSummaryCompleted(true);
          })
          .catch((err) => {
            setDashboardError(err?.message || 'Request failed.');
          });
      }
    }, delay);
  }

  function handleOpenBookInPortal(book) {
    setCurrentMode('portal');
    setPortalPage('books');
    setPortalSearching(true);
    setCreateBookData(book);
  }

  function handleCreateAiTrendsBook(bookData) {
    setPendingBookData(bookData);
    setCurrentMode('portal');
    setPortalPage('create');
    setCreateBookData(bookData);
  }

  function handleRefuseAiTrendsBook() {
    setDashboardMessages((prev) => [
      ...prev,
      { role: 'assistant', type: 'text', text: 'No problem! Let me know if you need anything else.' }
    ]);
  }

  function resetToWelcome() {
    setDashboardMessages([]);
    setDashboardInput('');
    setDashboardError(null);
    setDashboardSummaryCompleted(false);
    setDashboardPopover(null);
    setDashboardResponseType(null);
    setCompanionView('summary');
  }

  function handleSaveNewBook(bookFormData) {
    const newBook = {
      id: `new-${Date.now()}`,
      title: bookFormData.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'unpublished',
      ...bookFormData
    };
    setPendingBookData(null);
    setPortalPage('books');
    setCreateBookData(null);
    return newBook;
  }

  function stopDashboardMessage() {
    if (dashboardLoadingTimer.current) clearInterval(dashboardLoadingTimer.current);
    setDashboardLoading(false);
    setDashboardMessages((prev) => prev.slice(0, -1));
  }

  function pushAssistantMessage(message) {
    setAssistantMessages((prev) => [...prev, message]);
  }

  function handleAssistantSend(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushAssistantMessage({ role: 'user', text: trimmed });
    setAssistantInput('');
    if (!contextOn || !selectedCase) {
      pushAssistantMessage({ role: 'assistant', text: 'Turn on "Case context" to generate case-specific actions.' });
      return;
    }

    const summary = computeCaseSummary(selectedCase);
    const q = trimmed.toLowerCase();
    if (q.includes('progress') || q.includes('status') || q.includes('evidence')) {
      pushAssistantMessage({
        role: 'assistant',
        text: `Progress is ${summary.completion}%. Missing: ${summary.missing.length}. Needs review: ${summary.needsReview.length}. Rejected: ${summary.rejected.length}.`
      });
      pushAssistantMessage({
        role: 'assistant',
        text: `Evidence progress: ${summary.completion}%. ${summary.missing.length} missing - ${summary.needsReview.length} needs review - ${summary.rejected.length} rejected. (${dueLabel(selectedCase.due).text})`
      });
      return;
    }

    if (q.includes('blocker')) {
      if (selectedCase.blockers?.length) {
        pushAssistantMessage({
          role: 'assistant',
          text: `Top blockers:\n${selectedCase.blockers.map((b) => `- ${b.title}`).join('\n')}`
        });
      } else {
        pushAssistantMessage({ role: 'assistant', text: 'No blockers found for this case.' });
      }
      return;
    }

    if (q.includes('chase') || q.includes('nudge')) {
      const owners = new Set(summary.missing.map((e) => e.owner));
      pushAssistantMessage({
        role: 'assistant',
        text: `I can draft a chase message for: ${[...owners].join(', ') || 'no owners'}.`
      });
      return;
    }

    if (q.includes('pack')) {
      pushAssistantMessage({
        role: 'assistant',
        text: 'Plan / Steps:\n1. Verify all required evidence is uploaded\n2. Run redaction check for sensitive items\n3. Generate ZIP\n4. Send to reviewer'
      });
      pushAssistantMessage({
        role: 'assistant',
        text: `Evidence pack readiness - Sensitive flagged: ${summary.sensitiveFlagged.length}; Missing evidence: ${summary.missing.length}; Ready for reviewer: ${summary.missing.length === 0 ? 'Yes' : 'Not yet'}`
      });
      return;
    }

    pushAssistantMessage({
      role: 'assistant',
      text: 'I can help with progress, blockers, chase messages, and evidence packs. Try: "evidence progress", "summarize blockers", "draft chase", "generate pack".'
    });
  }

  const dashboardChips = dashboardSummaryCompleted ? DASHBOARD_CHIPS_AFTER_SUMMARY : DASHBOARD_CHIPS_INITIAL;
  const loadingMessage = dashboardLoadingMessages[dashboardLoadingIndex] || dashboardLoadingMessages[0];

  const portalViewActive = currentMode === 'portal';
  const companionSummaryActive = currentMode === 'companion' && companionView === 'summary';
  const companionChatActive = currentMode === 'companion' && companionView === 'chat';

  function handleModeChange(mode) {
    setCurrentMode(mode);
  }

  function handleLogoClick() {
    if (currentMode === 'companion' && companionView === 'chat') {
      setCompanionView('summary');
    }
    setHash('/');
  }

  function ChatContextSync({ hasMessages, isGenerating }) {
    const { setHasStartedChat, setIsGenerating } = useAIChatContext();
    useEffect(() => {
      setHasStartedChat(hasMessages);
    }, [hasMessages, setHasStartedChat]);
    useEffect(() => {
      setIsGenerating(isGenerating);
    }, [isGenerating, setIsGenerating]);
    return null;
  }

  return (
    <AIChatContextProvider
      initialHasStartedChat={dashboardMessages.length > 0}
      initialIsGenerating={dashboardLoading}
    >
      <ChatContextSync hasMessages={dashboardMessages.length > 0} isGenerating={dashboardLoading} />
      <Box sx={{ minHeight: '100vh', bgcolor: tokens.semantic.color.surface.inverse.value, color: tokens.semantic.color.type.inverse.value }}>
        <TopBar
          routeView={route.view}
          currentMode={currentMode}
          onModeChange={handleModeChange}
          onGoDashboard={handleLogoClick}
        />

        {portalViewActive && (
          <PortalView
            page={portalPage}
            books={PORTAL_BOOKS}
            selectedBook={createBookData}
            pendingBookData={pendingBookData}
            isSearching={portalSearching}
            onPageChange={setPortalPage}
            onSelectBook={(book) => {
              setCreateBookData(book);
              setPortalPage('detail');
            }}
            onCreateBook={() => {
              setCreateBookData(null);
              setPortalPage('create');
            }}
            onSaveBook={handleSaveNewBook}
            onBackToBooks={() => {
              setPortalPage('books');
              setCreateBookData(null);
              setPortalSearching(false);
            }}
          />
        )}

        {companionSummaryActive && route.view === 'dashboard' && (
          <DashboardView
            dashboardCases={dashboardCases}
            dashboardMutedProducts={DASHBOARD_MUTED_PRODUCTS}
            dashboardChips={dashboardChips}
            dashboardMessages={dashboardMessages}
            dashboardLoading={dashboardLoading}
            dashboardError={dashboardError}
            dashboardInput={dashboardInput}
            dashboardPopover={dashboardPopover}
            dashboardSummaryCompleted={dashboardSummaryCompleted}
            loadingMessage={loadingMessage}
            onInputChange={setDashboardInput}
            onSuggestionSelect={setDashboardInput}
            onSend={() => {
              sendDashboardMessage(dashboardInput);
              setCompanionView('chat');
            }}
            onStop={stopDashboardMessage}
            onRetry={() => sendDashboardMessage(dashboardMessages.at(-1)?.text || '')}
            onClosePopover={() => setDashboardPopover(null)}
            onSeeAll={() => setHash('/cases/mastercard-pli')}
            onCardRoute={setHash}
            onOpenBook={handleOpenBookInPortal}
            onCreateAiBook={handleCreateAiTrendsBook}
            onRefuseAiBook={handleRefuseAiTrendsBook}
            onResetChat={resetToWelcome}
          />
        )}

        {companionSummaryActive && route.view === 'case' && (
          <CaseView
            layout={{ left: clamp(layout.left, 240, 360), right: clamp(layout.right, 320, 480) }}
            onStartSplitterDrag={startSplitterDrag}
            filteredCases={filteredCases}
            selectedCase={selectedCase}
            selectedCaseId={selectedCaseId}
            caseFilter={caseFilter}
            evidenceFilter={evidenceFilter}
            onSelectCase={setSelectedCaseId}
            onCaseFilterChange={setCaseFilter}
            onCycleSort={() => {
              const cycle = ['due', 'risk', 'activity'];
              const next = cycle[(cycle.indexOf(caseSort) + 1) % cycle.length];
              setCaseSort(next);
            }}
            onOpenDrawer={() => setDrawerOpen(true)}
            onContextMenu={(e, caseId) => setContextMenu({ open: true, x: e.clientX, y: e.clientY, caseId })}
            onEvidenceFilterChange={setEvidenceFilter}
            onEvidenceAction={(label) => pushAssistantMessage({ role: 'system', text: `Evidence action: ${label}.` })}
            onBlockerAction={(label) => pushAssistantMessage({ role: 'system', text: `Blocker action: ${label}.` })}
            assistantMessages={assistantMessages}
            assistantInput={assistantInput}
            assistantQuickPrompts={ASSISTANT_QUICK_PROMPTS}
            contextOn={contextOn}
            onContextToggle={setContextOn}
            onAssistantInputChange={setAssistantInput}
            onAssistantSend={() => handleAssistantSend(assistantInput)}
            onAssistantPromptClick={handleAssistantSend}
          />
        )}

        {companionChatActive && (
          <CompanionView
            messages={dashboardMessages}
            loading={dashboardLoading}
            error={dashboardError}
            onSend={(prompt) => sendDashboardMessage(prompt)}
            onStop={stopDashboardMessage}
          />
        )}

        <ContextMenu
          open={contextMenu.open}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu({ open: false, x: 0, y: 0, caseId: null })}
          onAction={(action) => {
            setContextMenu({ open: false, x: 0, y: 0, caseId: null });
            pushAssistantMessage({ role: 'system', text: `Case action: ${action} (${contextMenu.caseId}).` });
          }}
        />

        <EvidenceDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          caseTitle={selectedCase?.title}
          evidenceItems={[...(selectedCase?.evidence.required || []), ...(selectedCase?.evidence.optional || []), ...(selectedCase?.evidence.sensitive || [])]}
        />
      </Box>
    </AIChatContextProvider>
  );
}
