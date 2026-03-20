import React from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme
} from '@mui/material';
import MainPageLayout from './MainPageLayout.jsx';

const BOOKS = [
  { id: 'book-1', title: 'Comprehensive Financial Overview for the Year 2023', date: 'Jan 20, 2026', status: 'Published' },
  { id: 'book-2', title: 'Evaluation of Strategic Alliance Performance for the Year 2023', date: 'Jan 20, 2026', status: 'Published' },
  { id: 'book-3', title: 'Cutting-Edge Leadership Strategies for the Year 2023', date: 'Jan 20, 2026', status: 'Unpublished' },
  { id: 'book-4', title: 'Revolutionary Business Models for the Year 2023', date: 'Jan 20, 2026', status: 'Published' },
  { id: 'book-5', title: 'Emerging Trends in Technology for the Year 2023', date: 'Jan 20, 2026', status: 'Published' },
  { id: 'book-6', title: 'Initiatives for Sustainable Growth in the Year 2023', date: 'Jan 20, 2026', status: 'Published' },
  { id: 'book-7', title: 'Building Effective Team Dynamics for the Year 2023', date: 'Jan 20, 2026', status: 'Published' }
];

const STATUS_COLOR = {
  Published: 'success',
  Unpublished: 'warning'
};

export default function PortalView({ transitionKey }) {
  const { tokens } = useTheme();
  const spacing = tokens.core.spacing;
  const [tab, setTab] = React.useState('current');
  const [viewMode, setViewMode] = React.useState('list');
  const selectedBook = BOOKS[4];
  const itemAnimation = (index) => ({
    animation: 'fadeBlurIn 360ms ease',
    animationDelay: `${index * 50}ms`,
    animationFillMode: 'both'
  });

  return (
    <MainPageLayout
      px={spacing[6].value}
      py={spacing[4].value}
      sx={{
        minWidth: 0,
        '@keyframes fadeBlurIn': {
          '0%': { opacity: 0, filter: 'blur(6px)', transform: 'translateY(6px)' },
          '100%': { opacity: 1, filter: 'blur(0)', transform: 'translateY(0)' }
        }
      }}
    >
      <Stack spacing={spacing[3].value}>
        <Stack spacing={spacing[1].value}>
          <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
            Boards / Books
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="h3">Books</Typography>
            <Button variant="contained" size="small">Create book</Button>
          </Stack>
          <Tabs value={tab} onChange={(_e, value) => setTab(value)} sx={{ mt: spacing[1].value }}>
            <Tab value="current" label="Current books" />
            <Tab value="archived" label="Archived books" />
          </Tabs>
        </Stack>

        <Divider />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={spacing[3].value} alignItems="flex-end">
          <Stack spacing={1} sx={{ minWidth: 240, flex: 1 }}>
            <Typography variant="labelSm">Search</Typography>
            <TextField placeholder="Search" size="small" />
          </Stack>
          <Stack spacing={1} sx={{ minWidth: 240, flex: 1 }}>
            <Typography variant="labelSm">Sort by</Typography>
            <TextField placeholder="Choose an option" size="small" />
          </Stack>
          <Button variant="text" size="small">Filter</Button>
          <ToggleButtonGroup
            size="small"
            value={viewMode}
            exclusive
            onChange={(_e, value) => value && setViewMode(value)}
            sx={{ ml: 'auto' }}
          >
            <ToggleButton value="list">List</ToggleButton>
            <ToggleButton value="quick">Quick look</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 7fr) minmax(0, 5fr)' }, gap: spacing[3].value }}>
          <Stack spacing={0} sx={{ borderRadius: tokens.semantic.radius.lg.value, overflow: 'hidden' }}>
            {BOOKS.map((book, index) => {
              const selected = book.id === selectedBook.id;
              return (
                <Box
                  key={`${transitionKey}-${book.id}`}
                  sx={{
                    px: spacing[3].value,
                    py: spacing[2].value,
                    bgcolor: selected ? tokens.semantic.color.surface.variant.value : 'transparent',
                    borderBottom: `1px solid ${tokens.semantic.color.ui.divider.value}`,
                    ...itemAnimation(index)
                  }}
                >
                  <Typography variant="labelLg" sx={{ color: tokens.semantic.color.type.inverse.value }}>
                    {book.title}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: spacing['0_5'].value }}>
                    <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                      {book.date}
                    </Typography>
                    <Chip size="small" label={book.status} color={STATUS_COLOR[book.status] || 'default'} />
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <Box
            sx={{
              bgcolor: tokens.semantic.color.surface.variant.value,
              borderRadius: tokens.semantic.radius.xl.value,
              border: `1px solid ${tokens.semantic.color.ui.divider.value}`,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 420
            }}
          >
            <Box sx={{ p: spacing[3].value }}>
              <Chip size="small" label={selectedBook.status} color={STATUS_COLOR[selectedBook.status] || 'default'} />
              <Typography variant="h4" sx={{ mt: spacing[1].value }}>
                {selectedBook.title}
              </Typography>
            </Box>
            <Stack spacing={spacing[2].value} sx={{ px: spacing[3].value, flex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="labelSm">Meeting</Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                  {selectedBook.date}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="labelSm">Committees</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {['Main committee', 'Nomination committee', 'Audit committee', 'Custom access', 'Locked'].map((label) => (
                    <Chip key={label} size="small" label={label} />
                  ))}
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="labelSm">History</Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                  Last updated: September 12, 2023
                </Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                  Published: September 7, 2023
                </Typography>
                <Typography variant="textSm" sx={{ color: tokens.semantic.color.type.muted.value }}>
                  Created: August 31, 2023
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ p: spacing[3].value }}>
              <Button variant="contained" fullWidth>
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </MainPageLayout>
  );
}
