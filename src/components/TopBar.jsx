import React from 'react';
import { Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material';

export default function TopBar({ routeView, currentMode, onModeChange, onGoDashboard }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;

  return (
    <Box
      className="topbar"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'auto 1fr auto', md: '1fr auto 1fr' },
        alignItems: 'center',
        px: { xs: spacing[2].value, md: spacing[3].value },
        py: spacing[2].value,
        borderBottom: `1px solid ${tokens.semantic.color.outline.default.value}`,
        bgcolor: tokens.semantic.color.surface.inverse.value,
        gap: { xs: spacing[1].value, md: spacing[2].value }
      }}
    >
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center" sx={{ minWidth: 0 }}>
        <Button
          variant="text"
          size="small"
          sx={{
            color: tokens.semantic.color.type.inverse.value,
            display: routeView === 'dashboard' ? 'none' : 'inline-flex',
            minWidth: 'auto',
            px: { xs: 0.5, md: 1 }
          }}
          onClick={onGoDashboard}
        >
          {'<-'}
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.5 }}>
            Dashboard
          </Box>
        </Button>
        <Box onClick={onGoDashboard} sx={{ cursor: 'pointer', minWidth: 0 }}>
          <Typography
            variant="labelLg"
            sx={{
              fontWeight: tokens.core.fontWeight.semiBold.value,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <Box component="span" sx={{ color: tokens.semantic.color.type.inverse.value }}>Diligent</Box>{' '}
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {currentMode === 'portal' ? 'Boards Portal' : 'Boards Companion'}
            </Box>
          </Typography>
          <Typography
            variant="textSm"
            sx={{
              color: tokens.semantic.color.type.muted.value,
              display: { xs: 'none', md: 'block' },
              fontSize: { xs: '0.625rem', md: '0.75rem' }
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
            sx={{
              minWidth: { xs: 'auto', md: 'unset' },
              px: { xs: 1, md: 2 },
              fontSize: { xs: '0.6875rem', md: '0.8125rem' }
            }}
          >
            {mode === 'companion' ? 'Companion' : 'Portal'}
          </Button>
        ))}
      </Stack>

      <Stack direction="row" spacing={{ xs: 1, md: 2 }} justifyContent="flex-end" alignItems="center">
        <Chip
          label="Synced"
          size="small"
          sx={{
            bgcolor: tokens.semantic.color.surface.variant.value,
            color: tokens.semantic.color.type.default.value,
            display: { xs: 'none', sm: 'flex' }
          }}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
        >
          Settings
        </Button>
        <Chip label="MA" size="small" sx={{ borderRadius: tokens.semantic.radius.full.value }} />
      </Stack>
    </Box>
  );
}
