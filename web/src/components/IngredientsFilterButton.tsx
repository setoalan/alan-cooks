import * as React from 'react';
import { Link } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PATHNAMES } from '../constants';

export default function IngredientsFilterButton({ id, name, icon, slug, count, activeIngredient }) {
  const theme = useTheme();

  const { HOME, INGREDIENT } = PATHNAMES;

  return (
    <Tooltip title={<Typography>{`${name} • ${count}`}</Typography>} placement="top">
      <IconButton
        key={id}
        component={Link}
        to={slug ? `${INGREDIENT}/${slug.current}` : HOME}
        sx={{
          border:
            name === activeIngredient || (icon === 'infinity' && activeIngredient === undefined)
              ? `1px solid ${theme.palette.primary.main}`
              : null,
        }}
      >
        <img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} loading="lazy" />
      </IconButton>
    </Tooltip>
  );
}
