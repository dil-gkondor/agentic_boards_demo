import React from 'react';
import { Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
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

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatSidePanel({ messages, loading, error, onSend, onStop, dockedWidth, historyItems }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;
  const [activeTab, setActiveTab] = React.useState('chat');

  const chatContent = (
    <AIChatContent>
      <Box sx={{ px: spacing[2].value, pt: spacing[2].value }}>
        <Tabs
          value={activeTab}
          onChange={(_event, next) => setActiveTab(next)}
          aria-label="Chat panel tabs"
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
        <Box sx={{ px: spacing[2].value, py: spacing[3].value }}>
          <Typography variant="labelLg">History</Typography>
          {(!historyItems || historyItems.length === 0) && (
            <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing[1].value }}>
              No history yet.
            </Typography>
          )}
          {historyItems && historyItems.length > 0 && (
            <Stack spacing={spacing[2].value} sx={{ mt: spacing[2].value }}>
              {historyItems.map((item) => (
                <Box key={item.id}>
                  <Typography variant="labelSm">{item.action.replace(/_/g, ' ')}</Typography>
                  <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                    {new Date(item.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  {item.detail && (
                    <Typography variant="textSm" sx={{ mt: spacing['0_5'].value }}>
                      {item.detail}
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>
          )}
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
