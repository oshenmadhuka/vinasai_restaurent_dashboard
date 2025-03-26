import { createTheme, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    card: {
      background: string;
      hover: string;
    };
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    card?: {
      background: string;
      hover: string;
    };
  }
}

const baseTheme = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: ({ theme }: { theme: Theme }) => ({
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: '16px',
          background: theme.palette.card.background,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: theme.palette.card.hover,
            transform: 'translateY(-2px)',
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          background: alpha('#000', 0.05),
        },
        bar: {
          borderRadius: '8px',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E40AF',
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    tertiary: {
      main: '#059669',
      light: '#34D399',
      dark: '#065F46',
    },
    card: {
      background: '#FFFFFF',
      hover: '#F8FAFC',
    },
    background: {
      default: '#F1F5F9',
      paper: '#FFFFFF',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
    },
    secondary: {
      main: '#A78BFA',
      light: '#C4B5FD',
      dark: '#7C3AED',
    },
    tertiary: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#059669',
    },
    card: {
      background: '#1E293B',
      hover: '#334155',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
  },
}); 