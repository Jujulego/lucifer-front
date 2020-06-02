import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import { useAuth } from 'auth/auth.context';
import { useAuthToken } from 'auth/auth.hooks';

import { CopyButton } from 'basics/components';

// Component
const Home = () => {
  // Auth
  const { user } = useAuth();
  const token = useAuthToken();

  // Render
  return (
    <>
      <Typography>Bonjour { user?.nickname } !</Typography>
      <Grid container wrap="nowrap" alignItems="center" spacing={2}>
        <Grid item xs zeroMinWidth>
          <Typography noWrap>{ token }</Typography>
        </Grid>
        <Grid item xs="auto">
          <CopyButton text={token} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
