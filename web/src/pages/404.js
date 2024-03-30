import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h1" fontSize={{ xs: '1rem', sm: '2rem', md: '3rem' }}>
        Page Not Found
      </Typography>
    </Box>
  );
}
