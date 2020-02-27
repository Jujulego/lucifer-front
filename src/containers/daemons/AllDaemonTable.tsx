import React from 'react';

import Daemon from 'data/daemon';
import useAPI from 'utils/hooks/useAPI';

import DaemonTable, { DaemonTableProps } from 'components/daemons/DaemonTable';

// Types
export type AllDaemonTableProps = Omit<DaemonTableProps, 'data' | 'onLoad' | 'onReload'>;

// Component
const AllDaemonTable = (props: AllDaemonTableProps) => {
  // API
  const { data = [], reload } = useAPI.get<Daemon[]>('/api/daemons', {}, { load: false });

  // Render
  return (
    <DaemonTable
      {...props}
      data={data}
      onLoad={reload} onReload={reload}
    />
  );
};

export default AllDaemonTable;
