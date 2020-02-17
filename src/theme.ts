import { createMuiTheme } from '@material-ui/core';
import { amber, blue } from '@material-ui/core/colors';
import { frFR } from '@material-ui/core/locale';

// Themes
function createTheme(dark: boolean = false) {
  return createMuiTheme({
    palette: {
      primary: amber,
      secondary: blue,
      type: dark ? 'dark' : 'light',
    }
  }, frFR);
}

export default createTheme;