import React, { useMemo } from 'react';

import {
  CssBaseline, Typography,
  useMediaQuery
} from '@material-ui/core';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

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
      <Typography>Hello world !</Typography>
    </ThemeProvider>
  );
};

export default App;