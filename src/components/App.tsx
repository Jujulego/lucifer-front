import React, { useMemo } from 'react';

import {
  CssBaseline,
  useMediaQuery
} from '@material-ui/core';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

import AuthPage from './AuthPage';

// Component
const App = () => {
  // Theme
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDark ? 'dark' : 'light'
      }
    }),
    [prefersDark]
  );

  // Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthPage />
    </ThemeProvider>
  );
};

export default App;