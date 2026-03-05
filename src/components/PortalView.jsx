import React from 'react';
import { Box, TextField, useTheme } from '@mui/material';

export default function PortalView() {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;

  return (
    <Box sx={{ px: spacing[6].value, py: spacing[6].value }}>
      <TextField
        value="Portal view"
        multiline
        minRows={8}
        fullWidth
        slotProps={{ input: { readOnly: true } }}
      />
    </Box>
  );
}
