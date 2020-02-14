import React, { useMemo } from 'react';

import {
  CssBaseline,
  useMediaQuery
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';

import AuthPage from './AuthPage';

// Component
const App = () => {
  // Theme
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createTheme(prefersDark), [prefersDark]);

  // Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthPage />
    </ThemeProvider>
  );
};

export default App;