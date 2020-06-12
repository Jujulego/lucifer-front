import React from 'react';
import { useParams } from 'react-router';

import useAPI from 'utils/hooks/useAPI';

import { Daemon } from '../models/daemon';

// Component
const DaemonPage = () => {
  // Router
  const { id, page = 'details' } = useParams();

  // API
  const { data: daemon } = useAPI.get<Daemon>(`/api/daemons/${id}`);

  // Render
  if (!daemon) return null;

  return (
    <>{ daemon.name || daemon.id }</>
  );
};

export default DaemonPage;
