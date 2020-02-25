import React, { ReactNode } from 'react';
import { Redirect } from 'react-router';

import { useAdmin } from 'store/users/hooks';

// Types
export interface AdminOnlyProps {
  redirect?: boolean,
  children: ReactNode
}

// Component
const AdminOnly = (props: AdminOnlyProps) => {
  // Props
  const {
    redirect = false,
    children
  } = props;

  // Render
  const result = useAdmin();
  if (!result) {
    if (redirect && result != null) {
      return <Redirect to="/forbidden" />;
    }

    return null;
  }

  return <>{ children }</>
};

export default AdminOnly;