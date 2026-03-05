import React from 'react';
import { Box, Button, Card, CardContent, Chip, Stack, TextField, Typography, useTheme } from '@mui/material';
import {
  AIChatAIMessage,
  AIChatContent,
  AIChatMessageAvatar,
  AIChatMessageHeader,
  AIChatMessageTextBlock,
  AIChatThinkingIndicator,
  AIChatUserMessage
} from '@diligentcorp/atlas-theme-mui/lib/themes/lens/components';
import SendIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Send.js';
import { SectionHeader } from '@diligentcorp/atlas-theme-mui/lib/themes/lens/components';
import { dueLabel } from '../utils/date.js';
import { FEATURE_CARDS } from '../data/dashboard.js';

export default function DashboardView({
  dashboardCases,
  dashboardMutedProducts,
  dashboardChips,
  dashboardMessages,
  dashboardLoading,
  dashboardError,
  dashboardInput,
  dashboardPopover,
  dashboardSummaryCompleted,
  loadingMessage,
  onInputChange,
  onSuggestionSelect,
  onSend,
  onStop,
  onRetry,
  onClosePopover,
  onSeeAll,
  onCardRoute
}) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;
  const timeLabel = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <Box sx={{ px: spacing[6].value, py: spacing[6].value }}>
      <Stack spacing={spacing[4].value}>
        <Box>
          <Typography variant="h3" sx={{ color: tokens.semantic.color.type.inverse.value }}>
            You're on track, Brian
          </Typography>
          <Typography variant="textMd" sx={{ color: tokens.semantic.color.type.muted.value, maxWidth: 720, mt: spacing[1].value }}>
            Get your board books ready faster: the assistant pulls recurring items, flags conflicts, requests missing
            materials from owners, and compiles publish-ready packs.
          </Typography>
        </Box>

        <SectionHeader
          title="Tasks need your attention"
          headingLevel="h3"
          buttonArray={
            <Button variant="text" onClick={onSeeAll}>
              See all
            </Button>
          }
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: spacing[2].value }}>
          {dashboardCases.map((item, index) => {
            const completion = index === 0 && dashboardSummaryCompleted ? 80 : item.completion;
            const dl = dueLabel(item.dueDate);
            const pillKind = item.statusPill === 'At risk' ? 'error' : 'success';
            return (
              <Card
                key={item.id}
                sx={{
                  bgcolor: tokens.semantic.color.surface.variant.value,
                  borderRadius: tokens.semantic.radius.lg.value,
                  cursor: item.route ? 'pointer' : 'default'
                }}
                onClick={() => item.route && onCardRoute(item.route)}
              >
                <CardContent>
                  <Typography variant="labelLg" sx={{ fontWeight: tokens.core.fontWeight.semiBold.value }}>
                    {item.title}
                  </Typography>
                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing['0_5'].value }}>
                    {completion}% complete
                  </Typography>
                  <Box sx={{ height: 6, bgcolor: tokens.semantic.color.surface.default.value, borderRadius: tokens.semantic.radius.full.value, mt: spacing[1].value }}>
                    <Box sx={{ height: '100%', width: `${completion}%`, bgcolor: tokens.semantic.color.action.primary.default?.value || tokens.semantic.color.outline.default.value, borderRadius: tokens.semantic.radius.full.value }} />
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: spacing[1].value }}>
                    <Chip label={dl.text} size="small" color={dl.kind === 'danger' ? 'error' : dl.kind === 'warning' ? 'warning' : 'default'} />
                    {item.statusPill && <Chip label={item.statusPill} size="small" color={pillKind} />}
                    {item.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing[1].value }}>
                    ({item.description})
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Card sx={{ bgcolor: tokens.semantic.color.surface.variant.value, borderRadius: tokens.semantic.radius.lg.value }}>
          <CardContent>
            <Stack spacing={spacing[2].value}>
              <Typography variant="labelLg">AI chat</Typography>
              <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
                {dashboardMessages.length === 0 && !dashboardLoading && (
                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                    Ask me to help with board books, meeting prep, or member onboarding.
                  </Typography>
                )}
                <AIChatContent>
                  {dashboardMessages.map((msg, idx) => {
                    if (msg.role === 'user') {
                      return (
                        <AIChatUserMessage
                          key={`user-${idx}`}
                          alignment="end"
                          header={
                            <AIChatMessageHeader
                              name="You"
                              time={timeLabel}
                              avatar={<AIChatMessageAvatar uniqueId="user" initials="YO" />}
                            />
                          }
                          message={msg.text}
                        />
                      );
                    }
                    return (
                      <AIChatAIMessage
                        key={`assistant-${idx}`}
                        header={
                          <AIChatMessageHeader
                            name="Diligent Boards Companion"
                            time={timeLabel}
                            avatar={<AIChatMessageAvatar uniqueId="assistant" initials="AI" />}
                          />
                        }
                      >
                        {msg.type === 'summary' && (
                          <Box sx={{ mb: spacing[1].value }}>
                            <Typography variant="labelSm">{msg.title}</Typography>
                          </Box>
                        )}
                        <AIChatMessageTextBlock>{msg.text}</AIChatMessageTextBlock>
                      </AIChatAIMessage>
                    );
                  })}
                  {dashboardLoading && (
                    <AIChatAIMessage
                      header={
                        <AIChatMessageHeader
                          name="Diligent Boards Companion"
                          time={timeLabel}
                          avatar={<AIChatMessageAvatar uniqueId="assistant" initials="AI" />}
                        >
                          <AIChatThinkingIndicator label="Thinking" />
                        </AIChatMessageHeader>
                      }
                    >
                      <AIChatMessageTextBlock>{loadingMessage}</AIChatMessageTextBlock>
                    </AIChatAIMessage>
                  )}
                </AIChatContent>
              </Box>
              {dashboardError && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.status.error.text.value }}>
                    {dashboardError}
                  </Typography>
                  <Button size="small" variant="text" onClick={onRetry}>
                    Retry
                  </Button>
                </Stack>
              )}
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <TextField
                  placeholder="Help me prepare the board book for next week's meeting..."
                  multiline
                  minRows={1}
                  maxRows={4}
                  value={dashboardInput}
                  onChange={(e) => onInputChange(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={() => (dashboardLoading ? onStop() : onSend())}
                  disabled={!dashboardInput.trim() && !dashboardLoading}
                  endIcon={<SendIcon />}
                >
                  {dashboardLoading ? 'Stop' : 'Send'}
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {dashboardChips.map((chip) => (
                  <Chip key={chip.label} label={chip.label} onClick={() => onSuggestionSelect(chip.prompt)} />
                ))}
              </Stack>
              {dashboardPopover && (
                <Card sx={{ bgcolor: tokens.semantic.color.surface.default.value }}>
                  <CardContent>
                    <Typography variant="textSm">{dashboardPopover.text}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: spacing[1].value }}>
                      <Button variant="contained" size="small" onClick={onClosePopover}>
                        Upgrade
                      </Button>
                      <Button variant="outlined" size="small" onClick={onClosePopover}>
                        Close
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </CardContent>
        </Card>

        <SectionHeader title="What I can help you with" headingLevel="h3" />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: spacing[2].value }}>
          {FEATURE_CARDS.map((card) => (
            <Card key={card.title} sx={{ bgcolor: tokens.semantic.color.surface.variant.value, borderRadius: tokens.semantic.radius.lg.value }}>
              <CardContent>
                <Typography variant="labelLg">{card.title}</Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing['0_5'].value }}>
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: spacing[1].value }}>
          {dashboardMutedProducts.map((name) => (
            <Chip key={name} label={name} variant="outlined" />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
