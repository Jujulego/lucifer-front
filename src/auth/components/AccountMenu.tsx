import React, { MouseEvent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Avatar,
  Divider,
  IconButton,
  Menu, MenuItem, ListItem, ListItemAvatar, ListItemIcon, ListItemText
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';

import { useAuth } from '../auth.context';

// Component
const AccountMenu = () => {
  // State
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // Router
  const location = useLocation();

  // Auth
  const { logout } = useAuth();

  // API
  const user: any = undefined;

  // Effects
  useEffect(() => {
    setAnchor(null);
  }, [location]);

  // Handlers
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    setAnchor(null);
    logout();
  };

  // Render
  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        variant="menu" keepMounted disableAutoFocusItem
        open={anchor != null} onClose={handleClose}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar><PersonIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.email} secondary={user?._id} />
        </ListItem>
        <Divider />
        <MenuItem component={Link} to={`/users/${user?._id}`} disabled={!user}>
          <ListItemIcon><EditIcon /></ListItemIcon>
          <ListItemText primary="Profil" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LockIcon /></ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </MenuItem>
      </Menu>
    </>
  )
};

export default AccountMenu;
