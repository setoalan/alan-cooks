import * as React from 'react';
import { Link } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function IngredientsFilterButton({ id, name, icon, slug, count, activeIngredient }) {
  const theme = useTheme();

  return (
    <Tooltip title={<Typography>{name || 'All Ingredients'}</Typography>} placement="top">
      <IconButton
        key={id}
        component={Link}
        to={slug ? `/ingredient/${slug.current}` : '/'}
        sx={{ border: name === activeIngredient ? `1px solid ${theme.palette.primary.main}` : null }}
      >
        <img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} loading="lazy" />
      </IconButton>
    </Tooltip>
  );
}
