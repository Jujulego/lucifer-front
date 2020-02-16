import React, { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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

import { useMe } from 'store/auth/hooks';
import { logout } from 'store/auth/thunks';

// Component
const AccountMenu = () => {
  // State
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // Redux
  const dispatch = useDispatch();

  // Data
  const me = useMe();

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
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={anchor != null} onClose={handleClose}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar><PersonIcon /></Avatar>
          </ListItemAvatar>
          <ListItemText primary={me?.email} secondary={me?._id} />
        </ListItem>
        <Divider />
        <MenuItem component={Link} to={`/user/${me?._id}`} disabled={!me}>
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