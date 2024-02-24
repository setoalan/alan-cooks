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

  return (
    <AppBar
      position="sticky"
      sx={{ paddingTop: 2, backgroundColor: theme.palette.background.default, boxShadow: 'none' }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box display="flex">
            <FoodBank sx={{ marginRight: 1, fontSize: { xs: '3rem', sm: '5rem' }, fill: theme.palette.common.black }} />
            <Typography variant="h1" fontSize={{ xs: '3rem', sm: '5rem' }} color={`${theme.palette.text.primary}`}>
              Alan Cooks
            </Typography>
          </Box>
        </Link>
        <Button
          component={Link}
          to="/favorites"
          size="large"
          variant={location && location.pathname.includes('favorites') ? 'contained' : 'outlined'}
          startIcon={<Star sx={{ color: '#ffc107' }} />}
          endIcon={<Star sx={{ color: '#ffc107' }} />}
        >
          <Typography>FAVORITES</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
