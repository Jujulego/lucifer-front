import React, { FormEventHandler, ReactNode } from 'react';

import {
  Button,
  Card, CardHeader, CardContent, CardActions
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
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

  // Render
  const styles = useStyles();

  return (
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
  )
};

export default AuthForm;