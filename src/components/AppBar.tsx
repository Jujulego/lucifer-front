import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  AppBar as MuiAppBar, Toolbar,
  Drawer, Divider,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

import AccountMenu from './auth/AccountMenu';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing, zIndex }: Theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  menuBtn: {
    marginRight: spacing(2)
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: 300,
    flexShrink: 0
  },
  drawerPaper: {
    width: 300,
    zIndex: zIndex.drawer
  },
  content: {
    flexGrow: 1,
    padding: spacing(3),
    [breakpoints.down('sm')]: {
      padding: spacing(1)
    }
  }
}));

// Types
export interface AppBarProps {
  children: ReactNode
}

// Component
const AppBar = ({ children }: AppBarProps) => {
  // State
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Effects
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Handlers
  const handleOpen  = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <MuiAppBar classes={{ root: styles.appBar }} position="fixed">
        <Toolbar>
          { small && (
            <IconButton
              classes={{ root: styles.menuBtn }}
              color="inherit" edge="start"
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
          ) }
          <Typography classes={{ root: styles.title }} variant="h6">Lucifer</Typography>
          <AccountMenu />
        </Toolbar>
      </MuiAppBar>
      <Drawer
        classes={{ root: styles.drawer, paper: styles.drawerPaper }}
        variant={small ? "temporary" : "permanent"}
        open={open} onClose={handleClose}
      >
        <Toolbar disableGutters={!small}>
          { small && (
            <>
              <Typography classes={{ root: styles.title }} variant="h6">Lucifer</Typography>
              <IconButton
                color="inherit" edge="end"
                onClick={handleClose}
              >
                <ChevronLeftIcon />
              </IconButton>
            </>
          ) }
        </Toolbar>
        { small && <Divider /> }
        <List>
          <ListItem button component={NavLink} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
        </List>
      </Drawer>
      <main className={ styles.content }>
        <Toolbar disableGutters />
        { children }
      </main>
    </div>
  );
};

export default AppBar;