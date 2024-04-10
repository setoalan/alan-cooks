import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer>
      <Box display="flex" justifyContent="center" pb={2}>
        <Typography>&copy; {new Date().getFullYear()} Alan Cooks</Typography>
      </Box>
    </footer>
  );
}
