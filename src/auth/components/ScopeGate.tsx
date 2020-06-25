import React, { ReactNode } from 'react';

import { AllowCallback, useNeedScope } from '../auth.hooks';

// Types
export interface ScopeGateProps {
  scope: string;
  allow?: AllowCallback;
  children: ReactNode;
}

// Components
const ScopeGate = (props: ScopeGateProps) => {
  const { scope, allow, children } = props;

  // Auth
  const allowed = useNeedScope(scope, allow);

  // Render
  if (!allowed) return null;
  return <>{ children }</>;
};

export default ScopeGate;
