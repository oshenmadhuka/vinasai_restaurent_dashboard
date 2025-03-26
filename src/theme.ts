import { createTheme as createMuiTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      dark: string;
      light: string;
    };
  }
  interface PaletteOptions {
    neutral?: {
      main: string;
      dark: string;
      light: string;
    };
  }
}

const PRIMARY_COLOR = '#2563eb'; // Indigo 600
const SECONDARY_COLOR = '#3b82f6'; // Blue 500

export const createTheme = (darkMode: boolean) => {
  const theme = createMuiTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: PRIMARY_COLOR,
        light: '#60a5fa',
        dark: '#1d4ed8',
      },
      secondary: {
        main: SECONDARY_COLOR,
        light: '#a78bfa',
        dark: '#5b21b6',
      },
      neutral: {
        main: '#64748b',
        light: '#94a3b8',
        dark: '#475569',
      },
      background: {
        default: darkMode ? '#0f172a' : '#f1f5f9',
        paper: darkMode ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#111827',
        secondary: darkMode ? alpha('#ffffff', 0.7) : alpha('#111827', 0.7),
      },
      divider: darkMode ? alpha('#ffffff', 0.12) : alpha('#111827', 0.12),
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 24,
            '&:last-child': {
              paddingBottom: 24,
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${alpha('#000000', 0.1)}`,
          },
        },
      },
    },
  });

  return theme;
}; 