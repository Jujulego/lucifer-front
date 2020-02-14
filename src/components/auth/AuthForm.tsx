import React, { FormEventHandler, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Container
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppState } from 'store';

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: palette.primary.main,
    color: palette.getContrastText(palette.primary.main)
  },
  headerAction: {
    marginBottom: -8
  },
  actions: {
    justifyContent: "center"
  }
}));

// Types
export interface AuthFormProps {
  title: string,
  submit: string,

  action: ReactNode,
  children: ReactNode,

  onSubmit: FormEventHandler<HTMLDivElement>
}

// Component
const AuthForm = (props: AuthFormProps) => {
  // Props
  const {
    title, submit,
    action, children,
    onSubmit
  } = props;

  // Redux
  const isLoggedIn = useSelector((state: AppState) => state.auth.token != null);

  // Render
  const styles = useStyles();

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container classes={{ root: styles.root }} fixed maxWidth="sm">
      <Card elevation={4} component="form" onSubmit={onSubmit}>
        <CardHeader
          classes={{ root: styles.header, action: styles.headerAction }}
          title={title} titleTypographyProps={{ variant: "h6" }}
          action={action}
        />
        <CardContent>{ children }</CardContent>
        <CardActions classes={{ root: styles.actions }}>
          <Button type="submit" variant="contained" color="primary">
            { submit }
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default AuthForm;