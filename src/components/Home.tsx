import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Typography } from '@material-ui/core';

import { AppState } from 'store';
import { logout } from 'store/auth/thunks';

// Component
const Home = () => {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);

  // Handlers
  const handleLogout = () => {
    dispatch(logout());
  };

  // Render
  return (
    <>
      <Typography>Bonjour { user }</Typography>
      <Button onClick={handleLogout}>Déconnexion</Button>
    </>
  )
};

export default Home;