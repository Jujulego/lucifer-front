import React from 'react';

import { Typography } from '@material-ui/core';

import { useAuth } from 'auth/auth.context';

// Component
const Home = () => {
  // Auth
  const { user } = useAuth();

  // Render
  return (
    <>
      <Typography>Bonjour { user?.nickname } !</Typography>
    </>
  );
};

export default Home;
