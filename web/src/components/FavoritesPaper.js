import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';

export default function FavoritesPaper() {
  const theme = useTheme();

  return (
    <Paper square sx={{ height: 53, my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FavoriteIcon sx={{ color: theme.palette.favorite.main }} />
      <Typography textTransform="uppercase" sx={{ mx: 1 }}>
        Alan's Favorites
      </Typography>
      <FavoriteIcon sx={{ color: theme.palette.favorite.main }} />
    </Paper>
  );
}
