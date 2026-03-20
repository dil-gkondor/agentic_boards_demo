import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export default function PortalView({ onModeChange }) {
  return (
    <Box sx={{ p: 4, bgcolor: '#1f2536', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
        Portal View
      </Typography>
      <Typography sx={{ color: '#8a90a5', mb: 3 }}>
        This is the Portal view. The full design implementation is pending.
      </Typography>
      <Button 
        variant="contained"
        onClick={() => onModeChange && onModeChange('companion')}
      >
        Back to Companion
      </Button>
    </Box>
  );
}
