import React from 'react';
import { Box, Button, Card, CardContent, Chip, FormControlLabel, Stack, Switch, TextField, Typography, useTheme } from '@mui/material';

export default function AssistantPanel({
  messages,
  input,
  quickPrompts,
  contextOn,
  onContextToggle,
  onInputChange,
  onSend,
  onPromptClick
}) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;

  return (
    <Box sx={{ borderLeft: `1px solid ${tokens.semantic.color.outline.default.value}`, display: 'flex', flexDirection: 'column' }}>
      <Stack sx={{ p: spacing[2].value, borderBottom: `1px solid ${tokens.semantic.color.outline.default.value}` }} spacing={1}>
        <Typography variant="labelLg">Assistant</Typography>
        <FormControlLabel
          control={<Switch checked={contextOn} onChange={(e) => onContextToggle(e.target.checked)} />}
          label="Case context"
        />
      </Stack>
      <Stack sx={{ p: spacing[2].value, flex: 1, overflow: 'auto' }} spacing={2}>
        {messages.map((msg, idx) => {
          if (msg.role === 'steps') {
            return (
              <Card key={idx} sx={{ bgcolor: tokens.semantic.color.surface.variant.value }}>
                <CardContent>
                  <Typography variant="labelLg">Plan / Steps</Typography>
                  <ol>
                    {msg.steps.map((step) => (
                      <li key={step}>
                        <Typography variant="textSm">{step}</Typography>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            );
          }
          return (
            <Card key={idx} sx={{ bgcolor: tokens.semantic.color.surface.variant.value, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <CardContent>
                <Typography variant="textSm">{msg.text}</Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mt: spacing['0_5'].value }}>
                  {msg.role === 'assistant' ? 'Diligent Boards Companion' : msg.role}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
      <Box sx={{ p: spacing[2].value, borderTop: `1px solid ${tokens.semantic.color.outline.default.value}` }}>
        <Stack direction="row" spacing={1} sx={{ mb: spacing[1].value, flexWrap: 'wrap' }}>
          {quickPrompts.map((prompt) => (
            <Chip key={prompt} label={prompt} onClick={() => onPromptClick(prompt)} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="flex-end">
          <TextField
            placeholder="Ask about this board book..."
            multiline
            minRows={1}
            maxRows={4}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            fullWidth
          />
          <Button variant="contained" onClick={onSend}>
            Send
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
