import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer>
      <Box sx={{ pb: 2 }}>
        <Typography>&copy; Alan Cooks {new Date().getFullYear()}</Typography>
      </Box>
    </footer>
  );
}
