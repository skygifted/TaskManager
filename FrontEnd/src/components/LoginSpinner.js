import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoginSpinner() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress size={25} sx={{ color: 'white', backgroundColor: 'white' }}/>
    </Stack>
  );
}
