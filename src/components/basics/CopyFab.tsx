import React, { MouseEvent } from 'react';
import copy from 'copy-to-clipboard';

import { Fab, FabProps } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

// Types
export interface CopyFabProps extends FabProps {
  text: string;
  format?: string;

  onCopied?: () => void;
}

// Component
const CopyFab = (props: CopyFabProps) => {
  // Props
  const {
    text, format = "text/plain",
    onCopied, onClick,
    ...btn
  } = props;

  // Handler
  const handleCopy = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);

    // Copy
    const success = copy(text, { format });
    if (success && onCopied) onCopied();
  };

  // Render
  return (
    <Fab {...btn} onClick={handleCopy}>
      <FileCopyIcon fontSize="small" />
    </Fab>
  );
};

export default CopyFab;