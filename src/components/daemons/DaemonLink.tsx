import React, { ElementType, MouseEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from 'lodash';

import { Link, LinkTypeMap, LinkProps } from '@material-ui/core';

import Daemon from 'data/daemon';
import { useDaemon } from 'store/daemons/hooks';

// Types
export type DaemonLinkProps<D extends ElementType = LinkTypeMap['defaultComponent']> = LinkProps<D> & {
  id: string;
  daemon?: Daemon;
  forceLoad?: boolean;
}

// Component
const DaemonLink = <D extends ElementType = LinkTypeMap['defaultComponent']> (props: DaemonLinkProps<D>) => {
  // Props
  let {
    id, daemon, forceLoad = false,
    onMouseEnter,
    ...link
  } = props;

  // State
  const [load, setLoad] = useState(false);

  // Daemons
  daemon = useDaemon(id, load || forceLoad) || daemon;

  // Handlers
  const handleEnter = (event: MouseEvent<HTMLSpanElement>) => {
    setLoad(true);
    if (onMouseEnter) onMouseEnter(event);
  };

  // Render
  return (
    <Link {...link} component={RouterLink} to={`/daemons/${id}`} onMouseEnter={handleEnter}>
      { daemon ? capitalize(daemon.name) : id }
    </Link>
  );
};

export default DaemonLink;
