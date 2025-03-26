import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Card,
  CardContent,
  useTheme,
  alpha,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Mock data for demonstration
const callRecords = [
  {
    id: 1,
    status: 'completed',
    from: '+1 (555) 123-4567',
    duration: '3:45',
    date: '2024-03-15 14:30',
    transcript: 'Customer inquired about menu items and placed an order for delivery.',
    audio: 'call_1.mp3',
    satisfaction: 4.5,
  },
  {
    id: 2,
    status: 'failed',
    from: '+1 (555) 234-5678',
    duration: '1:15',
    date: '2024-03-15 15:45',
    transcript: 'Call dropped due to poor connection.',
    audio: 'call_2.mp3',
    satisfaction: 2.0,
  },
  {
    id: 3,
    status: 'completed',
    from: '+1 (555) 345-6789',
    duration: '5:20',
    date: '2024-03-15 16:15',
    transcript: 'Customer made a reservation for 4 people on Friday at 7 PM.',
    audio: 'call_3.mp3',
    satisfaction: 5.0,
  },
  {
    id: 4,
    status: 'warning',
    from: '+1 (555) 456-7890',
    duration: '2:30',
    date: '2024-03-15 17:00',
    transcript: 'Customer had difficulty understanding the bot.',
    audio: 'call_4.mp3',
    satisfaction: 3.0,
  },
];

export const CallRecordings: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchPhone, setSearchPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.palette.success;
      case 'failed':
        return theme.palette.error;
      case 'warning':
        return theme.palette.warning;
      default:
        return theme.palette.info;
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status) {
      case 'completed':
        return <CheckIcon fontSize="small" />;
      case 'failed':
        return <ErrorIcon fontSize="small" />;
      case 'warning':
        return <WarningIcon fontSize="small" />;
      default:
        return <CheckIcon fontSize="small" />;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 130,
      renderCell: (params) => {
        const color = getStatusColor(params.value);
        const icon = getStatusIcon(params.value);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              color: color.main,
              display: 'flex',
              alignItems: 'center'
            }}>
              {icon}
            </Box>
            <Typography sx={{ 
              color: color.main,
              textTransform: 'lowercase',
              '&::first-letter': {
                textTransform: 'uppercase'
              }
            }}>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date & Time',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'from',
      headerName: 'Phone Number',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'satisfaction',
      headerName: 'Satisfaction',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const value = params.value as number;
        const color = value >= 4 ? theme.palette.success.main :
                     value >= 3 ? theme.palette.warning.main :
                     theme.palette.error.main;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color, minWidth: 28 }}>{value.toFixed(1)}</Typography>
            <Box
              sx={{
                width: 40,
                height: 4,
                borderRadius: 2,
                bgcolor: alpha(color, 0.2),
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${(value / 5) * 100}%`,
                  height: '100%',
                  bgcolor: color,
                }}
              />
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'details',
      headerName: 'Call Details',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => setSelectedCall(params.row)}
          sx={{
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const filteredCalls = callRecords.filter((call) => {
    const matchesPhone = call.from.toLowerCase().includes(searchPhone.toLowerCase());
    const recordingDate = new Date(call.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const matchesDate = (!start || recordingDate >= start) && 
                       (!end || recordingDate <= end);
    
    return matchesPhone && matchesDate;
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by phone number"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Card sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        height: 'calc(100vh - 200px)'  // Adjust based on your layout
      }}>
        <CardContent sx={{ 
          flex: 1, 
          p: '0 !important',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <DataGrid
            rows={filteredCalls}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            autoPageSize
            sx={{
              flex: 1,
              border: 'none',
              '& .MuiDataGrid-main': {
                overflow: 'hidden'
              },
              '& .MuiDataGrid-virtualScroller': {
                overflow: 'auto'
              },
              '& .MuiDataGrid-cell': {
                borderColor: alpha(theme.palette.divider, 0.1),
                px: 2,
                whiteSpace: 'normal',
                overflow: 'visible',
                maxHeight: 'none !important',
                lineHeight: '1.43 !important',
                display: 'flex',
                alignItems: 'center'
              },
              '& .MuiDataGrid-columnHeaders': {
                borderColor: alpha(theme.palette.divider, 0.1),
                bgcolor: 'transparent',
                '& .MuiDataGrid-columnHeader': {
                  px: 2,
                  '&:focus': {
                    outline: 'none'
                  },
                  '&:focus-within': {
                    outline: 'none'
                  }
                }
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.02)
                }
              },
              '& .MuiDataGrid-footerContainer': {
                borderColor: alpha(theme.palette.divider, 0.1)
              }
            }}
          />
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(selectedCall)}
        onClose={() => setSelectedCall(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
            margin: { xs: 2, sm: 3 },
            maxHeight: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' }
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          pb: 2
        }}>
          Call Details
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedCall && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Phone Number
                </Typography>
                <Typography variant="body1">{selectedCall.from}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Date & Time
                </Typography>
                <Typography variant="body1">{selectedCall.date}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Transcript
                </Typography>
                <Typography variant="body1">{selectedCall.transcript}</Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <IconButton
                  onClick={() => setIsPlaying(!isPlaying)}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </IconButton>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: '30%',
                        height: '100%',
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {selectedCall.duration}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button 
            onClick={() => setSelectedCall(null)}
            sx={{ color: 'text.secondary' }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              }
            }}
          >
            Download Recording
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 