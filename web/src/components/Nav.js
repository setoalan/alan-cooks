import * as React from 'react';
import { Link } from 'gatsby';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FoodBank from '@mui/icons-material/FoodBank';
import Star from '@mui/icons-material/Star';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function Nav() {
  const theme = useTheme();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.default, boxShadow: 'none' }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} to="/" display="flex" alignItems="center" sx={{ textDecoration: 'none' }}>
          <FoodBank
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '5rem' }, mr: 1, fill: theme.palette.common.black }}
          />
          <Typography
            variant="h1"
            fontSize={{ xs: '2rem', sm: '3rem', md: '5rem' }}
            color={theme.palette.text.primary}
            sx={{ mt: 1.5 }}
          >
            Alan Cooks
          </Typography>
        </Box>
        {!pathname.includes('/recipe') ? (
          <Button
            component={Link}
            to="/favorites"
            size="small"
            variant={pathname.includes('/favorites') ? 'contained' : 'outlined'}
            startIcon={<Star sx={{ color: '#ffc107' }} />}
            endIcon={<Star sx={{ color: '#ffc107' }} />}
          >
            <Typography>favorites</Typography>
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
