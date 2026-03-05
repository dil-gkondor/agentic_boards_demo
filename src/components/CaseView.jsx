import React from 'react';
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { SectionHeader } from '@diligentcorp/atlas-theme-mui/lib/themes/lens/components';
import { dueLabel, fmtWhen, riskLabel } from '../utils/date.js';
import { statusToKind } from '../utils/case.js';
import AssistantPanel from './AssistantPanel.jsx';

const CASE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'overdue', label: 'At risk' },
  { id: 'audit-ready', label: 'On track' }
];

const EVIDENCE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'missing', label: 'Missing' },
  { id: 'needs-review', label: 'Needs Review' },
  { id: 'rejected', label: 'Rejected' }
];

export default function CaseView({
  layout,
  onStartSplitterDrag,
  filteredCases,
  selectedCase,
  selectedCaseId,
  caseFilter,
  evidenceFilter,
  onSelectCase,
  onCaseFilterChange,
  onCycleSort,
  onOpenDrawer,
  onContextMenu,
  onEvidenceFilterChange,
  onEvidenceAction,
  onBlockerAction,
  assistantMessages,
  assistantInput,
  assistantQuickPrompts,
  contextOn,
  onContextToggle,
  onAssistantInputChange,
  onAssistantSend,
  onAssistantPromptClick,
  sidePanel
}) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;
  const gridStyle = {
    gridTemplateColumns: `${layout.left}px ${spacing.px.value} 1fr ${spacing.px.value} ${layout.right}px`
  };

  return (
    <Box sx={{ display: 'grid', ...gridStyle, height: 'calc(100vh - 72px)' }}>
      <Box sx={{ borderRight: `1px solid ${tokens.semantic.color.outline.default.value}` }}>
        <Stack sx={{ p: spacing[2].value, borderBottom: `1px solid ${tokens.semantic.color.outline.default.value}` }} spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="labelLg">Board Books</Typography>
            <Button size="small" variant="text" onClick={onCycleSort}>
              Sort
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            {CASE_FILTERS.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.label}
                variant={caseFilter === chip.id ? 'filled' : 'outlined'}
                onClick={() => onCaseFilterChange(chip.id)}
              />
            ))}
          </Stack>
        </Stack>
        <Stack sx={{ p: spacing[2].value, overflow: 'auto', height: '100%' }} spacing={2}>
          {filteredCases.length === 0 && <Typography variant="textSm">No matching cases</Typography>}
          {filteredCases.map((caseItem) => {
            const dl = dueLabel(caseItem.due);
            const rl = riskLabel(caseItem.risk);
            const pct = Math.round((caseItem.progress.done / caseItem.progress.total) * 100);
            return (
              <Card
                key={caseItem.id}
                sx={{
                  bgcolor: tokens.semantic.color.surface.variant.value,
                  borderRadius: tokens.semantic.radius.lg.value,
                  border: caseItem.id === selectedCaseId ? `1px solid ${tokens.semantic.color.ui.focusRing.value}` : `1px solid transparent`,
                  cursor: 'pointer'
                }}
                onClick={() => onSelectCase(caseItem.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onContextMenu(e, caseItem.id);
                }}
              >
                <CardContent>
                  <Typography variant="labelLg">{caseItem.title}</Typography>
                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing['0_5'].value }}>
                    Control: <Box component="span" sx={{ fontFamily: 'monospace' }}>{caseItem.control}</Box> - Period: {caseItem.period}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: spacing[1].value, flexWrap: 'wrap' }}>
                    <Chip label={rl.text} size="small" />
                    <Chip label={dl.text} size="small" />
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: spacing[1].value }}>
                    <Typography variant="textSm">
                      {caseItem.progress.done}/{caseItem.progress.total} evidences
                    </Typography>
                    <Chip label={`${caseItem.owner.initials} ${caseItem.owner.name}`} size="small" />
                  </Stack>
                  <Box sx={{ height: 6, bgcolor: tokens.semantic.color.surface.default.value, borderRadius: tokens.semantic.radius.full.value, mt: spacing[1].value }}>
                    <Box sx={{ height: '100%', width: `${pct}%`, bgcolor: tokens.semantic.color.action.primary.default?.value || tokens.semantic.color.outline.default.value, borderRadius: tokens.semantic.radius.full.value }} />
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>

      <Box
        sx={{ bgcolor: tokens.semantic.color.surface.inverse.value, cursor: 'col-resize' }}
        onPointerDown={(e) => onStartSplitterDrag('left', e)}
      />

      <Box sx={{ overflow: 'auto' }}>
        {selectedCase && (
          <Stack spacing={spacing[2].value} sx={{ p: spacing[3].value }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Box>
                <Typography variant="h4">{selectedCase.title}</Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing['0_5'].value }}>
                  {selectedCase.subtitle}
                </Typography>
                <Chip label={selectedCase.status} size="small" sx={{ mt: spacing[1].value }} />
              </Box>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label={`Evidence completion: ${Math.round((selectedCase.progress.done / selectedCase.progress.total) * 100)}%`} size="small" />
                  <Chip label={`Blockers: ${selectedCase.blockers.length}`} size="small" />
                  <Chip label={`Time to due: ${dueLabel(selectedCase.due).text}`} size="small" />
                  <Chip label={`Rejection risk: ${selectedCase.risk}`} size="small" />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={onOpenDrawer}>Request materials</Button>
                  <Button variant="contained">Publish</Button>
                </Stack>
              </Stack>
            </Stack>

            <Divider />

            <SectionHeader title="Evidence checklist" headingLevel="h4" />
            <Stack direction="row" spacing={1}>
              {EVIDENCE_FILTERS.map((chip) => (
                <Chip
                  key={chip.id}
                  label={chip.label}
                  variant={evidenceFilter === chip.id ? 'filled' : 'outlined'}
                  onClick={() => onEvidenceFilterChange(chip.id)}
                />
              ))}
            </Stack>
            <Stack spacing={1}>
              {[...selectedCase.evidence.required, ...selectedCase.evidence.optional, ...selectedCase.evidence.sensitive]
                .filter((ev) => {
                  if (evidenceFilter === 'all') return true;
                  if (evidenceFilter === 'missing') return ev.status === 'Missing';
                  if (evidenceFilter === 'needs-review') return ev.status === 'Needs Review';
                  if (evidenceFilter === 'rejected') return ev.status === 'Rejected';
                  return true;
                })
                .map((ev) => (
                  <Card key={ev.id} sx={{ bgcolor: tokens.semantic.color.surface.variant.value }}>
                    <CardContent>
                      <Typography variant="labelLg">{ev.name}</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: spacing['0_5'].value }}>
                        <Chip label={ev.source} size="small" />
                        <Chip label={ev.status} size="small" color={statusToKind(ev.status) === 'danger' ? 'error' : statusToKind(ev.status) === 'warning' ? 'warning' : 'default'} />
                        <Chip label={`Owner: ${ev.owner}`} size="small" />
                        {ev.updatedAt && <Chip label={`Last updated: ${fmtWhen(ev.updatedAt)}`} size="small" />}
                        {ev.hash && <Chip label={ev.hash} size="small" />}
                        {ev.flagged && <Chip label={ev.flagged} size="small" />}
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mt: spacing[1].value }}>
                        <Button size="small" variant="outlined" onClick={() => onEvidenceAction(`View (${ev.id})`)}>
                          View
                        </Button>
                        <Button size="small" variant="outlined" onClick={() => onEvidenceAction(`${ev.status === 'Missing' ? 'Request' : 'Replace'} (${ev.id})`)}>
                          {ev.status === 'Missing' ? 'Request' : 'Replace'}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
            </Stack>

            <SectionHeader title="Blockers" headingLevel="h4" />
            <Stack spacing={1}>
              {(selectedCase.blockers.length ? selectedCase.blockers : [{ id: 'none', title: "No blockers. You're close to audit-ready.", actions: [] }]).map((blocker) => (
                <Card key={blocker.id} sx={{ bgcolor: tokens.semantic.color.surface.variant.value }}>
                  <CardContent>
                    <Typography variant="labelLg">{blocker.title}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: spacing['0_5'].value }}>
                      {blocker.actions.map((action) => (
                        <Button
                          key={action}
                          size="small"
                          variant="outlined"
                          onClick={() => onBlockerAction(action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <SectionHeader title="Timeline" headingLevel="h4" />
            <Stack spacing={1}>
              {selectedCase.timeline.map((event, idx) => (
                <Card key={idx} sx={{ bgcolor: tokens.semantic.color.surface.variant.value }}>
                  <CardContent>
                    <Typography variant="textSm">{event.text}</Typography>
                    <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                      {fmtWhen(event.when)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        )}
      </Box>

      <Box
        sx={{ bgcolor: tokens.semantic.color.surface.inverse.value, cursor: 'col-resize' }}
        onPointerDown={(e) => onStartSplitterDrag('right', e)}
      />

      {sidePanel || (
        <AssistantPanel
          messages={assistantMessages}
          input={assistantInput}
          quickPrompts={assistantQuickPrompts}
          contextOn={contextOn}
          onContextToggle={onContextToggle}
          onInputChange={onAssistantInputChange}
          onSend={onAssistantSend}
          onPromptClick={onAssistantPromptClick}
        />
      )}
    </Box>
  );
}
