import * as React from 'react';
import { Link } from 'gatsby';
import Button from '@mui/material/Button';

export default function IngredientsFilterButton({ id, name, icon, slug, count, activeIngredient }) {
  return (
    <Link key={id} to={slug ? `/ingredient/${slug.current}` : '/'}>
      <Button
        startIcon={<img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} />}
        variant={activeIngredient === name ? 'contained' : 'text'}
      >
        {name || 'ALL'} {count}
      </Button>
    </Link>
  );
}
