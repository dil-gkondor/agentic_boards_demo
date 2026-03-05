import React from 'react';
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
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
import DownloadIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Download.js';
import ShareIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Share.js';
import CalendarIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Calendar.js';
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
  onCardRoute,
  onOpenBook,
  onCreateAiBook,
  onRefuseAiBook,
  onResetChat
}) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;
  const timeLabel = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <Box
      className="dashboard"
      sx={{
        px: { xs: '16px', sm: '20px', md: '24px' },
        py: { xs: '24px', sm: '32px', md: '48px' },
        maxWidth: '1150px',
        mx: 'auto'
      }}
    >
      <Stack spacing={{ xs: '24px', md: '32px' }}>
        <Box className="dashboard-hero">
          <Typography
            variant="h3"
            className="dashboard-headline"
            sx={{
              color: tokens.semantic.color.type.inverse.value,
              fontSize: { xs: '20px', sm: '24px', md: '28px' },
              fontWeight: 600,
              lineHeight: 1.3
            }}
          >
            You're on track, John
          </Typography>
          <Typography
            variant="body1"
            className="dashboard-subline"
            sx={{
              color: tokens.semantic.color.type.muted.value,
              maxWidth: 720,
              mt: '8px',
              fontSize: { xs: '13px', sm: '14px', md: '15px' },
              lineHeight: 1.5
            }}
          >
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

        <Box
          className="dashboard-cards"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(auto-fit, minmax(260px, 1fr))'
            },
            gap: { xs: '12px', md: '16px' }
          }}
        >
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

        <Card
          className="ai-chat-card"
          sx={{
            bgcolor: tokens.semantic.color.surface.variant.value,
            borderRadius: '12px',
            border: `1px solid ${tokens.semantic.color.outline.default.value}`
          }}
        >
          <CardContent sx={{ p: { xs: '12px', md: '20px' } }}>
            <Stack spacing="16px">
              <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>AI chat</Typography>
              <Box
                className="ai-chat-transcript"
                sx={{ maxHeight: { xs: '140px', sm: '210px', md: '320px' }, overflow: 'auto' }}
              >
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
                    if (msg.type === 'foundBook') {
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
                          <Card
                            sx={{
                              bgcolor: '#353b4d',
                              maxWidth: 400,
                              border: '1px solid #00b7fc',
                              borderRadius: '12px'
                            }}
                          >
                            <CardContent sx={{ p: '16px' }}>
                              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Box sx={{ flex: 1 }}>
                                  <Chip
                                    label={msg.book.status === 'published' ? 'Published' : 'Unpublished'}
                                    size="small"
                                    sx={{
                                      bgcolor: msg.book.status === 'published' ? '#d7f6ff' : '#ffedeb',
                                      color: '#282e37',
                                      fontWeight: 600,
                                      mb: '8px'
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      color: 'white',
                                      fontSize: '16px',
                                      fontWeight: 600,
                                      mb: '8px',
                                      lineHeight: 1.4
                                    }}
                                  >
                                    {msg.book.title}
                                  </Typography>
                                  <Stack direction="row" spacing="8px" alignItems="center">
                                    <CalendarIcon style={{ width: 16, height: 16, color: '#8a90a5' }} />
                                    <Typography sx={{ color: '#8a90a5', fontSize: '14px' }}>
                                      {msg.book.date}
                                    </Typography>
                                  </Stack>
                                </Box>
                                <Stack direction="row" spacing="4px" sx={{ ml: '12px' }}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      bgcolor: '#1f2536',
                                      color: 'white',
                                      '&:hover': { bgcolor: '#2a3040' }
                                    }}
                                    title="Download"
                                  >
                                    <DownloadIcon style={{ width: 18, height: 18 }} />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      bgcolor: '#1f2536',
                                      color: 'white',
                                      '&:hover': { bgcolor: '#2a3040' }
                                    }}
                                    title="Share"
                                  >
                                    <ShareIcon style={{ width: 18, height: 18 }} />
                                  </IconButton>
                                </Stack>
                              </Stack>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => onOpenBook(msg.book)}
                                sx={{
                                  mt: '12px',
                                  bgcolor: '#00b7fc',
                                  color: '#00293c',
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  '&:hover': { bgcolor: '#33c5fd' }
                                }}
                              >
                                Open in Portal
                              </Button>
                            </CardContent>
                          </Card>
                        </AIChatAIMessage>
                      );
                    }

                    if (msg.type === 'createBook') {
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
                          <Card sx={{ bgcolor: tokens.semantic.color.surface.default.value, maxWidth: 400 }}>
                            <CardContent>
                              <Typography variant="labelLg" sx={{ mb: spacing[1].value }}>
                                Ready to create: {msg.bookData.title}
                              </Typography>
                              <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mb: spacing[2].value }}>
                                {msg.bookData.startDate} • {msg.bookData.startTime} - {msg.bookData.endTime}
                              </Typography>
                              <Stack spacing={1} sx={{ mb: spacing[2].value }}>
                                {msg.bookData.researchMaterial?.slice(0, 3).map((section, i) => (
                                  <Box key={i}>
                                    <Typography variant="textSm" sx={{ fontWeight: 600 }}>
                                      {section.title}
                                    </Typography>
                                  </Box>
                                ))}
                                {msg.bookData.researchMaterial?.length > 3 && (
                                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                                    +{msg.bookData.researchMaterial.length - 3} more sections
                                  </Typography>
                                )}
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                <Button variant="contained" size="small" onClick={() => onCreateAiBook(msg.bookData)}>
                                  Create Book
                                </Button>
                                <Button variant="outlined" size="small" onClick={onRefuseAiBook}>
                                  No thanks
                                </Button>
                              </Stack>
                            </CardContent>
                          </Card>
                        </AIChatAIMessage>
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
                      <Box
                        sx={{
                          fontSize: '16px',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          background: 'linear-gradient(90deg, #00b7fc, #ff6b9d, #c084fc, #00e676, #fbbf24, #00b7fc)',
                          backgroundSize: '400% auto',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          animation: 'gradient-vibe 2s ease-in-out infinite, pulse-glow 1.5s ease-in-out infinite',
                          '@keyframes gradient-vibe': {
                            '0%': { backgroundPosition: '0% center' },
                            '50%': { backgroundPosition: '200% center' },
                            '100%': { backgroundPosition: '400% center' }
                          },
                          '@keyframes pulse-glow': {
                            '0%, 100%': { 
                              opacity: 1,
                              transform: 'scale(1)',
                              filter: 'brightness(1)'
                            },
                            '50%': { 
                              opacity: 0.9,
                              transform: 'scale(1.02)',
                              filter: 'brightness(1.2)'
                            }
                          },
                          textShadow: '0 0 20px rgba(0, 183, 252, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {loadingMessage}
                      </Box>
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
              <Stack
                className="ai-chat-chips"
                direction="row"
                flexWrap="wrap"
                sx={{ gap: { xs: '6px', md: '8px' } }}
              >
                {dashboardChips.map((chip) => (
                  <Chip
                    key={chip.label}
                    label={chip.label}
                    onClick={() => onSuggestionSelect(chip.prompt)}
                    className="ai-chat-chip"
                    sx={{
                      fontSize: { xs: '11px', md: '13px' },
                      height: { xs: '28px', md: '32px' },
                      px: { xs: '10px', md: '12px' }
                    }}
                  />
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
        <Box
          className="feature-cards"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: '12px', md: '16px' }
          }}
        >
          {FEATURE_CARDS.map((card) => (
            <Card
              key={card.title}
              sx={{
                bgcolor: tokens.semantic.color.surface.variant.value,
                borderRadius: '12px',
                border: `1px solid ${tokens.semantic.color.outline.default.value}`,
                transition: 'background 0.18s ease, border-color 0.18s ease, transform 0.18s ease',
                '&:hover': {
                  borderColor: tokens.semantic.color.outline.hover?.value || tokens.semantic.color.outline.default.value,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: '14px', md: '20px' } }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: '8px' }}>{card.title}</Typography>
                <Typography
                  sx={{
                    color: tokens.semantic.color.type.muted.value,
                    fontSize: { xs: '12px', md: '13px' },
                    lineHeight: 1.5
                  }}
                >
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box
          className="muted-cards"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(auto-fit, minmax(140px, 1fr))'
            },
            gap: { xs: '8px', md: '12px' }
          }}
        >
          {dashboardMutedProducts.map((name) => (
            <Chip
              key={name}
              label={name}
              variant="outlined"
              sx={{ fontSize: { xs: '11px', md: '13px' } }}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
