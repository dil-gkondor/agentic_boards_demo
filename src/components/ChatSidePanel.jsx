import React from 'react';
import { Box, Button, Chip, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import {
  AIChatAIMessage,
  AIChatBox,
  AIChatContent,
  AIChatMessageAvatar,
  AIChatMessageHeader,
  AIChatMessageTextBlock,
  AIChatPanel,
  AIChatThinkingIndicator,
  AIChatUserMessage
} from '@diligentcorp/atlas-theme-mui/lib/themes/lens/components';
import AssurancePlansIcon from '@diligentcorp/atlas-react-icons/dist/esm/AssurancePlans.js';
import CheckedIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Checked.js';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatSidePanel({ messages, loading, error, onSend, onStop, dockedWidth, historyItems }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;
  const [activeTab, setActiveTab] = React.useState('chat');
  const historyList = [
    { id: 'history-1', title: 'Updated agenda sections', status: 'pending', actions: ['revert', 'inspect', 'approve'] },
    { id: 'history-2', title: 'Published board book v3', status: 'approved', actions: ['revert', 'inspect'] },
    { id: 'history-3', title: 'Added compliance checklist', status: 'pending', actions: ['revert', 'inspect', 'approve'] },
    { id: 'history-4', title: 'Finalized executive summary', status: 'approved', actions: ['revert', 'inspect'] }
  ];

  const chatContent = (
    <AIChatContent>
      <Box sx={{ pt: spacing[2].value }}>
        <Tabs
          value={activeTab}
          onChange={(_event, next) => setActiveTab(next)}
          aria-label="Chat panel tabs"
          sx={{ pl: 0 }}
        >
          <Tab label="Chat" value="chat" />
          <Tab label="History" value="history" />
        </Tabs>
      </Box>
      {activeTab === 'chat' && (
        <>
          {messages.map((msg, index) => {
            const time = formatTime(new Date());
            if (msg.role === 'user') {
              return (
                <AIChatUserMessage
                  key={`user-${index}`}
                  alignment="end"
                  header={
                    <AIChatMessageHeader
                      name="You"
                      time={time}
                      avatar={<AIChatMessageAvatar uniqueId="user" initials="YO" />}
                    />
                  }
                  message={msg.text}
                />
              );
            }
            return (
              <AIChatAIMessage
                key={`assistant-${index}`}
                header={
                  <AIChatMessageHeader
                    name="Diligent Boards Companion"
                    time={time}
                    avatar={<AIChatMessageAvatar uniqueId="assistant" initials="AI" />}
                  >
                    {loading && index === messages.length - 1 ? (
                      <AIChatThinkingIndicator label="Thinking" />
                    ) : null}
                  </AIChatMessageHeader>
                }
              >
                <AIChatMessageTextBlock>{msg.text}</AIChatMessageTextBlock>
              </AIChatAIMessage>
            );
          })}
          {loading && messages.length === 0 && (
            <AIChatAIMessage
              header={
                <AIChatMessageHeader
                  name="Diligent Boards Companion"
                  time={formatTime(new Date())}
                  avatar={<AIChatMessageAvatar uniqueId="assistant" initials="AI" />}
                >
                  <AIChatThinkingIndicator label="Thinking" />
                </AIChatMessageHeader>
              }
            >
              <AIChatMessageTextBlock>Processing your request...</AIChatMessageTextBlock>
            </AIChatAIMessage>
          )}
          {error && (
            <Stack sx={{ mt: spacing[2].value }}>
              <Typography variant="textSm" sx={{ color: tokens.semantic.color.status.error.text.value }}>
                {error}
              </Typography>
            </Stack>
          )}
        </>
      )}
      {activeTab === 'history' && (
        <Box sx={{ py: spacing[3].value }}>
          <Box
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 18,
                top: 0,
                bottom: 0,
                width: 1,
                bgcolor: tokens.semantic.color.ui.divider.value
              }
            }}
          >
            <Stack spacing={spacing[3].value}>
              {historyList.map((item) => {
                const approved = item.status === 'approved';
                return (
                  <Stack key={item.id} spacing={spacing['0_5'].value}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '36px 1fr',
                        columnGap: spacing[2].value,
                        alignItems: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          border: `1px solid ${tokens.semantic.color.ui.divider.value}`,
                          bgcolor: tokens.semantic.color.surface.variant.value,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <AssurancePlansIcon />
                      </Box>
                      <Stack direction="row" spacing={spacing[1].value} alignItems="center" flexWrap="wrap">
                        <Typography variant="labelLg">{item.title}</Typography>
                        {approved && (
                          <Chip
                            size="small"
                            icon={<CheckedIcon size="md" />}
                            label=""
                            sx={{
                              bgcolor: tokens.semantic.color.status.success.background.value,
                              gap: 0,
                              pr: 0
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                    <Stack
                      direction="row"
                      spacing={spacing[1].value}
                      sx={{ pl: `calc(36px + ${spacing[2].value})` }}
                      flexWrap="wrap"
                    >
                      <Button size="small" variant="outlined">
                        Revert
                      </Button>
                      <Button size="small" variant="outlined">
                        Inspect
                      </Button>
                      {!approved && (
                        <Button size="small" variant="outlined">
                          Approve
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Box>
      )}
    </AIChatContent>
  );

  const chatBox = activeTab === 'chat' ? (
    <AIChatBox
      onSubmit={(prompt) => onSend(prompt)}
      onStop={onStop}
      slotProps={{
        textField: {
          label: 'Chat with AI',
          placeholder: 'Ask me anything...'
        },
        submitButton: {
          submitButtonAriaLabel: 'Send message',
          stopButtonAriaLabel: 'Stop generation'
        }
      }}
    />
  ) : (
    <></>
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: `calc(100vh - ${spacing[9].value})`,
        boxSizing: 'border-box',
        '& .AtlasChatPanel': {
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        },
        '& .AtlasChatPanel-docked': {
          width: dockedWidth || '100%',
          maxWidth: dockedWidth || '100%'
        },
        '& .AtlasChatPanel-minimized': {
          width: '400px'
        }
      }}
    >
      <AIChatPanel
        title="AI Companion"
        subtitle="Ready to help"
        assistant={{
          name: 'Diligent Boards Companion',
          imageUrl: '',
          altText: 'AI Assistant'
        }}
        chatContent={chatContent}
        chatBox={chatBox}
      />
    </Box>
  );
}
