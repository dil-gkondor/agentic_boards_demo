import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import ArrowLeftIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/ArrowLeft.js';
import SearchIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Search.js';
import AddIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Add.js';
import CalendarIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Calendar.js';
import DownloadIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Download.js';
import ShareIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/Share.js';
import CaretRightIcon from '@diligentcorp/atlas-react-icons/dist/esm/lens/CaretRight.js';

const LOADING_MESSAGES = [
  'Opening latest Tech Book…',
  'Loading the latest version…',
  'Getting the newest Tech Book…',
  'Syncing and opening…',
  'Preparing your book…'
];

const NAV_ITEMS = [
  { id: 'books', label: 'Books', active: true },
  { id: 'resource', label: 'Resource Center' },
  { id: 'smart', label: 'Smart Builder' },
  { id: 'decision', label: 'Decision Hub' },
  { id: 'questionnaires', label: 'Questionnaires' }
];

const NAV_ITEMS_SECONDARY = [
  { id: 'account', label: 'Boards account' },
  { id: 'management', label: 'Application management', hasSubmenu: true }
];

const BOOKS_DATA = [
  { id: '1', title: 'Comprehensive Financial Overview for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '2', title: 'Evaluation of Strategic Alliance Performance for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '3', title: 'Cutting-Edge Leadership Strategies for the Year 2023', date: 'Jan 20, 2026', status: 'unpublished' },
  { id: '4', title: 'Revolutionary Business Models for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '5', title: 'Emerging Trends in Technology for the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '6', title: 'Initiatives for Sustainable Growth in the Year 2023', date: 'Jan 20, 2026', status: 'published' },
  { id: '7', title: 'Building Effective Team Dynamics for the Year 2023', date: 'Jan 20, 2026', status: 'published' }
];

const STEPPER_STEPS = [
  { number: 1, label: 'Properties', active: true },
  { number: 2, label: 'Committee access', active: false },
  { number: 3, label: 'User access', active: false }
];

function FormField({ label, required, placeholder, value, onChange, multiline, rows, endAdornment }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
        <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, letterSpacing: '0.3px' }}>
          {label}
        </Typography>
        {required && (
          <Typography sx={{ color: '#8a90a5', fontSize: '12px' }}>(required)</Typography>
        )}
      </Stack>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        slotProps={{
          input: {
            endAdornment: endAdornment
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#1f2536',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            '& fieldset': { borderColor: '#71768b' },
            '&:hover fieldset': { borderColor: '#8a90a5' },
            '&.Mui-focused fieldset': { borderColor: '#00b7fc' }
          },
          '& .MuiInputBase-input': {
            color: 'white'
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#8a90a5',
            opacity: 1
          }
        }}
      />
    </Box>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <Stack direction="row" spacing="12px" alignItems="center">
      <Switch
        checked={checked}
        onChange={onChange}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#00b7fc'
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            bgcolor: '#00b7fc'
          },
          '& .MuiSwitch-track': {
            bgcolor: '#4c5265'
          }
        }}
      />
      <Typography sx={{ color: 'white', fontSize: '14px' }}>{label}</Typography>
    </Stack>
  );
}

