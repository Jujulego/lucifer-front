import { createMuiTheme } from '@material-ui/core';
import { amber, blue } from '@material-ui/core/colors';

// Themes
function createTheme(dark: boolean = false) {
  return createMuiTheme({
    palette: {
      primary: amber,
      secondary: blue,
      type: dark ? 'dark' : 'light',
    }
  })
}

export default createTheme;