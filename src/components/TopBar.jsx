import React from 'react';
import { Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material';

export default function TopBar({ routeView, currentMode, onModeChange, onGoDashboard }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        px: spacing[6].value,
        py: spacing[2].value,
        borderBottom: `1px solid ${tokens.semantic.color.outline.default.value}`,
        bgcolor: tokens.semantic.color.surface.inverse.value
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="text"
          size="small"
          sx={{ color: tokens.semantic.color.type.inverse.value, display: routeView === 'dashboard' ? 'none' : 'inline-flex' }}
          onClick={onGoDashboard}
        >
          {'<- Dashboard'}
        </Button>
        <Box onClick={onGoDashboard} sx={{ cursor: 'pointer' }}>
          <Typography variant="labelLg" sx={{ fontWeight: tokens.core.fontWeight.semiBold.value }}>
            <Box component="span" sx={{ color: tokens.semantic.color.type.inverse.value }}>Diligent</Box> {currentMode === 'portal' ? 'Boards Portal' : 'Boards Companion'}
          </Typography>
          <Typography
            variant="textSm"
            sx={{
              color: tokens.semantic.color.type.muted.value,
              pl: spacing[2].value
            }}
          >
            {routeView === 'dashboard' ? 'Dashboard' : 'Mastercard / PCI Program'}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="center">
        {['companion', 'portal'].map((mode) => (
          <Button
            key={mode}
            variant={currentMode === mode ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onModeChange(mode)}
          >
            {mode === 'companion' ? 'Companion' : 'Portal'}
          </Button>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
        <Chip
          label="Synced"
          size="small"
          sx={{
            bgcolor: tokens.semantic.color.surface.variant.value,
            color: tokens.semantic.color.type.default.value
          }}
        />
        <Button variant="outlined" size="small">Settings</Button>
        <Chip label="MA" size="small" sx={{ borderRadius: tokens.semantic.radius.full.value }} />
      </Stack>
    </Box>
  );
}