function CreateBookForm({ pendingBookData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: pendingBookData?.title || 'Emerging AI Trends in 2026',
    startDate: pendingBookData?.startDate || '2026-03-15',
    endDate: pendingBookData?.endDate || '2026-03-15',
    allowPrint: pendingBookData?.allowPrint ?? true,
    includeRemote: pendingBookData?.includeRemote ?? true,
    meetingLink: pendingBookData?.meetingLink || 'https://zoom.us/j/1234567890?pwd=AiTrends2026',
    remoteDetails: pendingBookData?.remoteDetails || `Agenda (10:00–12:30):

10:00 Welcome + objectives
10:10 Foundation models: efficiency, scaling, distillation
10:35 Multimodal (text+image+audio+video) & real-time
11:00 Agentic workflows + tool use in enterprise
11:25 On-device/edge AI + privacy-preserving compute
11:45 Governance: safety, evals, EU/NIST/ISO alignment
12:10 Q&A + next steps`
  });

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ display: 'flex', gap: '48px', pt: '32px', px: '48px' }}>
      <Box sx={{ width: '224px', flexShrink: 0 }}>
        <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 600, mb: '16px', pb: '16px' }}>
          Create book
        </Typography>

        {STEPPER_STEPS.map((step, idx) => (
          <React.Fragment key={step.number}>
            <Stack direction="row" spacing="12px" alignItems="center" sx={{ height: '32px', mb: idx < STEPPER_STEPS.length - 1 ? '0' : '0' }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: step.active ? '#121a26' : '#353b4d',
                  border: step.active ? 'none' : '1px solid #4c5265',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.active ? 'white' : '#8a90a5',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {step.number}
              </Box>
              <Typography
                sx={{
                  color: step.active ? 'white' : '#8a90a5',
                  fontSize: '14px',
                  fontWeight: step.active ? 600 : 400
                }}
              >
                {step.label}
              </Typography>
            </Stack>
            {idx < STEPPER_STEPS.length - 1 && (
              <Box sx={{ pl: '16px', py: '8px' }}>
                <Box sx={{ width: '1px', height: '24px', bgcolor: '#4c5265' }} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>

      <Divider orientation="vertical" flexItem sx={{ bgcolor: '#4c5265' }} />

      <Box sx={{ flex: 1, maxWidth: '672px' }}>
        <Typography sx={{ color: 'white', fontSize: '26px', fontWeight: 600, mb: '4px' }}>
          Properties
        </Typography>
        <Typography sx={{ color: '#8a90a5', fontSize: '16px', mb: '40px' }}>
          Add book properties, including meeting dates and other important details.
        </Typography>

        <Stack spacing={3}>
          <FormField
            label="Book title"
            required
            placeholder="Enter book title"
            value={formData.title}
            onChange={handleChange('title')}
          />

          <Stack direction="row" spacing={2}>
            <FormField
              label="Meeting start date"
              required
              placeholder="mm/dd/yyyy"
              value={formData.startDate}
              onChange={handleChange('startDate')}
              endAdornment={
                <IconButton size="small" sx={{ color: '#8a90a5' }}>
                  <CalendarIcon style={{ width: 20, height: 20 }} />
                </IconButton>
              }
            />
            <FormField
              label="Meeting end date"
              required
              placeholder="mm/dd/yyyy"
              value={formData.endDate}
              onChange={handleChange('endDate')}
              endAdornment={
                <IconButton size="small" sx={{ color: '#8a90a5' }}>
                  <CalendarIcon style={{ width: 20, height: 20 }} />
                </IconButton>
              }
            />
          </Stack>

          <Stack spacing={1.5}>
            <ToggleField
              label="Allow book to be printed or exported"
              checked={formData.allowPrint}
              onChange={(e) => setFormData((prev) => ({ ...prev, allowPrint: e.target.checked }))}
            />
            <ToggleField
              label="Include remote conference details"
              checked={formData.includeRemote}
              onChange={(e) => setFormData((prev) => ({ ...prev, includeRemote: e.target.checked }))}
            />
          </Stack>

          <FormField
            label="Meeting link"
            placeholder="Enter the meeting link here"
            value={formData.meetingLink}
            onChange={handleChange('meetingLink')}
          />

          <Box>
            <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, letterSpacing: '0.3px', mb: 1 }}>
              Remote conference details
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Enter the remote conference details"
              value={formData.remoteDetails || ''}
              onChange={handleChange('remoteDetails')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#1f2536',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  '& fieldset': { borderColor: '#71768b' },
                  '&:hover fieldset': { borderColor: '#8a90a5' },
                  '&.Mui-focused fieldset': { borderColor: '#00b7fc' }
                },
                '& .MuiInputBase-input': {
                  color: 'white'
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#8a90a5',
                  opacity: 1
                }
              }}
            />
            <Typography sx={{ color: '#8a90a5', fontSize: '12px', textAlign: 'right', mt: 0.5 }}>
              {(formData.remoteDetails || '').length}/500
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ pt: 3 }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{
                color: 'white',
                borderColor: '#71768b',
                textTransform: 'none',
                fontWeight: 600,
                px: '24px',
                '&:hover': { borderColor: '#8a90a5', bgcolor: 'transparent' }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => onSave && onSave(formData)}
              sx={{
                bgcolor: '#00b7fc',
                color: '#00293c',
                textTransform: 'none',
                fontWeight: 600,
                px: '24px',
                '&:hover': { bgcolor: '#33c5fd' }
              }}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

function BooksListView({
  books,
  selectedBookId,
  onBookClick,
  onCreateBook,
  isLoading,
  loadingMessageIndex,
  foundBook
}) {
  const [activeTab, setActiveTab] = useState(0);
  const currentBook = books.find((b) => b.id === selectedBookId) || books[4];

  return (
    <>
      <Stack direction="row" spacing="8px" alignItems="center" sx={{ mb: '8px' }}>
        <Typography sx={{ color: '#8a90a5', fontSize: '14px' }}>Boards</Typography>
        <CaretRightIcon style={{ width: 16, height: 16, color: '#8a90a5' }} />
        <Typography sx={{ color: 'white', fontSize: '14px' }}>Books</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: '16px' }}>
        <Typography sx={{ color: 'white', fontSize: '30px', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Books
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon style={{ width: 20, height: 20 }} />}
          sx={{
            bgcolor: '#00b7fc',
            color: '#00293c',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            '&:hover': { bgcolor: '#33c5fd' }
          }}
          onClick={onCreateBook}
        >
          Create book
        </Button>
      </Stack>

      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        sx={{
          mb: '16px',
          '& .MuiTab-root': { color: '#8a90a5', textTransform: 'none', fontSize: '14px' },
          '& .Mui-selected': { color: 'white' },
          '& .MuiTabs-indicator': { bgcolor: 'white' }
        }}
      >
        <Tab label="Current books" />
        <Tab label="Archived books" />
      </Tabs>

      <Stack direction="row" spacing="24px" sx={{ mb: '16px' }}>
        <Box sx={{ flex: 1, maxWidth: '300px' }}>
          <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, mb: '8px' }}>Search</Typography>
          <TextField
            placeholder="Search"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon style={{ width: 20, height: 20, color: '#8a90a5', marginRight: 8 }} />
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#1f2536',
                borderRadius: '8px',
                color: 'white',
                '& fieldset': { borderColor: '#71768b' }
              }
            }}
          />
        </Box>
        <Box sx={{ flex: 1, maxWidth: '300px' }}>
          <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, mb: '8px' }}>Sort by</Typography>
          <TextField
            placeholder="Choose an option"
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#1f2536',
                borderRadius: '8px',
                color: 'white',
                '& fieldset': { borderColor: '#71768b' }
              }
            }}
          />
        </Box>
        <Button sx={{ color: 'white', textTransform: 'none', alignSelf: 'flex-end' }}>
          🔽 Filter
        </Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: '24px' }}>
        <Box>
          {isLoading && (
            <Card sx={{ bgcolor: '#353b4d', borderRadius: '12px', mb: '16px', overflow: 'hidden' }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #00b7fc, #ff6b9d, #c084fc, #00e676, #fbbf24, #00b7fc)',
                    backgroundSize: '400% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradient-vibe 2s ease-in-out infinite',
                    '@keyframes gradient-vibe': {
                      '0%': { backgroundPosition: '0% center' },
                      '50%': { backgroundPosition: '200% center' },
                      '100%': { backgroundPosition: '400% center' }
                    }
                  }}
                >
                  {LOADING_MESSAGES[loadingMessageIndex]}
                </Typography>
              </CardContent>
            </Card>
          )}

          {foundBook && !isLoading && (
            <Card sx={{ bgcolor: '#353b4d', borderRadius: '12px', mb: '16px', border: '1px solid #00b7fc' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Chip
                      label="Published"
                      size="small"
                      sx={{ bgcolor: '#d7f6ff', color: '#282e37', fontWeight: 600, mb: '8px' }}
                    />
                    <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 600, mb: '8px' }}>
                      {foundBook.title}
                    </Typography>
                    <Stack direction="row" spacing="8px" alignItems="center">
                      <CalendarIcon style={{ width: 16, height: 16, color: '#8a90a5' }} />
                      <Typography sx={{ color: '#8a90a5', fontSize: '14px' }}>{foundBook.date}</Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing="8px">
                    <IconButton sx={{ bgcolor: '#1f2536', color: 'white' }}>
                      <DownloadIcon style={{ width: 20, height: 20 }} />
                    </IconButton>
                    <IconButton sx={{ bgcolor: '#1f2536', color: 'white' }}>
                      <ShareIcon style={{ width: 20, height: 20 }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}

          {books.map((book) => (
            <Box
              key={book.id}
              onClick={() => onBookClick(book)}
              sx={{
                p: '24px 16px',
                borderBottom: '1px solid #4c5265',
                cursor: 'pointer',
                bgcolor: selectedBookId === book.id ? '#353b4d' : 'transparent',
                borderRadius: '12px',
                position: 'relative',
                '&:hover': { bgcolor: '#353b4d' },
                ...(selectedBookId === book.id && {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '25%',
                    bottom: '25%',
                    width: '2px',
                    bgcolor: '#00b7fc',
                    borderRadius: '24px'
                  }
                })
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 600, mb: '4px' }}>
                {book.title}
              </Typography>
              <Stack direction="row" spacing="12px" alignItems="center">
                <Stack direction="row" spacing="4px" alignItems="center">
                  <CalendarIcon style={{ width: 20, height: 20, color: '#8a90a5' }} />
                  <Typography sx={{ color: 'white', fontSize: '14px' }}>{book.date}</Typography>
                </Stack>
                <Chip
                  label={book.status === 'published' ? 'Published' : 'Unpublished'}
                  size="small"
                  sx={{
                    bgcolor: book.status === 'published' ? '#d7f6ff' : '#ffedeb',
                    color: '#282e37',
                    fontWeight: 600,
                    fontSize: '12px'
                  }}
                />
              </Stack>
            </Box>
          ))}
        </Box>

        <Card
          sx={{
            bgcolor: '#1f2536',
            border: '1px solid #4c5265',
            borderRadius: '24px',
            display: { xs: 'none', lg: 'block' }
          }}
        >
          <CardContent sx={{ p: '24px' }}>
            <Chip
              label="Published"
              size="small"
              sx={{ bgcolor: '#d7f6ff', color: '#282e37', fontWeight: 600, mb: '8px' }}
            />
            <Typography sx={{ color: 'white', fontSize: '22px', fontWeight: 600, lineHeight: 1.3, mb: '24px' }}>
              {currentBook.title}
            </Typography>

            <Stack spacing="16px">
              <Stack direction="row" spacing="16px">
                <CalendarIcon style={{ width: 24, height: 24, color: '#8a90a5' }} />
                <Box>
                  <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, mb: '4px' }}>Meeting</Typography>
                  <Typography sx={{ color: 'white', fontSize: '14px' }}>{currentBook.date}</Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing="16px">
                <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a90a5' }}>
                  👥
                </Box>
                <Box>
                  <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, mb: '8px' }}>Committees</Typography>
                  <Stack direction="row" flexWrap="wrap" gap="8px">
                    <Chip label="Main committee" size="small" variant="outlined" sx={{ color: 'white', borderColor: '#6f7377' }} />
                    <Chip label="Nomination committee" size="small" variant="outlined" sx={{ color: 'white', borderColor: '#6f7377' }} />
                    <Chip label="Audit committee" size="small" variant="outlined" sx={{ color: 'white', borderColor: '#6f7377' }} />
                  </Stack>
                </Box>
              </Stack>

              <Stack direction="row" spacing="16px">
                <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a90a5' }}>
                  🕐
                </Box>
                <Box>
                  <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 600, mb: '4px' }}>History</Typography>
                  <Stack spacing="4px">
                    <Typography sx={{ color: 'white', fontSize: '14px' }}>Last updated: September 12, 2023</Typography>
                    <Typography sx={{ color: 'white', fontSize: '14px' }}>Published: September 7, 2023</Typography>
                    <Typography sx={{ color: 'white', fontSize: '14px' }}>Created: August 31, 2023</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </CardContent>

          <Box sx={{ p: '24px', pt: 0 }}>
            <Stack direction="row" spacing="16px">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#00b7fc',
                  color: '#00293c',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: '#33c5fd' }
                }}
              >
                Edit
              </Button>
              <IconButton sx={{ border: '1px solid #71768b', borderRadius: '8px', color: 'white' }}>
                ⋮
              </IconButton>
            </Stack>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default function PortalView({
  page = 'books',
  books = BOOKS_DATA,
  selectedBook = null,
  pendingBookData = null,
  onPageChange,
  onSelectBook,
  onCreateBook,
  onSaveBook,
  onBackToBooks,
  isSearching = false,
  searchingBook = null
}) {
  const [selectedBookId, setSelectedBookId] = useState('5');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [foundBook, setFoundBook] = useState(null);

  useEffect(() => {
    if (isSearching) {
      setIsLoading(true);
      setFoundBook(null);
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1800);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsLoading(false);
        setFoundBook(books.find((b) => b.title.toLowerCase().includes('tech')) || books[4]);
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isSearching, books]);

  const handleBookClick = (book) => {
    setSelectedBookId(book.id);
    if (onSelectBook) onSelectBook(book);
  };

  const isCreatePage = page === 'create';

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 72px)', bgcolor: '#1f2536' }}>
      <Box
        sx={{
          width: { xs: '0', md: '300px' },
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          bgcolor: '#1f2536',
          flexShrink: 0
        }}
      >
        <Box sx={{ p: '12px' }}>
          <Stack direction="row" alignItems="center" spacing="12px">
            <IconButton size="small" sx={{ color: 'white' }}>
              <Box sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ☰
              </Box>
            </IconButton>
            <Typography sx={{ fontWeight: 600, fontSize: '15px', color: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              <Box component="span" sx={{ color: '#00b7fc' }}>D</Box>iligent
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ px: '12px', py: '12px' }}>
          <Button
            startIcon={<ArrowLeftIcon style={{ width: 20, height: 20 }} />}
            onClick={onBackToBooks}
            sx={{
              color: 'white',
              justifyContent: 'flex-start',
              width: '100%',
              p: '12px',
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 400
            }}
          >
            Boards
          </Button>
        </Box>

        <Stack sx={{ px: '12px' }} spacing="0">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              sx={{
                color: item.active ? '#00b7fc' : 'white',
                justifyContent: 'flex-start',
                width: '100%',
                p: '12px',
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 400,
                bgcolor: item.active ? '#353b4d' : 'transparent',
                position: 'relative',
                '&::before': item.active ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '25%',
                  bottom: '25%',
                  width: '2px',
                  bgcolor: '#00b7fc',
                  borderRadius: '24px'
                } : {}
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Divider sx={{ bgcolor: '#4c5265', my: '12px', mx: '12px' }} />

        <Stack sx={{ px: '12px' }} spacing="0">
          {NAV_ITEMS_SECONDARY.map((item) => (
            <Button
              key={item.id}
              endIcon={item.hasSubmenu ? <CaretRightIcon style={{ width: 20, height: 20, transform: 'rotate(90deg)' }} /> : null}
              sx={{
                color: 'white',
                justifyContent: 'flex-start',
                width: '100%',
                p: '12px',
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 400
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: '16px',
            bgcolor: '#1f2536'
          }}
        >
          <Button sx={{ color: 'white', textTransform: 'none', fontSize: '14px' }}>
            🏢 {'{Organization name}'} ▾
          </Button>
          <Stack direction="row" spacing="16px" alignItems="center">
            <Button sx={{ color: 'white', textTransform: 'none', fontSize: '14px' }}>
              Open administrator view ↗
            </Button>
            <IconButton sx={{ color: 'white' }}>⌨</IconButton>
            <Box sx={{ position: 'relative' }}>
              <IconButton sx={{ color: 'white' }}>❓</IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  bgcolor: '#83cfff',
                  borderRadius: '50%',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00293c',
                  fontWeight: 600
                }}
              >
                5
              </Box>
            </Box>
            <IconButton sx={{ color: 'white' }}>👤</IconButton>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            borderTopLeftRadius: '32px',
            background: 'radial-gradient(ellipse at top left, #0a1020, #151b2c)',
            p: isCreatePage ? 0 : { xs: '16px', md: '32px' },
            pt: isCreatePage ? 0 : '12px',
            overflow: 'auto'
          }}
        >
          {isCreatePage ? (
            <CreateBookForm
              pendingBookData={pendingBookData}
              onSave={onSaveBook}
              onCancel={onBackToBooks}
            />
          ) : (
            <BooksListView
              books={books}
              selectedBookId={selectedBookId}
              onBookClick={handleBookClick}
              onCreateBook={onCreateBook}
              isLoading={isLoading}
              loadingMessageIndex={loadingMessageIndex}
              foundBook={foundBook}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
