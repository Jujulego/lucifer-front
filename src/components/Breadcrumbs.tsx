import React, { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from 'lodash';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Link, Typography,
  Paper, Toolbar
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useDaemon } from 'store/daemons/hooks';
import { useUser } from 'store/users/hooks';

// Types
interface Name { parts: string[], last: string }
interface RouteName { path: RegExp, name: (prop: Name) => ReactNode }

// Styles
const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    marginBottom: spacing(2),
  },
}));

// Components
const DaemonName = ({ last }: Name) => <>{ capitalize(useDaemon(last)?.name) || last }</>;
const UserName = ({ last }: Name) => <>{ useUser(last)?.email || last }</>;

// Pages
const errorPages = ['/forbidden'];

const pathNames: RouteName[] = [
  { path: /\/daemons$/, name: () => 'Daemons' },
  { path: /^\/daemons\/[0-9a-f]{24}$/i, name: (props) => <DaemonName {...props} /> },
  { path: /^\/users$/, name: () => 'Utilisateurs' },
  { path: /^\/users\/[0-9a-f]{24}$/i, name: (props) => <UserName {...props} /> },
];

function getName(path: string): ReactNode {
  const parts = path.split('/');
  const last = parts[parts.length - 1];

  const name = pathNames.find((name) => name.path.test(path));
  if (name) return name.name({ parts, last });

  return last;
}

// Component
const Breadcrumbs = () => {
  // Router
  const { pathname } = useLocation();

  // Memo
  const links = useMemo<string[]>(() => {
    const parts = pathname.split('/').filter(x => x);
    return parts.map((part, i) => `/${parts.slice(0, i + 1).join('/')}`);
  }, [pathname]);

  // Render
  const styles = useStyles();

  if (errorPages.indexOf(pathname) !== -1) {
    return null;
  }

  return (
    <Toolbar classes={{ root: styles.root }} component={Paper} variant="dense">
      <MuiBreadcrumbs>
        <Link color="inherit" component={RouterLink} to="/">Accueil</Link>
        { links.map((to, i) =>
          (i === links.length - 1) ? (
            <Typography key={to} color="textPrimary">
              { getName(to) }
            </Typography>
          ) : (
            <Link key={to} color="inherit" component={RouterLink} to={to}>
              { getName(to) }
            </Link>
          )
        ) }
      </MuiBreadcrumbs>
    </Toolbar>
  );
};

export default Breadcrumbs;
