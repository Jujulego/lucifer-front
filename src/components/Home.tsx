import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';

import { AppState } from 'store';

// Component
const Home = () => {
  // Redux
  const user = useSelector((state: AppState) => state.auth.user);

  // Render
  return (
    <Typography>Bonjour { user }</Typography>
  )
};

export default Home;