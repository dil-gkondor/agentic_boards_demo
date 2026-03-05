import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  AIChatAIMessage,
  AIChatBox,
  AIChatContent,
  AIChatMessageAvatar,
  AIChatMessageHeader,
  AIChatMessageTextBlock,
  AIChatThinkingIndicator,
  AIChatUI,
  AIChatUserMessage
} from '@diligentcorp/atlas-theme-mui/lib/themes/lens/components';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function CompanionView({
  messages,
  loading,
  error,
  onSend,
  onStop,
  title = 'AI Companion',
  subtitle = 'Ready to help'
}) {
  const { tokens } = useTheme();

  return (
    <Box
      sx={{
        px: tokens.core.spacing[4].value,
        py: tokens.core.spacing[4].value,
        height: 'calc(100vh - 72px)',
        boxSizing: 'border-box',
        bgcolor: tokens.semantic.color.surface.variant.value
      }}
    >
      <AIChatUI
        title={title}
        subtitle={subtitle}
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
              <Stack sx={{ mt: tokens.core.spacing[2].value }}>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.status.error.text.value }}>
                  {error}
                </Typography>
              </Stack>
            )}
          </AIChatContent>
        }
        chatBox={
          <AIChatBox
            onSubmit={(prompt) => {
              onSend(prompt);
            }}
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
