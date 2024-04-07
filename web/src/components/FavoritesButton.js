import * as React from 'react';
import { Link } from 'gatsby';
import Star from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export default function FavoritesButton() {
  const theme = useTheme();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <Button
      component={Link}
      to="/favorites"
      size="small"
      variant={pathname.includes('/favorites') ? 'contained' : 'outlined'}
      startIcon={<Star sx={{ color: theme.palette.favorite.main }} />}
      sx={{ mr: 2 }}
    >
      Favorites
    </Button>
  );
}
