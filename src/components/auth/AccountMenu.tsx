import React, { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  IconButton,
  Menu, MenuItem
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { logout } from 'store/auth/thunks';

// Component
const AccountMenu = () => {
  // State
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // Redux
  const dispatch = useDispatch();

  // Handlers
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    setAnchor(null);
    dispatch(logout());
  };

  // Render
  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={anchor != null} onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </Menu>
    </>
  )
};

export default AccountMenu;