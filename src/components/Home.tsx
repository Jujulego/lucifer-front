import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import { useAuth } from 'auth/auth.context';

// Component
const Home = () => {
  // Auth
  const { isLogged, loginWithRedirect } = useAuth();

  // Effects
  useEffect(() => {
    (async () => {
      if (!isLogged) {
        await loginWithRedirect();
      }
    })();
  }, [isLogged, loginWithRedirect])

  // Render
  return (
    <>
      <Typography>Bonjour ! :D</Typography>
    </>
  );
};

export default Home;
