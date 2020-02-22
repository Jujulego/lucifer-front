import React from 'react';

import { Typography } from '@material-ui/core';

import { useLoggedUser } from 'store/users/hooks';

// Component
const Home = () => {
  // Redux
  const user = useLoggedUser();

  // Render
  return (
    <>
      <Typography>Bonjour { user && user.email }</Typography>
    </>
  )
};

export default Home;