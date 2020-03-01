import React, { ElementType, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, LinkTypeMap, LinkProps } from '@material-ui/core';

import { SimpleUser } from 'data/user';
import { useUser } from 'store/users/hooks';

// Types
export type UserLinkProps<D extends ElementType = LinkTypeMap['defaultComponent']> = LinkProps<D> & {
  id: string;
  user?: SimpleUser;
  forceLoad?: boolean;
}

// Component
const UserLink = <D extends ElementType = LinkTypeMap['defaultComponent']> (props: UserLinkProps<D>) => {
  // Props
  let {
    id, user, forceLoad = false,
    onMouseEnter,
    ...link
  } = props;

  // State
  const [load, setLoad] = useState(false);

  // Users
  user = useUser(id, load || forceLoad) || user;

  // Handlers
  const handleEnter = (event: MouseEvent<HTMLSpanElement>) => {
    setLoad(true);
    if (onMouseEnter) onMouseEnter(event);
  };

  // Render
  return (
    <Link {...link} component={RouterLink} to={`/users/${id}`} onMouseEnter={handleEnter}>
      { user ? user.email : id }
    </Link>
  );
};

export default UserLink;
