import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;