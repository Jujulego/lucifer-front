import React from 'react';

import { Typography } from '@material-ui/core';

import { useMe } from 'store/auth/hooks';

// Component
const Home = () => {
  // Redux
  const me = useMe();

  // Render
  return (
    <>
      <Typography>Bonjour { me && me.email }</Typography>
    </>
  )
};

export default Home;