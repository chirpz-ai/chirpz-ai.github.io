'use client';

import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import createEmotionCache from '@/lib/createEmotionCache';
import { StyledEngineProvider } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3B82F6',
    },
    secondary: {
      main: '#1F2937',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter)',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache();

export default function MUIProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
} 