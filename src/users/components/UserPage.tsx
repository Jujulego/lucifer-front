import React from 'react';
import { useParams } from 'react-router';

import { Typography } from '@material-ui/core';

import useAPI from 'utils/hooks/useAPI';

import { User } from '../models/user';

// Component
const UserPage = () => {
  // Router
  const { id } = useParams();

  // API
  const { data: user } = useAPI.get<User>(`/api/users/${id}`);

  // Render
  return (
    <Typography>{ user?.name }</Typography>
  );
};

export default UserPage;
