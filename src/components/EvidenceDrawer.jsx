import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography, useTheme } from '@mui/material';

export default function EvidenceDrawer({ open, onClose, caseTitle, evidenceItems }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Evidence Pack
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{ position: 'absolute', right: spacing[1].value, top: spacing[1].value }}
        >
          x
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value, mb: spacing[1].value }}>
          {caseTitle}
        </Typography>
        <Stack spacing={1}>
          {evidenceItems.map((ev) => (
            <Stack key={ev.id} direction="row" justifyContent="space-between">
              <Typography variant="textSm">{ev.name}</Typography>
              <Typography variant="textSm">{ev.status}</Typography>
              <Typography variant="textSm">{ev.owner}</Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained">Submit evidence</Button>
      </DialogActions>
    </Dialog>
  );
}
