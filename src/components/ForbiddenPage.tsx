import React, { memo } from 'react';

import { Typography } from '@material-ui/core';

// Component
const ForbiddenPage = memo(() => (
  <Typography variant="h2">403: Forbidden</Typography>
));

export default ForbiddenPage;