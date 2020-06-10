import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'auth/auth.context';
import { useAuthToken } from 'auth/auth.hooks';

import { CopyButton, LabelledText } from 'basics/components';

// Styles
const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(2),
  },
  title: {
    marginBottom: spacing(2)
  }
}));

// Component
const Home = () => {
  // Auth
  const { user } = useAuth();
  const token = useAuthToken();

  // Render
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Typography className={styles.title} variant="h5">Bonjour { user?.nickname } !</Typography>
      <LabelledText
        label="Token" zeroMinWidth
        endAdornment={<CopyButton text={token} />}
      >
        <Typography noWrap>{ token }</Typography>
      </LabelledText>
    </div>
  );
};

export default Home;
