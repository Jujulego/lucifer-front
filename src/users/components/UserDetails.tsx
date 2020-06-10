import React, { ReactNode } from 'react';

import { Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check as CheckIcon } from '@material-ui/icons';

import { LabelledText, RelativeDate } from 'basics/components';

import { User } from '../models/user';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    padding: spacing(3),

    [breakpoints.down('sm')]: {
      padding: spacing(2),
    }
  }
}));

// Utils
interface GridItemProps {
  children: ReactNode
}

const GridItem = ({ children }: GridItemProps) => (
  <Grid item xs={12} sm={6} md={4}>
    { children }
  </Grid>
)

// Types
export interface UserDetailsProps {
  user: User
}

// Components
const UserDetails = React.memo((props: UserDetailsProps) => {
  const { user } = props;

  // Render
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Grid container spacing={2}>
        <GridItem>
          <LabelledText label="Nom">
            { user.name }
          </LabelledText>
        </GridItem>
        <GridItem>
          <LabelledText
            label="Email"
            endAdornment={ user.emailVerified && (
              <Tooltip title="Vérifié">
                <CheckIcon color="primary" />
              </Tooltip>
            )}
          >
            { user.email }
          </LabelledText>
        </GridItem>
        <GridItem>
          <LabelledText label="Dernière connexion">
            <RelativeDate mode="from" date={ user.lastLogin } />
          </LabelledText>
        </GridItem>
      </Grid>
    </div>
  );
});

export default UserDetails;
