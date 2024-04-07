import * as React from 'react';
import { Link } from 'gatsby';
import FoodBank from '@mui/icons-material/FoodBank';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FavoritesButton from './FavoritesButton';
import { PATHNAMES } from '../constants';

export default function Nav() {
  const theme = useTheme();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const { FAVORITES, HOME, RECIPE } = PATHNAMES;

  return (
    <AppBar
      position="sticky"
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Toolbar
        disableGutters
        sx={{ justifyContent: 'space-between', width: '100%', maxWidth: theme.breakpoints.values.lg }}
      >
        <Box component={Link} to={HOME} display="flex" alignItems="center" sx={{ textDecoration: 'none' }}>
          <FoodBank
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '5rem' }, mr: 1, ml: 2, fill: theme.palette.common.black }}
          />
          <Typography
            fontSize={{ xs: '2rem', sm: '3rem', md: '5rem' }}
            letterSpacing="-0.2rem"
            color={theme.palette.text.primary}
            sx={{ mt: { xs: 1, sm: 1.25, md: 1.5 }, fontWeight: 300 }}
          >
            Alan Cooks
          </Typography>
        </Box>
        {!pathname.includes(RECIPE) && !pathname.includes(FAVORITES) ? <FavoritesButton /> : null}
      </Toolbar>
    </AppBar>
  );
}
