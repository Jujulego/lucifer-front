import React from 'react';

import { User } from '../models/user';
import { Typography } from '@material-ui/core';

// Types
export interface UserDetailsProps {
  user: User
}

// Components
const UserDetails = ({ user }: UserDetailsProps) => (
  <Typography>{ user.name }</Typography>
);

export default UserDetails;
