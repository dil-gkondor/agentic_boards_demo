import React from 'react';
import { Box } from '@mui/material';

export default function MainPageLayout({ children, px, py, sx }) {
  return (
    <Box
      sx={{
        px,
        py,
        width: '100%',
        maxWidth: 1280,
        mx: 'auto',
        boxSizing: 'border-box',
        ...sx
      }}
    >
      {children}
    </Box>
  );
}
