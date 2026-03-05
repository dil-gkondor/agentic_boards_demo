import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
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

export default function ChatSidePanel({ messages, loading, error, onSend, onStop, dockedWidth }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;

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
        chatContent={
          <AIChatContent>
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
          </AIChatContent>
        }
        chatBox={
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
        }
      />
    </Box>
  );
}
